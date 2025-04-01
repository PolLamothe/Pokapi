<?php

	require "config".DIRECTORY_SEPARATOR."config.inc.php";

    spl_autoload_register(function($class) {

        $path=$class;
        if (DIRECTORY_SEPARATOR === '/') {
            $path=str_replace('\\','/',$class);
        }
        $include = HOME."..".DIRECTORY_SEPARATOR.$path.'.php';

        if (file_exists($include))
            require $include;
        else
            echo '<pre>'.$class.PHP_EOL.$include.PHP_EOL.'not found'.'</pre>';

    });
    $router = new \system\Router();
    $router->route();

?>
