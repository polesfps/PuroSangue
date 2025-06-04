<?php
$host = 'localhost'; // Servidor
$user = 'root';      // Usuário do MySQL
$password = '';      // Senha do MySQL
$database = 'sistema_usuarios'; // Nome do banco

// Conexão com o banco
$conn = new mysqli($host, $user, $password, $database);

// Verifica se houve erro
if ($conn->connect_error) {
    die('Erro na conexão: ' . $conn->connect_error);
}
?>
