<?php
session_start();
session_destroy(); // Encerra a sessão
header('Location: ../site/html/login.html'); // Redireciona para o login
exit;
?>
