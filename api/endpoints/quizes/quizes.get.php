<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Db\DbWrapper;
use Model\Quiz\Quiz;

$app->get('/quizes', function (Request $request, Response $response) {
  try{
    $db = new DbWrapper();

  }catch(Exception $ex){
    echo 'hoho';
  }

  $test = Quiz::getById(2);

  $result = json_encode($test);

  $response->getBody()->write($result);

  return $response;

});