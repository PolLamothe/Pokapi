# Pokapi-proxy API Documentation
API complète pour la gestion des cartes Pokémon et des utilisateurs

## Version: 1.0.0

### /data/open-booster/{setId}

#### GET
##### Summary:

Ouvrir un booster

##### Description:

Permet d'ouvrir un paquet de 5 cartes aléatoire à partir d'une série (set).

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| setId | path | Id du set à ouvrir | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Un tableau avec la liste des cartes obtenues |
| 404 | Aucun set avec cet id trouvé |

### /data/card/{id}

#### GET
##### Summary:

Récupérer les informations d'une carte

##### Description:

Permet de consulter les informations détaillées d'une carte.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | Id de la carte | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | La carte recherchée |
| 404 | Aucune carte avec cet id trouvé |

### /data/cards

#### POST
##### Summary:

Récupérer les informations de plusieurs cartes

##### Description:

Permet de consulter les informations détaillées de plusieurs cartes.

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Un tableau avec les cartes recherchées |

### /data/card/evolution/{id}

#### GET
##### Summary:

Récupérer toutes les évolutions possibles d'une carte dans le même set

##### Description:

Permet de trouver toutes les évolutions possibles d'une carte dans le même set.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | Id de la carte | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Un tableau avec les cartes des évolutions disponibles |
| 400 | Cette carte n'a pas d'évolution possible dans ce set |
| 404 | Aucune carte avec cet id trouvé |

### /data/set/cards/{setId}

#### GET
##### Summary:

Récupérer toutes les cartes d'un set

##### Description:

Permet de récupérer la liste des cartes appartenant à un set en particulier.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| setId | path | Id du set à consulter | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | La liste des cartes de ce set |
| 404 | Aucune set avec cet id trouvé |

### /data/set/presentation/{setId}

#### GET
##### Summary:

Récupérer les informations d'un set et 3 images de cartes de celui-ci

##### Description:

Permet de récupérer la présentation d'un set. Celle-ci contiendra les informations du set et 4 images de cartes composant ce set.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| setId | path | Id du set à consulter | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Les informations du set et 4 images de cartes composant ce set. |
| 404 | Aucune set avec cet id trouvé |

### /data/set/{setId}

#### GET
##### Summary:

Récupérer les informations d'un set

##### Description:

Permet de consulter les informations d'un en particulier.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| setId | path | Id du set à consulter | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Les informations du set |
| 404 | Aucune set avec cet id trouvé |

### /data/sets

#### GET
##### Summary:

Récupérer tous les sets

##### Description:

Permet de récupérer la liste de tous les sets disponibles.

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | La liste de tous les sets. |
| 503 | Service Unavailable |

### /data/deck-price

#### POST
##### Summary:

Donne le prix d'un deck de cartes

##### Description:

Permet de savoir le prix total d'une liste de cartes (deck).

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Le prix total. |
| 404 | Une des cartes n'a pas été trouvée |

### /data/types

#### GET
##### Summary:

Récupérer tous les types

##### Description:

Permet de récupérer la liste des types disponibles.

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Un tableau avec la liste des types |

### /data/rarities

#### GET
##### Summary:

Récupérer toutes les raretés

##### Description:

Permet de récupérer la liste des raretés disponibles.

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Un tableau avec la liste des raretés |

### /user/login

#### POST
##### Summary:

Se connecter à partir des identifiants ou d'un token

##### Description:

Permet à un utilisateur de se connecter en utilisant soit un jeton d'authentification, soit son identifiant et mot de passe si les deux sont fournis alors la vérification se fait avec les identifiants.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| authorization | header |  | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 401 | Jeton ou identifiants invalides |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /user/register

#### POST
##### Summary:

Inscrire un nouvel utilisateur

##### Description:

Permet à un utilisateur de s'inscrire avec un login, un pseudo et un mot de passe. Le login doit être unique.

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Un utilisateur avec ce login existe déjà |

### /user/my-cards

#### GET
##### Summary:

Récupérer toutes les cartes de la collection de l'utilisateur

##### Description:

Permet à un utilisateur de récupérer la liste des cartes qu'il possède avec la quantité de chaque carte.

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Un tableau avec les cartes de l'utilisateur et leurs quantités |
| 401 | Unauthorized |
| 503 | Service Unavailable |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /user/my-cards/{cardId}

#### GET
##### Summary:

Récupérer une carte de la collection de l'utilisateur

##### Description:

Permet à l'utilisateur de récupérer une carte spécifique de sa collection pour voir les informations de la carte ainsi que la quantité possédée.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| cardId | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | La carte de l'utilisateur avec la quantité possédée |
| 400 | L'utilisateur n'a pas de carte avec cet id |
| 401 | Unauthorized |
| 503 | Service Unavailable |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /user/pseudo/{pseudo}

#### GET
##### Summary:

Trouver un utilisateur à partir de son pseudo

##### Description:

Rechercher des utilisateur à partir de leur pseudo, renvoie tous les utilisateurs dont le pseudo commence par la chaîne donnée.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| pseudo | path | Le début du pseudo a rechercher | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Les informations des utilisateurs trouvés |

### /user/open-booster/{setId}

#### GET
##### Summary:

Ouvrir un booster pour ajouter des cartes dans la collection

##### Description:

Permet à l'utilisateur d'ouvrir un paquet de 5 cartes aléatoire à partir d'une série (set). Les cartes obtenues sont alors ajoutées à sa collection.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| setId | path |  | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Un tableau avec les 5 cartes obtenues |
| 401 | Unauthorized |
| 404 | Aucun set avec cet id trouvé |
| 503 | Service Unavailable |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /user/info

#### GET
##### Summary:

Récupérer son login et pseudo

##### Description:

Permet à un utilisateur de voir les informations de son compte, c'est-à-dire son login et son pseudo.

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Les informations de l'utilisateur |
| 401 | Unauthorized |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /user/update

#### PUT
##### Summary:

Mettre à jour son pseudo et mot de passe

##### Description:

Permet à un utilisateur de modifier son pseudo et/ou son mot de passe.

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Le nouveau pseudo ou mot de passe est invalide |
| 401 | Unauthorized |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /user/delete

#### DELETE
##### Summary:

Supprimer l'utilisateur

##### Description:

Permet à un utilisateur de supprimer son compte.

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | L'utilisateur a été supprimé |
| 401 | Unauthorized |
| 404 | L'utilisateur n'a pas été trouvé |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /user/searched

#### GET
##### Summary:

Récupérer toutes les cartes marquées comme recherchées d'un utilisateur

##### Description:

Voir la les ID des cartes qui sont dans la liste des cartes recherchées par l'utilisateur

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | La liste des ID des cartes |
| 401 | Unauthorized |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /user/searched/add

#### POST
##### Summary:

Ajouter une carte dans la liste des cartes recherchées

##### Description:

Permet à un utilisateur d'ajouter une carte à la liste des cartes qu'il recherche.

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | La carte a été ajoutée |
| 400 | L'utilisateur n'a pas spécifié d'id ou la carte est déjà dans la liste |
| 401 | Unauthorized |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

