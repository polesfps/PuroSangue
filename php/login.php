<?php
include 'conexao.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Busca o usuário no banco usando prepared statement para segurança
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($senha, $row['senha'])) {
            $_SESSION['email'] = $row['email']; // salva o email na sessão
            $_SESSION['nome'] = $row['nome'];   // salva o nome na sessão (opcional)
            header('Location: plataforma.php'); // redireciona para plataforma
            exit;
        } else {
            echo "Senha incorreta!";
        }
    } else {
        echo "Usuário não encontrado!";
    }
    $stmt->close();
}
?>


