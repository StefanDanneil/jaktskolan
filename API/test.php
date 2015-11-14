<?php
	$request = json_decode(file_get_contents("php://input"));
	$newQuestion = $request->question;
	$submittedQuestions = json_decode(file_get_contents('../Questions/submittedQuestions.json', true));

	array_push($submittedQuestions, json_decode($newQuestion));
	file_put_contents('../Questions/submittedQuestions.json', json_encode($submittedQuestions, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
?>