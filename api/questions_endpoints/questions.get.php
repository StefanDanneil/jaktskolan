<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/questions', function (Request $request, Response $response) {

  $response->getBody()->write("Hello from the get endpoint");

  return $response;

});