# R401 - Architecture logicielle

### Liste des routes dans `API.md` 

## Problématique

Comment créer une plateforme permettant aux utilisateurs de gérer, optimiser et valoriser leur collection de cartes Pokémon, tout en offrant des fonctionnalités avancées pour identifier les cartes les plus puissantes, rares et recherchées, et en facilitant l'interaction avec d'autres collectionneurs ?

* **pokapi-data** : Ce microservice se concentre sur l'analyse des cartes Pokémon pour déterminer celles qui sont les plus puissantes, rares et recherchées. Cela répond au besoin des utilisateurs de connaître la valeur et la rareté de leurs cartes.

* **pokapi-user** : Ce microservice gère les utilisateurs et leurs collections. Il permet aux utilisateurs de s'inscrire, de se connecter, de voir leurs cartes et d'ouvrir des boosters, ce qui répond au besoin de gestion personnelle de la collection et d'interaction avec la plateforme.

## Étapes de développement

### Étape 1 :

- [x] Faire un stub unique (comme le proxy) qui renvoie une réponse constante prédéfinie pour chaque route
- [x] Faire les modèles des données manipulées dans data et user et **les TESTS** qui vont avec.
	- [x] Data
	- [x] User 
- [x] Faire les schéma des BD MongoDB dans data et user
- [x] Faire la config de la DB en memory pour ENV=TEST et sur un serveur pour ENV=PROD pour data et user

### Étape 2 : 

- [x] DAO user avec tests
- [x] DAO data avec tests
	- [x] cardFetchDAO
	- [x] cardDAO
	- [x] setFetchDAO
	- [x] setDAO

### Étape 3 : 

- [x] Contrôlleur user avec tests
- [ ] Contrôlleur data avec tests 🟢 (*Pol*)
	- [ ] cardController
	- [x] setController

### Étape 4 : 

- [x] Routes user avec tests
- [ ] Routes data avec tests 

### Étape 5 : 

- [ ] Définir architecture et fonctionnement du proxy 🟢 (*Thomas*)
- [ ] Routes proxy avec tests 🟢 (*Thomas*)
