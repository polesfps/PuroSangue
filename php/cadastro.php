<?php
include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nome = $_POST['nomeCompleto'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

    // Preparar a query para evitar SQL Injection
    $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nome, $email, $senha);

    if ($stmt->execute()) {
        $stmt->close();
        $conn->close();
        header('Location: ./login.php'); // Redireciona para a página de login
        exit();
    } else {
        echo "Erro ao cadastrar: " . $stmt->error;
    }
}
?>

