<?php
$response = array(
    'message' => ''
); 
$errorEmpty = false;
$errorEmail = false;
$errorPassword = false;

if(isset($_POST['email']) || isset($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $number = preg_match('@[0-9]@', $password);
    $uppercase = preg_match('@[A-Z]@', $password);
    $lowercase = preg_match('@[a-z]@', $password);
    $specialChars = preg_match('@[^\w]@', $password);
    if (!empty($email) && !empty($password)) {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response['message'] = 'Invalid Email';
            $errorEmail = true;
        }
        if(strlen($password) < 8 || !$number || !$uppercase || !$lowercase || !$specialChars) {
            $response['message'] = "Password must be at least 8 characters in length and must contain at least one number, one upper case letter, one lower case letter and one special character.";
            $errorPassword = true;
        }
    } else {
        $errorEmpty = true;
        $response['message'] = 'Empty';
    }
} 
if ($errorEmail == false && $errorPassword == false && $errorEmpty == false) {
    $response['message'] = 'success';
}
echo json_encode($response);
?>