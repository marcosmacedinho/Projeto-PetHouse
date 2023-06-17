// Configurações para o slide
const slider = document.querySelector('.slider');
const slideContainers = slider.querySelectorAll('.slide-container');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
const slideDotsContainer = document.querySelector('.slide-dots');
let currentSlideIndex = 0;

// Função para exibir o slide especificado pelo índice
function showSlide(index) {
  slideContainers.forEach((container, i) => {
    if (i === index) {
      container.style.opacity = 1;
    } else {
      container.style.opacity = 0;
    }
  });
}

// Função para exibir o próximo slide
function showNextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % slideContainers.length;
  showSlide(currentSlideIndex);
  updateSlideDots(currentSlideIndex);
  saveCurrentSlideIndex();
}

// Função para exibir o slide anterior
function showPreviousSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + slideContainers.length) % slideContainers.length;
  showSlide(currentSlideIndex);
  updateSlideDots(currentSlideIndex);
  saveCurrentSlideIndex();
}

// Atualiza a classe .active da bolinha de acordo com o slide atual
function updateSlideDots(index) {
  const slideDots = slideDotsContainer.querySelectorAll('.slide-dot');
  slideDots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Adiciona as bolinhas ao slide
for (let i = 0; i < slideContainers.length; i++) {
  const dot = document.createElement('div');
  dot.classList.add('slide-dot');
  dot.addEventListener('click', () => {
    showSlide(i);
    updateSlideDots(i);
    saveCurrentSlideIndex();
  });
  slideDotsContainer.appendChild(dot);
}

// Restaura o índice do slide atual do armazenamento local do navegador
function restoreCurrentSlideIndex() {
  const savedIndex = localStorage.getItem('currentSlideIndex');
  if (savedIndex !== null) {
    currentSlideIndex = parseInt(savedIndex);
    showSlide(currentSlideIndex);
    updateSlideDots(currentSlideIndex);
  }
}

// Salva o índice do slide atual no armazenamento local do navegador
function saveCurrentSlideIndex() {
  localStorage.setItem('currentSlideIndex', currentSlideIndex.toString());
}

// Mostra o primeiro slide inicialmente ou restaura o slide anteriormente selecionado
if (localStorage.getItem('currentSlideIndex') !== null) {
  restoreCurrentSlideIndex();
} else {
  showSlide(currentSlideIndex);
  updateSlideDots(currentSlideIndex);
}

// Adiciona os ouvintes de eventos para as setas de navegação
nextArrow.addEventListener('click', showNextSlide);
prevArrow.addEventListener('click', showPreviousSlide);
