# Commandes

podman run -d --network apache --name mariadb_container -p 3306:3306 localhost/bd/4

podman run --rm -p 8080:80 -e "DB_PASSWORD=APACHE" -e "DB_LOGIN=APACHE" --network apache localhost/mvc/45
