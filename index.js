const express = require("express");
const path = require("path");
const { Pool } = require("pg");

// Création du serveur Express
const app = express();

// Configuration du serveur
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false })); // <--- paramétrage du middleware

// Configuration de la connexion à la base de données
const pool = new Pool({
    user: "ciwqmpkp",
    host: "dumbo.db.elephantsql.com",
    database: "ciwqmpkp",
    password: "dVujEbjwDq05o-dlqUc64fWr1rTVR2Ni",
    port: 5432
});
console.log("Connexion réussie à la base de données !");

const sql_create = `CREATE TABLE IF NOT EXISTS Livres(
    Livre_ID SERIAL PRIMARY KEY,
    Titre VARCHAR(100) NOT NULL,
    Auteur VARCHAR(100) NOT NULL,
    Commentaires TEXT
);`;

pool.query(sql_create, [], (err, result) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Création réussie de la table 'Livres' !");
    
    // Alimentation de la table
    const sql_insert = `INSERT INTO Livres (Livre_ID, Titre, Auteur, Commentaires) VALUES
        (1, 'Mrs. Bridge', 'Evan S. Connell', 'Premier de la série'),
        (2, 'Mr. Bridge', 'Evan S. Connell', 'Second de la série'),
        (3, 'L''ingénue libertine', 'Colette', 'Minne + Les égarements de Minne')
    ON CONFLICT DO NOTHING;`;
    pool.query(sql_insert, [], (err, result) => {
        if (err) {
            return console.error(err.message);
        }
        const sql_sequence = "SELECT SETVAL('Livres_Livre_ID_Seq', MAX(LIVRE_ID)) FROM LIVRES;";
        pool.query(sql_sequence, [], (err, result) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Alimentation réussie de la table 'Livres'");
        });
    });
});

// Démarrage du serveur
app.listen(3000, () => {
    console.log("Le serveur tourne : http://localhost:3000 !");
});

// GET /
app.get("/", (req, res) => {
    res.render("index");
});

// GET /about
app.get("/about", (req, res) => {
    res.render("about");
});

// GET /data
app.get("/data", (req, res) => {
    const test = {
        titre: "test",
        items: ["un", "deux", "trois"]
    };
    res.render("data", { model: test });
});

// GET /books
app.get("/books", (req, res) => {
    const sql = "SELECT * FROM Livres ORDER BY Titre";
    pool.query(sql, [], (err, result) => {
        if (err) {
            console.error(err.message);
        }
        res.render("books", { model: result.rows });
    });
});

// GET /edit/xxx
app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM Livres WHERE Livre_ID = $1";
    pool.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err.message);
        }    
        res.render("edit", { model : result.rows[0] });
    });
});

// GET /create
app.get("/create", (req, res) => {
    res.render("create", { model: {} });
});

// POST /edit/xxx
app.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const book = [req.body.titre, req.body.auteur, req.body.commentaires, id];
    const sql = "UPDATE Livres SET Titre = $1, Auteur = $2, Commentaires = $3 WHERE (Livre_ID = $4)";
    pool.query(sql, book, (err, result) => {
        if (err) {
            console.error(err.message);
        }
        res.redirect("/books");
    });
});

// POST /create
app.post("/create", (req, res) => {
    const sql = "INSERT INTO Livres (Titre, Auteur, Commentaires) VALUES ($1, $2, $3)";
    const book = [req.body.titre, req.body.auteur, req.body.commentaires];
    console.log("Titre : " + getElementByTagName("titre"));
    pool.query(sql, book, (err, result) => {
        if (err) {
            console.log("Erreur mon gars");
            console.error(err.message);
        }
        res.redirect("/books");
    });
});