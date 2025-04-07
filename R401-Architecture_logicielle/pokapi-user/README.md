# Pokapi-user

Le but de ce microservice est de gérer les utilisateurs avec l'API de pokapi-data. Il est aussi composé d'une base de donnée pour stocker les utilisateurs.

## Fonctionnement authentification

Par défaut les tokens générés lors de l'authentification ne sont valables que sur une instance du serveur, cela signifie que si le serveur redémarre les tokens précédemment générés ne serons plus valide.

Pour changer ce fonctionnement si vous voulez que les tokens persistent au redémarrage du serveur, il faut définir la variable d'environnement `JWT_SECRET` dans le fichier `.env` avec la clé secrète qui sera utilisée pour générer les tokens.

Il est aussi possible de changer la durée de vie des tokens avec la variable d'environnement `JWT_EXPIRES` en spécifiant une chaîne de caractères avec un nombre et une unité (*m*, *h*, *d*), exemple : `12h`. 

### TODO

- [ ] Routes
  - [x] `/my-cards`
  - [x] `/register`
  - [x] `/user/:pseudo`
  - [x] `/info`
  - [x] `/searched`
  - [x] `/searched/add`
  - [ ] `/update`
  - [ ] `/open-booster/:setId`
  - [x] `login`
  - [x] `delete`
  - [ ] `/my-cards/:cardId`

### Ressources :

+ [JWT](https://jwt.io/)