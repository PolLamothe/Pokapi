<?php
    //HOME est app
    define("HOME",__DIR__.DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR);
    
    const CFG = array(
        "db" => array(
                "host" => HOME."data".DIRECTORY_SEPARATOR,
                "port" => null,
                "database" => "madb.db",
                "login" => "",
                "password" => "",
                "options" => array(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION),
                "exec" => "PRAGMA foreign_keys = ON;"
            ),
          "siteURL" => "http://localhost:8080/"
        );

    ?>
