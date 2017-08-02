<?php

require_once __dir__ . '/../lib/autoloader.php';

$app = new \Slim\App;

require __dir__ . '/endpoints/questions/index.php';
require __dir__ . '/endpoints/quizes/index.php';

$app->run();