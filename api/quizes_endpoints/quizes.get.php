<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/quizes', function (Request $request, Response $response) {
  $db = new Db();

  $rows = $db->select('SELECT * FROM quiz');

  if ($rows !== false) {
    $result = json_encode($rows);
  } else {
    $result = $db->error();
  }

  $response->getBody()->write($result);

  return $response;

});