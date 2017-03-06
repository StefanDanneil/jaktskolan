<?php

require_once __dir__ . '/../vendor/autoload.php';
require_once __dir__ . '/../lib/db/db.php';

$app = new \Slim\App;

require __dir__ . '/questions_endpoints/questions.php';
require __dir__ . '/quizes_endpoints/quizes.php';

$app->run();