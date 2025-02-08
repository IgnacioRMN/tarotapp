// Modo oscuro
document.getElementById('toggleDarkMode').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
  });
  
  // Cargar cartas
  document.getElementById('drawCards').addEventListener('click', function () {
    fetch("https://tarot-api-es.vercel.app/api/v1/random?n=3")
      .then(response => response.json())
      .then(data => {
        const cardContainer = document.getElementById('cardContainer');
        cardContainer.innerHTML = '';
  
        data.cards.forEach(card => {
          const cardElement = document.createElement('div');
          cardElement.classList.add('col-md-4', 'mb-4');
          cardElement.innerHTML = `
            <div class="card h-100">
              <img src="${card.image}" class="card-img-top" alt="${card.name}" loading="lazy">
              <div class="card-body">
                <h5 class="card-title">${card.name}</h5>
                <p class="card-text"><strong>Significado:</strong> ${card.meaning_up}</p>
                <div class="card-description">
                  <p class="card-text"><strong>Descripción:</strong> ${card.desc}</p>
                </div>
                <button class="card-button">Leer más</button>
              </div>
            </div>
          `;
          cardContainer.appendChild(cardElement);
  
          // Expandir/contraer descripción
          const button = cardElement.querySelector('.card-button');
          const description = cardElement.querySelector('.card-description');
          button.addEventListener('click', () => {
            if (description.style.maxHeight) {
              description.style.maxHeight = null;
              button.textContent = 'Leer más';
            } else {
              description.style.maxHeight = '500px';
              button.textContent = 'Leer menos';
            }
          });
        });
      })
      .catch(error => console.error("Hubo un problema con la solicitud:", error));
  });