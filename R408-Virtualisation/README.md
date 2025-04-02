# Virtualisation

> [Lien sujet](https://gitlab.univ-nantes.fr/iut.info2.virtualisation/virtualisation.sae)



MARIADB:


On crée un .sql pour qu'il crée automatiquement notre bd au moment de l'execution de notre container file
```bash
echo CREATE DATABASE apachebd; > init.sql
```

Creation du container File en question
```bash
echo FROM > ContainerfileBD
```
ce qui est compris dans le Container file
```bash
FROM mariadb:latest

ENV MARIADB_ROOT_PASSWORD=E239982A

COPY init.sql /docker-entrypoint-initdb.d/
EXPOSE 3306
```
```bash
podman build -f ContainerfileBD
```

8c2d44eafd66 est le numero d'image de notre Image
```bash
podman run --tls-verify=false -d --name conteneur-bd 8c2d44eafd66 
```


CONTAINER FILE:
Creation du Container File
```bash
echo FROM > reseau/ContainerFile
```
On modifie le container File
```bash
nano ContainerFile
```
```bash
FROM php:8.3-apache

COPY conf/vhost.conf /etc/apache2/sites-available/000-default.conf
COPY MVC ./

RUN a2enmod rewrite
```
Ecriture d'une confiuration apache, on a changer le dossier racine, on empeche le listing des dossier, on autorise les fichier htaccess a etre utiliser, et on ignore toutes les restrictions d'acces avec "Require all granted"
```bash
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
Build 
```bash
podman build -f Containerfile
```

Creation avec Arguments
```bash
podman run --tls-verify=false --privileged -d -p 8080:80 --name appli a32aa62d4c04
```
Ici a32aa62d4c04 est le numéro de l'image crée suite a l'execution de notre container File, 