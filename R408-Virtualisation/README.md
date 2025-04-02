# Virtualisation

> [Lien vers le sujet](https://gitlab.univ-nantes.fr/iut.info2.virtualisation/virtualisation.sae)

## MariaDB

### Création du fichier SQL d'initialisation
On crée un fichier `init.sql` pour initialiser automatiquement notre base de données lors de l'exécution du conteneur :

```bash
echo "CREATE DATABASE apachebd;" > init.sql
```

### Création du `Containerfile` pour MariaDB

On crée le fichier `ContainerfileBD` :

```bash
echo "FROM mariadb:latest" > ContainerfileBD
```

Ensuite, on modifie le `ContainerfileBD` pour inclure le contenu suivant :

```Containerfile
FROM mariadb:latest

ENV MARIADB_ROOT_PASSWORD=E239982A

COPY init.sql /docker-entrypoint-initdb.d/
EXPOSE 3306
```

### Build de l'image MariaDB

```bash
podman build -f ContainerfileBD -t mariadb_custom
```

### Exécution du conteneur MariaDB

```bash
podman run --tls-verify=false -d --name conteneur-bd mariadb_custom
```

## Apache et PHP

### Création du `Containerfile`

On crée le fichier `Containerfile` :

```bash
echo "FROM php:8.3-apache" > reseau/Containerfile
```

On modifie ensuite `Containerfile` pour inclure le contenu suivant :

```Containerfile
FROM php:8.3-apache

COPY conf/vhost.conf /etc/apache2/sites-available/000-default.conf
COPY MVC ./

RUN a2enmod rewrite
```

### Configuration d'Apache

On écrit une configuration Apache pour :
- Changer le dossier racine.
- Empêcher le listing des dossiers.
- Autoriser l'utilisation des fichiers `.htaccess`.
- Ignorer toutes les restrictions d'accès avec `Require all granted`.

#### Contenu du fichier `conf/vhost.conf`

```apache
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

### Build de l'image Apache/PHP

```bash
podman build -f Containerfile -t apache_custom
```

### Exécution du conteneur Apache/PHP

```bash
podman run --tls-verify=false --privileged -d -p 8080:80 --name appli apache_custom
```

Ici, `apache_custom` est le nom de l'image créée à partir du `Containerfile`.
