# Pokapi

[http://172.21.45.43](http://172.21.45.43)

## Déploiement

*Thomas*

## Fonctionnalités

#### Page /sets :
- Visualiser toutes les extensions existantes
- Recherche dynamique en fonction du nom
- Affichage progressif des extensions

#### Page /set :
- Visualiser toutes les cartes d'une extension
- Ajouter des cartes comme "recherchée"

#### Page / :
- Choix d'une extentions avec un carrousel (chargement progressif)
- Ouvrir un booster (5 cartes) d'une extension au choix

#### Page /collections :
- Visionner toute ses cartes
- Filter les cartes affichées en fonctions des critères :
    - Type
    - Rareté
    - Extension
- Séparer les cartes en fonction de leurs extensions (choix enregistré dans le `localStorage`)
- Visionner les cartes recherchées
- Recherche dynamique en fonction du nom

#### Page /card :
- Voir la carte avec un effet visuel (si elle est rare)
- Voir la carte en grand format
- Voir les infos suivantes : 
    - l'extension de la carte
    - le numéro de la carte
    - l'illustateur de la carte
    - le prix de la carte
    - le nombre d'examplaire possédés
- Accéder à la page de discussion avec le Pokemon

#### Page /chatpokemon :
- Discuter avec le pokemon (ChatGPT) (sauvegarde de la discussion dans le `localStorage`)

#### Page /account :
- Se créer un compte
- Se connecter
- Effacer les conversations avec les pokemons (`localStorage`)

## Instruction

Pour lancer le site il faut faire `npm run dev`, le site apparait à cette URL : [http://localhost:5173/](http://localhost:5173/).

Pour que les requêtes à l'API fonctionnent durant le développement du site, on utilise le stub présent dans `R401.../pokapi-stub`, il faut le lancer avec `npm start` (installer les dépendances si nécessaire avec `npm install`).

Les identifiants pour se connecter avec le stub sont : `login: admin ; password: admin`.

## Organisation des dossiers

+ src
    + assets : pour mettre vos images
    + components : Un fichier par composant que vous pouvez après intégrer dans vos pages. Vous pouvez mettre le style CSS directement dans le JSX avec des objets, prenez exemple sur le `Header.jsx`.
    + pages : Chaque page a son fichier pour mettre tous vos composants (définits dans `components`) ensembles. Ces composants de pages (`Home.jsx`, `Collection.jsx`, ...) sont ensuite automatiquement intégrer dans le fichier `App.jsx` avec le composant `<Outlet/>`.

## Docs et ressources à utiliser

- [Radix UI](https://www.radix-ui.com/themes/docs/components/alert-dialog) : C'est la librairie de composant React dèjà fait que l'on utilise, lisez bien la doc il y a plein de choses que vous pouvez utiliser (boutons, modales, conteneur flex, etc). Cela nous permet de gagner du temps sur les composants simples par contre leur style n'est pas facilement modifiable.
- [Lucide Icons](https://lucide.dev/icons/) : Si vous voulez ajouter des icônes, vous avez juste à cliquer sur une icône et faire *Copy JSX*. 
- [Slick](https://react-slick.neostack.com/) : Librairie pour le carousel de la page d'accueil (à confirmer)
- [React router](https://reactrouter.com/start/declarative/navigating)
- [React](https://react.dev/reference/react)

## Plan de l'application

![plan](../../commun/Plan-app.drawio.png)
