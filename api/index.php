<?php
require __dir__ . '/../vendor/autoload.php';

$app = new \Slim\App;

require __dir__ . '/questions_endpoints/questions.php';


$app->run();