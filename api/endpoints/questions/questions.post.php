<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->post('/questions', function (Request $request, Response $response) {

    $notImplementedResponse = $response->withStatus(501);

    return $notImplementedResponse;

});