document.addEventListener('DOMContentLoaded', () => {
  // Carrinho de compras
  const cartButton = document.getElementById('cart-button');
  const cartModal = document.getElementById('cart-modal');
  const closeCartButton = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Função para atualizar o carrinho na tela
  function updateCart() {
    cartItemsContainer.innerHTML = '';  // Limpa o carrinho antes de renderizar
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;

      // Cria o botão de remover
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remover';
      removeButton.classList.add('btn-remove');
      removeButton.addEventListener('click', () => removeFromCart(index));

      // Adiciona o botão de remover ao item do carrinho
      li.appendChild(removeButton);
      cartItemsContainer.appendChild(li);

      total += item.preco;
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toFixed(2);

    // Salva o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Função para adicionar um item ao carrinho
  function addToCart(nome, preco) {
    const item = { nome, preco };
    cart.push(item);
    updateCart();
  }

  // Função para remover um item do carrinho
  function removeFromCart(index) {
    cart.splice(index, 1); // Remove o item no índice especificado
    updateCart(); // Atualiza o carrinho após a remoção
  }

  // Função para abrir o modal do carrinho
  function openCartModal() {
    cartModal.classList.remove('hidden');
  }

  // Função para fechar o modal do carrinho
  function closeCartModal() {
    cartModal.classList.add('hidden');
  }

  // Event listener para abrir o modal do carrinho
  cartButton.addEventListener('click', openCartModal);

  // Event listener para fechar o modal do carrinho
  closeCartButton.addEventListener('click', closeCartModal);

  // Adicionando a funcionalidade do carrinho nos botões de "Adicionar ao carrinho"
  const addToCartButtons = document.querySelectorAll('.btn-add-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const nome = button.getAttribute('data-nome');
      const preco = parseFloat(button.getAttribute('data-preco'));
      addToCart(nome, preco);
    });
  });

  // Atualiza o carrinho ao carregar a página
  updateCart();

  // Perfil de usuário
  const profileButton = document.getElementById('profile-button');
  const profileModal = document.getElementById('profile-modal');
  const closeProfileModal = document.getElementById('close-profile-modal');
  const loginScreen = document.getElementById('login-screen');
  const profileScreen = document.getElementById('profile-screen');
  const displayUsername = document.getElementById('display-username');
  const logoutBtn = document.getElementById('logout-btn');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginSubmitButton = document.getElementById('login-submit');

  // Verifica se o usuário está logado
  const loggedInUser = localStorage.getItem('username');
  if (loggedInUser) {
    // Se o usuário estiver logado, mostra a tela de perfil
    loginScreen.classList.add('hidden');
    profileScreen.classList.remove('hidden');
    displayUsername.textContent = loggedInUser;
  }

  // Abre o modal de perfil
  profileButton.addEventListener('click', () => {
    profileModal.classList.remove('hidden');
  });

  // Fecha o modal de perfil
  closeProfileModal.addEventListener('click', () => {
    profileModal.classList.add('hidden');
  });

  // Login do usuário
  loginSubmitButton.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Simulação de login
    if (username && password) {
      localStorage.setItem('username', username);
      loginScreen.classList.add('hidden');
      profileScreen.classList.remove('hidden');
      displayUsername.textContent = username;
      usernameInput.value = '';
      passwordInput.value = '';
    } else {
      alert('Por favor, insira um nome de usuário e senha!');
    }
  });

  // Logout do usuário
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    loginScreen.classList.remove('hidden');
    profileScreen.classList.add('hidden');
  });
});
const cadastroButton = document.getElementById('cadastro-btn');
if (cadastroButton) {
  cadastroButton.addEventListener('click', () => {
    window.location.href = 'cadastro.html';
  });
}
