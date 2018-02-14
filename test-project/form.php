<?php
  $email = file_get_contents('php://input');
  $email_static = 'test@gmail.com';

  if($email === $email_static){
    header('HTTP/1.1 200 ok', true, 200);
    echo 'Success';
  }else{
    header('HTTP/1.1 403 forbidden', true, 403);
    echo 'Incorrect email';
  };
?>