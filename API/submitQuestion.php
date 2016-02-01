<?php
	$request = json_decode(file_get_contents("php://input"));
	$newQuestion = $request->question;

	if($newQuestion == null){
		http_response_code(422);
	}

	else {
		http_response_code(200);
		$submittedQuestions = json_decode(file_get_contents('../Questions/submittedQuestions.json', true));
		array_push($submittedQuestions, json_decode($newQuestion));
		file_put_contents('../Questions/submittedQuestions.json', json_encode($submittedQuestions, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
	}
?>