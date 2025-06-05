<?php
include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $novaSenha = password_hash($_POST['novaSenha'], PASSWORD_DEFAULT);

    $update = "UPDATE usuarios SET senha = '$novaSenha' WHERE email = '$email';";

    //$stmt->bind_param("ss", $novaSenha, $email);

    if ($conn->query($update)) {
        header('Location: ../site/html/login.html');
        exit;
    } else {
        echo "Cagou tudo:" . $conn->error;
    }
}

?>