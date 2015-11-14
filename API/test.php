<?php
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$question = $request->question;
	$submittedQuestions = file_get_contents('../Questions/submittedQuestions.json', true);
	$submittedQuestionsDecoded = json_decode($submittedQuestions);
	array_push($submittedQuestionsDecoded, json_decode($question));

	file_put_contents('../Questions/submittedQuestions.json', json_encode($submittedQuestionsDecoded));
?>