document.addEventListener('DOMContentLoaded', () => {
  // 1. Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // 2. Carrossel
  const slides = document.querySelectorAll('.carrousel-slide');
  const indicators = document.querySelectorAll('.carrousel-indicator');
  let currentSlide = 0;
  const slideIntervalTime = 5000; // 5 segundos

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      indicators[i].classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  // Navegação por indicadores
  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
      showSlide(i);
      resetInterval();
    });
  });

  // Troca automática
  let slideInterval = setInterval(() => {
    let nextSlide = (currentSlide + 1) % slides.length;
    showSlide(nextSlide);
  }, slideIntervalTime);

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      let nextSlide = (currentSlide + 1) % slides.length;
      showSlide(nextSlide);
    }, slideIntervalTime);
  }

  // 3. Carrinho de compras
  const cartBtn = document.getElementById('cart-btn');
  const cartPanel = document.getElementById('cart-panel');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  let cart = [];

  // Atualiza visualização do carrinho
  function updateCartUI() {
    // Limpar lista
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<li>Seu carrinho está vazio.</li>';
    } else {
      cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}`;
        
        // Botão remover
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '❌';
        removeBtn.style.marginLeft = '10px';
        removeBtn.style.cursor = 'pointer';
        removeBtn.title = 'Remover item';
        removeBtn.addEventListener('click', () => {
          removeFromCart(index);
        });

        li.appendChild(removeBtn);
        cartItemsContainer.appendChild(li);
      });
    }

    // Atualiza total
    const total = cart.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;

    // Atualiza contador
    const count = cart.reduce((sum, item) => sum + item.quantidade, 0);
    cartCount.textContent = count;
  }

  // Adiciona produto ao carrinho
  function addToCart(nome, preco) {
    // Verifica se o produto já existe no carrinho
    const existingIndex = cart.findIndex(item => item.nome === nome);
    if (existingIndex >= 0) {
      cart[existingIndex].quantidade++;
    } else {
      cart.push({ nome, preco: Number(preco), quantidade: 1 });
    }
    updateCartUI();
  }

  // Remove produto do carrinho
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
  }

  // Botões de adicionar ao carrinho
  const addCartButtons = document.querySelectorAll('.btn-add-cart');
  addCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const nome = btn.getAttribute('data-nome');
      const preco = btn.getAttribute('data-preco');
      addToCart(nome, preco);
      // Abre o painel do carrinho para mostrar o item adicionado
      cartPanel.classList.remove('hidden');
    });
  });

  // Mostrar/ocultar painel do carrinho
  cartBtn.addEventListener('click', () => {
    cartPanel.classList.toggle('hidden');
  });

  // Finalizar compra
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }
   // alert(`Compra finalizada!\nTotal: ${cartTotal.textContent}\nObrigado pela preferência!`);
    cart = [];
    updateCartUI();
    cartPanel.classList.add('hidden');
  });

  // Inicializa UI
  updateCartUI();
});
document.querySelectorAll('.btn-add-cart').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('animate');
    // Remove a classe para poder animar de novo em futuros cliques
    button.addEventListener('animationend', () => {
      button.classList.remove('animate');
    }, { once: true });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const cartButton = document.getElementById('cart-button');
  const cartModal = document.getElementById('cart-modal');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsList = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  let cart = [];

  // Abrir modal do carrinho
  cartButton.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
    renderCart();
  });

  // Fechar modal do carrinho
  closeCartBtn.addEventListener('click', () => {
    cartModal.classList.add('hidden');
  });

  // Função para renderizar o carrinho
  function renderCart() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      total += item.preco * item.quantidade;

      const li = document.createElement('li');
      li.innerHTML = `
        ${item.nome} x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}
        <button class="remove-item" data-index="${index}">x</button>
      `;
      cartItemsList.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantidade, 0);

    // Botão remover item
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', e => {
        const index = e.target.getAttribute('data-index');
        cart.splice(index, 1);
        renderCart();
      });
    });
  }

  // Adicionar produto ao carrinho
  document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', () => {
      const nome = button.getAttribute('data-nome');
      const preco = parseFloat(button.getAttribute('data-preco'));

      const itemExistente = cart.find(item => item.nome === nome);

      if (itemExistente) {
        itemExistente.quantidade++;
      } else {
        cart.push({ nome, preco, quantidade: 1 });
      }

     // alert(`${nome} adicionado ao carrinho!`);
      renderCart();
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const btnAddCart = document.getElementById('btn-add-cart');

  btnAddCart.addEventListener('click', () => {
    const nome = btnAddCart.getAttribute('data-nome');
    const preco = parseFloat(btnAddCart.getAttribute('data-preco'));
    const tamanhoSelect = document.getElementById('tamanho');
    const tamanho = tamanhoSelect.value;

    // Exemplo simples para integração com o main.js (carrinho)
    const event = new CustomEvent('addToCart', {
      detail: {
        nome: nome + ' - Tamanho ' + tamanho,
        preco: preco
      }
    });
    window.dispatchEvent(event);

    //alert(`Produto "${nome} - Tamanho ${tamanho}" adicionado ao carrinho!`);
  });
});
// Elementos
const profileButton = document.getElementById('profile-button');
const profileModal = document.getElementById('profile-modal');
const closeProfileModal = document.getElementById('close-profile-modal');

const loginScreen = document.getElementById('login-screen');
const profileScreen = document.getElementById('profile-screen');

const loginSubmit = document.getElementById('login-submit');
const logoutBtn = document.getElementById('logout-btn');

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

const displayUsername = document.getElementById('display-username');

// Simula estado de login
let loggedUser = null; // null significa deslogado

// Função para abrir modal, mostrando tela certa conforme login
function openProfileModal() {
  profileModal.classList.remove('hidden');
  if (loggedUser) {
    loginScreen.classList.add('hidden');
    profileScreen.classList.remove('hidden');
    displayUsername.textContent = loggedUser;
  } else {
    loginScreen.classList.remove('hidden');
    profileScreen.classList.add('hidden');
  }
}

// Fechar modal
function closeModal() {
  profileModal.classList.add('hidden');
  usernameInput.value = '';
  passwordInput.value = '';
}

// Evento abrir modal
profileButton.addEventListener('click', openProfileModal);

// Evento fechar modal
closeProfileModal.addEventListener('click', closeModal);

// Simulação simples de login (só para demo)
loginSubmit.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === '' || password === '') {
    alert('Por favor, preencha usuário e senha.');
    return;
  }

  // Aqui você colocaria verificação real (API, etc)
  // Para demo, aceita qualquer usuário/senha
  loggedUser = username;

  openProfileModal();
});

// Logout
logoutBtn.addEventListener('click', () => {
  loggedUser = null;
  closeModal();
});
