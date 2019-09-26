Suivi du tuto : https://blog.pagesd.info/2019/09/21/crud-avec-express-postgresql-10-etapes/

 # Conclusion :

 ## Commandes utiles :
- npm init et npm init -y pour initialiser un projet
- npm install … (sans –save) pour installer des modules
- npm start pour lancer le projet

- app.set(…) et app.use(…) pour configurer le serveur et les middlewares
- app.listen(port, callback) pour démarrer le serveur
- app.get(url, callback) pour répondre aux requêtes GET
- app.post(url, callback) pour les POST depuis les formulaires de saisie
- req.params.* pour récupérer les paramètres nommés de l’URL (la route)
- req.body.* pour accéder aux données postées par le formulaire de saisie

- res.send(“texte”) pour renvoyer un texte
- res.render(view_name, model) pour renvoyer une vue
- res.redirect(url) pour rediriger l’utilisateur
- utilisation de vues partielles pour se simplifier le travail
- et EJS ressemble beaucoup à ce qui se fait avec ASP ou aux vues ERB de Sinatra

- new Pool() pour se connecter à la base de données
- pool.query(sql, [ params ], callback) pour exécuter tout type de requêtes (mise à jour, SELECT renvoyant plusieurs lignes, SELECT par identifant…)