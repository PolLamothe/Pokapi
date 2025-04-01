# Virtualisation

> [Lien sujet](https://gitlab.univ-nantes.fr/iut.info2.virtualisation/virtualisation.sae)



MARIADB:
recherche image maria db
```bash
podman search --tls-verify=false dockerhub.nexus.dep-info.iut-nantes.univ-nantes.prive/mariadb
podman pull --tls-verify=false dockerhub.nexus.dep-info.iut-nantes.univ-nantes.prive/mariadb
```
Creation avec variable environement
```bash
podman run --tls-verify=false --privileged -d -e MARIADB_ROOT_PASSWORD=E239982A --name conteneur-bd -p 3306:3306 a914eff5d2eb 
```

PHP:
Recherche et pull
```bash
podman search --tls-verify=false dockerhub.nexus.dep-info.iut-nantes.univ-nantes.prive/php:apache
podman pull --tls-verify=false dockerhub.nexus.dep-info.iut-nantes.univ-nantes.prive/php:apache
```
Creation avec Arguments
```bash
podman run --tls-verify=false --privileged -d -p 8080:80 --name appli a32aa62d4c04
```

CONTAINER FILE:
Creation du COntainer FILE
```bash
echo FROM > reseau/ContainerFile
```
On modifie le conatiner FILE
```bash
nano ContainerFile
```
```bash
FROM php:apache
COPY script.php > /usr/src/application
WORKDIR /usr/src/application
CMD [ "php", "./script.php" ]
```
