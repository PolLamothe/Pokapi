# SAE401 : R408 - Virtualisation 

**Groupe_1_1 : Kyllian Arnaud, Jauzua Destain, Pol Lamothe, Brieuc Le Carluer, Thomas Souchet**

Pour conteneuriser le MVC, il est nécessaire de mettre en place deux conteneurs, un pour la base de données et un pour l'application PHP.

## Base de données

Pour ce conteneur nous avons choisi d'utilisé [l'image officielle de MariaDB](https://hub.docker.com/_/mariadb).

On récupère l'image grâce à la commande suivante : 

```bash
podman pull --tls-verify=false dockerhub.nexus.dep-info.iut-nantes.univ-nantes.prive/mariadb:lts
```

Ensuite nous avons écrit le fichier `BD/init.sql` qui sera exécuté lors de la création du conteneur pour remplir la base de données. Pour cela il faut mettre le fichier SQL dans le dossier `/docker-entrypoint-initdb.d/` du conteneur, car tous les fichiers SQL dans ce dossier sont exécutés automatiquement au démarage.

Il faut aussi créer un `network` avec Podman pour que les conteneurs puissent communiquer, cela ce fait avec la commande `podman network create mvc`

Pour lancer le conteneur MariaDB il suffit donc d'exécuter la commande `run` suivante :

```bash
podman run --rm -d --name mariadb_container -p 3306:3306 \
      -v=./BD:/docker-entrypoint-initdb.d --network mvc \
      -e "MARIADB_USER=mvc-user" \
      -e "MARIADB_PASSWORD=mvc-mdp" \
      -e "MARIADB_DATABASE=mvcbd" \
      -e "MARIADB_ROOT_PASSWORD=mvc-root" mariadb:lts
```

Le conteneur est lancé sur le port `3306`, il est nécessaire de lancer cette commande dans le répertoire qui contient le dossier `BD` pour charger les fichiers SQL d'initialisation. Les quatre varibles d'environnement sont configurables pour changer le nom d'utilisateur, le mot de passe, le nom de la base de données et le mot de passe root.

## Application PHP

Pour ce conteneur nous avons choisi d'utilisé une variante de [l'image officielle de PHP](https://hub.docker.com/_/php) qui contient un serveur Apache : `dockerhub.nexus.dep-info.iut-nantes.univ-nantes.prive/php:8.3-apache`

Pour faire fonctionner le framework MVC, des modifications ont été effectuées dans le fichier `MVC/app/config/config.inc.php` pour que celui-ci puisse être configuré avec les cinq variables d'environnement suivantes : 

+ `DB_CONTAINER` : le nom du conteneur de la base de données
+ `DB_PORT` : le port de la base de données
+ `DB_NAME` : le nom de la base de donées
+ `DB_LOGIN` : le nom d'utilisateur de la base de données
+ `DB_PASSWORD` : le mot de passe de la base de données

Ensuite pour que l'application fonctionne il est nécessaire de configurer Apache correctement. Pour cela, nous avons créé un fichier `vhost.conf` qui prendra la place de la configuration par défaut d'Apache qui est stockée dans le fichier `/etc/apache2/sites-available/000-default.conf` du conteneur. 

Dans la configuration Apache que nous avons créée les lignes les plus importantes sont `DocumentRoot /var/www/html/app` qui permet de configurer le dossier racine de l'application et `AllowOverride All` qui permet d'autoriser la prise en compte des fichiers `.htaccess`.

Voici la configuration complète présente dans le fichier `vhost.conf` : 

```
<VirtualHost *:80>
	DocumentRoot /var/www/html/app
	
	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined
	
    <Directory /var/www/html/app/>
	   Options -Indexes +FollowSymLinks
	   AllowOverride All
	   Require all granted
    </Directory>
</VirtualHost>
```

Enfin nous avons créé un `Containerfile` qui permet de copier la configuration Apache dans l'image ainsi que l'ensemble du framework MVC. Il a aussi été nécessaire d'installer le module PHP pour MySQL qui sert aussi pour MariaDB, son installation se fait avec la commande `docker-php-ext-install -j$(nproc) pdo_mysql` comme spécifié dans la documentation de l'image et aussi d'activer le module rewrite de Apache avec la commande `a2enmod rewrite`.

Voici le fichier `Containerfile complet` :

```
FROM dockerhub.nexus.dep-info.iut-nantes.univ-nantes.prive/php:8.3-apache
COPY vhost.conf /etc/apache2/sites-available/000-default.conf
COPY MVC ./
RUN docker-php-ext-install -j$(nproc) pdo_mysql && a2enmod rewrite
```

Pour construire l'image on utilise la commande suivante depuis le dossier qui contient le `Containerfile` : 

```bash
podman build -t mvc --tls-verify=false .
```

Enfin pour lancer le conteneur PHP il suffit donc d'exécuter la commande `run` suivante :

```bash
podman run --rm -d -p 8080:80 --name php_mvc --network mvc \
            -e "DB_CONTAINER=mariadb_container" \
            -e "DB_PORT=3306" \
            -e "DB_NAME=mvcbd" \
            -e "DB_LOGIN=mvc-user" \
            -e "DB_PASSWORD=mvc-mdp" localhost/mvc
```

L'application PHP est maintenant disponible à l'adresse [localhost:8080/Home](localhost:8080/Home). Il est possible de se connecter avec les identifiants, pseudo : `Romeo` password : `pass`, pour pouvoir ajouter des produits, les modifier, etc.

### Mise à disposition de l'image sur le registre privé

L'image précédement créée a été poussée sur le registre privé de l'IUT de Nantes à l'adresse suivante : `oci.nexus.dep-info.iut-nantes.univ-nantes.prive/e235508m/sae_r408_grp1_1_mvc`

Pour rendre l'image disponible il faut d'abord se connecter avec la commande : 

```bash
podman login --tls-verify=false oci.nexus.dep-info.iut-nantes.univ-nantes.prive
```

Puis tagger l'image précédente : 

```bash
podman tag localhost/mvc:latest oci.nexus.dep-info.iut-nantes.univ-nantes.prive/e235508m/sae_r408_grp1_1_mvc
```

Enfin la pousser sur le registre : 

```bash
podman push --tls-verify=false oci.nexus.dep-info.iut-nantes.univ-nantes.prive/e235508m/sae_r408_grp1_1_mvc
```

Le conteneur peut donc être lancé avec la commande suivante : 

```bash
podman run --rm -d -p 8080:80 --name php_mvc --network mvc --tls-verify=false \
            -e "DB_CONTAINER=mariadb_container" \
            -e "DB_PORT=3306" \
            -e "DB_NAME=mvcbd" \
            -e "DB_LOGIN=mvc-user" \
            -e "DB_PASSWORD=mvc-mdp" \
            oci.nexus.dep-info.iut-nantes.univ-nantes.prive/e235508m/sae_r408_grp1_1_mvc
```

