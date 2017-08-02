<?php

require_once __DIR__ . '/../vendor/autoload.php';

spl_autoload_register(
    function ($class) {
        $class = str_replace('\\', '/', $class);
        $fileName = __DIR__.'/'.$class.'.php';

        if (file_exists($fileName)) {
            require_once $class . '.php';
        }
    }
);