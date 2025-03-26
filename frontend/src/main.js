const button = document.getElementById("scrapeButton");
const keywordInput = document.getElementById("keyword");
const resultsDiv = document.getElementById("results");

// This function sends a request to the backend to fetch products based on the keyworrd
async function scrapeProducts() {
  // Get the value from the input field and remov extra spaces
  const keyword = keywordInput.value.trim();

  // If the user did not type a keyword, show an alert and stop the function
  if (!keyword) {
    alert("Por favor, digite uma palavra-chave!");
    return;
  }

  try {
    // Send a GET request to the backend API with the keyword
    const response = await fetch(
      `http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`
    );
    const data = await response.json();

    // Clear any previous results from the resultsDiv
    resultsDiv.innerHTML = "";

    // If no products were found, displaay a message to the user
    if (!data.length) {
      resultsDiv.innerHTML = `<div class="col-12"><p class="text-center text-muted">Nenhum produto encontrado.</p></div>`;
      return;
    }

    // For each product in the returned data, create a Bootstrap card to show product details
    data.forEach((produto) => {
      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-3");

      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${produto.imgURL}" class="card-img-top" alt="${
        produto.titulo
      }" style="object-fit: contain; height: 250px;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${produto.titulo}</h5>
            <p class="card-text mb-1"><strong>Avaliação:</strong> ${
              produto.avaliacao
            }</p>
            <p class="card-text mb-3"><strong>Número de Reviews:</strong> ${
              produto.numReviews
            }</p>
            <div class="mt-auto">
              <a href="${produto.linkProd}" target="_blank" class="btn btn-primary">
                Ver no Amazon
              </a>
            </div>
          </div>
        </div>
      `;
      // Append the card to the resultsDiv so it appears on the page
      resultsDiv.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    resultsDiv.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger" role="alert">
          Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.
        </div>
      </div>
    `;
  }
}

button.addEventListener("click", scrapeProducts);
