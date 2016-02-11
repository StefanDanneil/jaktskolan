<?php

$newQuestion = json_decode($_POST['question']);

if($newQuestion == null){
	http_response_code(422);
} else {

	if($newQuestion->isImageQuestion){
		$newQuestion->imageUrl = HandleFile();
	}

	http_response_code(200);
	$submittedQuestions = json_decode(file_get_contents('../Questions/submittedQuestions.json', true));
	array_push($submittedQuestions, $newQuestion);
	file_put_contents('../Questions/submittedQuestions.json', json_encode($submittedQuestions, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}


function handleFile()
{
	try {

    // Undefined | Multiple Files | $_FILES Corruption Attack
    // If this request falls under any of them, treat it invalid.
		if (
			!isset($_FILES['file']['error']) ||
			is_array($_FILES['file']['error'])
			) {
			throw new RuntimeException('Invalid parameters.');
	}

    // Check $_FILES['file']['error'] value.
	switch ($_FILES['file']['error']) {
		case UPLOAD_ERR_OK:
		break;
		case UPLOAD_ERR_NO_FILE:
		throw new RuntimeException('No file sent.');
		case UPLOAD_ERR_INI_SIZE:
		case UPLOAD_ERR_FORM_SIZE:
		throw new RuntimeException('Exceeded filesize limit.');
		default:
		throw new RuntimeException('Unknown errors.');
	}

    // You should also check filesize here.
	if ($_FILES['file']['size'] > 1000000) {
		throw new RuntimeException('Exceeded filesize limit.');
	}

    // DO NOT TRUST $_FILES['file']['mime'] VALUE !!
    // Check MIME Type by yourself.
	$finfo = new finfo(FILEINFO_MIME_TYPE);
	if (false === $ext = array_search(
		$finfo->file($_FILES['file']['tmp_name']),
		array(
			'jpg' => 'image/jpeg',
			'png' => 'image/png',
			'gif' => 'image/gif',
			),
		true
		)) {
		throw new RuntimeException('Invalid file format.');
}

    // You should name it uniquely.
    // DO NOT USE $_FILES['file']['name'] WITHOUT ANY VALIDATION !!
    // On this example, obtain safe unique name from its binary data.

$filename = sha1_file($_FILES['file']['tmp_name']);

if (!move_uploaded_file($_FILES['file']['tmp_name'], sprintf('../Content/images/%s.%s', $filename, $ext))) {
	throw new RuntimeException('Failed to move uploaded file.');
}

} catch (RuntimeException $e) {

	echo $e->getMessage();

}

return 'Content/images/' . $filename.'.'.$ext;
}

?>