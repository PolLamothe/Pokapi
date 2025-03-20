# Pokapi-data

Le but de ce microservice est d'intéragir avec l'API publique de Pokémon. Il est aussi composé d'une base de donnée de cache.

### Ressources :

+ API Pokémon -> [pokemontcg](https://docs.pokemontcg.io/)

## Fonctionnement cache :

### Récupérer une carte

1. Récupérer la carte depuis la BD
2. Si elle n'existe pas ou la date de dernière mise à jour > 1j

    2.1. Récupérer la carte depuis l'API

    2.2. L'ajouté à la BD

    2.3. Retourner la carte [END]
3. Sinon

    3.1. Retourner la carte [END]

### Récupérer plusieurs cartes

1. Récupérer toutes les cartes depuis la BD
2. Identifié celles qui n'existe pas ou la date de dernière mise à jour > 1j
3. Pour toutes ces cartes fetch API
4. Puis ajout BD
5. Retourner toutes les cartes depuis la BD [END]

### Récupérer toutes les cartes d'un set

1. Vérifier la présence et la dernière date de mise à jour du set
2. Si c'est bon → Récupérer toutes les cartes du set depuis la BD puis return [END]
3. Si ce n'est pas bon → Récupérer toutes les cartes du set depuis l'API

    3.1. Ajouter à la BD

    3.2. Update la date de mise à jour

    3.3 Retourner les cartes [END]