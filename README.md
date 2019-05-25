# POSTIT
notre appication consiste à créer une liste de messsages par des utilsateurs connéctés .
l'application contient une page d'inscription, page d'authentification et la page principale du post_it su laquel
l'utilisateur peut créer, modifier et supprimer un message qui leur appartienne.
coté base de données: on a utilisé mysql, là ou on crée deux tables, l'une pour stocké les messages avec l'enssemble 
de ces attributs(titre,note,posistionX,positionY,auteur) et une table pour stocker les utilisateurs(mail,pseudo,mdp hashé).
-  les fonction de suppression,modification et l'ajout sont tous faite au niveau de la base de données.

en ce qui concerne le code javascript on peut dire que l'enssemble de l'application est codé avec, 
la creation des messages, l'envoi de données asynchrone avec ajax et tout le traitement qui va avec.

Coté sécurité : 
 on a pu hasher le mot de passe avec une fonction de hashage sha256, comme ça si un attaquant récupère nos données, 
 il n'aura pas le mot de passe en claire.
 de plus, on a mis un dispositif qui permet l'empêchement de vol de session par un attaquant.
 
 notre serveur se met à l'écoute sur le port 1337 
 pour lancer l'application, il suffit de lancer le serveur créer par node js grace à la commande node app.js, puis lancer une
 requête sur le navigateur vers localhost:1337.
 
 .


