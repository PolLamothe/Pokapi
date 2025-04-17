# API

## Liste des routes :

### Data :

- `GET /open-booster/<SET>` ✅🔴
	+ Ouvrir un booster en fonction d'un SET
- `GET /card/<ID>` ✅🔴
	+ Obtenir une carte a partir de son ID
- `POST /cards {cards: Array<ID>}` ✅🔴
	+ Obtenir plusieurs cartes a partir de leurs IDs
- `GET /card/evolution/<ID>` ✅🔴
	+ Faire évoluer une carte si possible
- `GET /set/presentation/<SET>` ✅🔴
	+ Obtenir un SET avec 4 images de cartes qui le représente
- `GET /set/<SETID>` ✅🔴
	+ Obtenir un set à partir de son ID
- `GET /set/cards/<SETID>` ✅🔴
	+ Obtenir toutes les cartes d'un set à partir de son ID
- `GET /sets` ✅🔴
	+ Obtenir tous les sets
- `POST /deck-price {deck: Array<ID>}` ✅🔴
	+ Prix d'un deck (en €) a partir d'un array d'id de cartes 
- `GET /types` ✅🔴
	+ Tous les types
- `GET /rarities` ✅🔴
	+ Toutes les raretés

### User :

> `[AUT]` = Nécessite une connection (un JWT)

- `POST /login {login: String, password: String}` ✅🔴
	+ Se connecter renvoie un JWT
- `POST /register {login: String, pseudo: String, password: String}` ✅🔴
	+ Créer un compte renvoie un JWT
- `[AUTH] GET /my-cards` ✅🔴
	+ Voir la collection de cartes de l'utilisateur
- `[AUTH] GET /my-cards/<CARDID>` ✅🔴
	+ Voir une carte de la collection de l'utilisateur
- `GET /pseudo/<PSEUDO>` ✅🔴
	+ Rechercher un utilisateur a partir de son pseudo
- `[AUTH] GET /open-booster/<SET>` ✅🔴
	+ Ouvre un booster a partir de pokapi-data en sauvegardant les cartes dans la collection de l'utilisateur
- `[AUTH] POST /searched/add {id: String}` ✅🔴
	+ Ajouter une carte comme recherchée
- `[AUTH] GET /searched` ✅🔴
	+ Voir les cartes que l'on recherche
- `[AUTH] GET /info` ✅🔴
	+ Obtenir les informations sur l'utilisateur connecté
- `[AUTH] PUT /update` ✅
	+ Possibilité d'update tout les champs via cette route
- `[AUTH] DELETE /delete`✅
	+ Supprime l'utilisateur

