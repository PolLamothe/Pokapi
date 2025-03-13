# R401 - Architecture logicielle

## Problématique

Comment créer une plateforme permettant aux utilisateurs de gérer, optimiser et valoriser leur collection de cartes Pokémon, tout en offrant des fonctionnalités avancées pour identifier les cartes les plus puissantes, rares et recherchées, et en facilitant l'interaction avec d'autres collectionneurs ?

* **pokeapi-data** : Ce microservice se concentre sur l'analyse des cartes Pokémon pour déterminer celles qui sont les plus puissantes, rares et recherchées. Cela répond au besoin des utilisateurs de connaître la valeur et la rareté de leurs cartes.

* **pokeapi-user** : Ce microservice gère les utilisateurs et leurs collections. Il permet aux utilisateurs de s'inscrire, de se connecter, de voir leurs cartes et d'ouvrir des boosters, ce qui répond au besoin de gestion personnelle de la collection et d'interaction avec la plateforme.

## Étapes de développement

### Étape 1 : Stub

- [ ] Faire un stub unique (comme le proxy) qui renvoie une réponse constante prédéfinie pour chaque route