const express = require("express");
const axios = require("axios");
const { JSDOM } = require("jsdom");
const cors = require("cors");

const app = express();
const PORT = 3000;
// Use CORS middleware to allow requests from different origins
app.use(cors());

// Create an enbdpoint for scraping Amazon data
app.get("/api/scrape", async (req, res) => {
  // Get the 'keyword' from the query string
  const keyword = req.query.keyword;
  if (!keyword) {
    return res
      .status(400)
      .json({ error: "Por favor, forneça a query 'keyword'" });
  }

  try {
    // Build the Amazon search URL using the keyword
    // this header helps to receive proper HTML as if a real browser is making the request
    const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
          "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      },
    });

    const html = response.data;

    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Select all search result elements using a data attribute selector
    const searchResults = document.querySelectorAll(
      'div[data-component-type="s-search-result"]'
    );

    // create an array to store the extracted product data
    const produtos = [];

    // Loop through each search result element
    searchResults.forEach((result) => {
      // image element
      const imgEl = result.querySelector("img.s-image");

      // product title from the image's alt attribute or show a default message
      const titulo = imgEl
        ? imgEl.getAttribute("alt")
        : "Título não encontrado";

      // image URL from the img element's src attribute
      const imgURL = imgEl ? imgEl.src : "Imagem não disponível";

      // Extract the product link from an anchor tag
      const linkEl = result.querySelector("a.a-link-normal.s-no-outline");
      // Build the full URL if linkEl is found, otherwise set a default value
      const linkProd = linkEl
        ? "https://www.amazon.com.br" + linkEl.getAttribute("href")
        : "#";

      // rating element
      const avaliacaoEl = result.querySelector("span.a-icon-alt");
      //extract the rating text and remove extra spaces, or use a default message
      const avaliacao = avaliacaoEl
        ? avaliacaoEl.textContent.trim()
        : "Sem avaliação";

      // find the element that shows the number of reviews
      const numReviewsEl = result.querySelector(
        "span.a-size-base.s-underline-text"
      );
      const numReviews = numReviewsEl ? numReviewsEl.textContent.trim() : "0";
      // add this product's data to the 'produtos' array
      produtos.push({
        titulo,
        avaliacao,
        numReviews,
        imgURL,
        linkProd
      });
    });

    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao realizar o scraping" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
