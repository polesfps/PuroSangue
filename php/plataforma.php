<?php
session_start();
include 'conexao.php';

// Verifica se o usuário está logado
if (!isset($_SESSION['usuario'])) {
    header('Location: login.php');
    exit;
}

// Busca as informações do usuário logado
$usuario = $_SESSION['usuario'];
$sql = "SELECT * FROM usuarios WHERE usuario = '$usuario'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $dados = $result->fetch_assoc(); // Armazena os dados do usuário
} else {
    echo "Erro ao carregar informações do usuário.";
    exit;
}

// Atualiza o endereço
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['endereco'])) {
        $novoEndereco = $_POST['endereco'];
        $sqlUpdate = "UPDATE usuarios SET endereco = '$novoEndereco' WHERE usuario = '$usuario'";
        
        if ($conn->query($sqlUpdate)) {
            header('Location: plataforma.php'); // Recarrega a página após a atualização
            exit;
        } else {
            echo "Erro ao atualizar o endereço: " . $conn->error;
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Plataforma</title>
    <link rel="stylesheet" href="estilo.css">
</head>
<body>
    <div class="container">
        <h2>Bem-vindo, <?php echo $dados['nome']; ?>!</h2>
        <p>Estas são as suas informações cadastradas:</p>
        <ul>
            <li><strong>Nome:</strong> <?php echo $dados['nome']; ?></li>
            <li><strong>Email:</strong> <?php echo $dados['email']; ?></li>
            <li><strong>CPF:</strong> <?php echo $dados['cpf']; ?></li>
            <li><strong>Data de Nascimento:</strong> <?php echo $dados['data_nascimento']; ?></li>
            <li><strong>Endereço:</strong> <?php echo $dados['endereco']; ?></li>
        </ul>

        <h3>Atualizar Informações</h3>
        <form method="POST" action="">
            <label for="endereco">Novo Endereço:</label><br>
            <textarea name="endereco" id="endereco" rows="4" cols="50"><?php echo $dados['endereco']; ?></textarea><br><br>
            <button type="submit">Salvar Alterações</button>
        </form>

        <br>
        <a href="logout.php">Sair</a>
    </div>
</body>
</html>
