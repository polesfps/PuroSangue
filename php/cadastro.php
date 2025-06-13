<?php
session_start();
require_once 'conexao.php'; // Arquivo que conecta ao banco de dados

// Recebe os dados do formulário
$nome = $_POST['nomeCompleto'];
$email = $_POST['email'];
$senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

// Verifica se o email já existe
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // Email já cadastrado
    echo "Email já está em uso!";
    exit;
} else {
    // Insere o novo usuário
    $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nome, $email, $senha);

    if ($stmt->execute()) {
        // Login automático após cadastro
        $_SESSION['usuario_id'] = $stmt->insert_id;
        $_SESSION['usuario_email'] = $email;
        $_SESSION['usuario_nome'] = $nome;

        // Redireciona para a página principal
        header("Location: ../html/index.html");
        exit;
    } else {
        echo "Erro ao cadastrar usuário.";
    }
}
?>
