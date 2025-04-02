<?php
    //HOME est app
    define("HOME",__DIR__.DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR);
    
    define("CFG", array(
        "db" => array(
                "host" => "mariadb_container",
                "port" => "3306",
                "database" => "apachebd",
                "login" => getenv("DB_LOGIN"),
                "password" => getenv("DB_PASSWORD"),
                "options" => array(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION),
                "exec" => null
            ),
          "siteURL" => "http://localhost:8080/"
          ));

    ?>
