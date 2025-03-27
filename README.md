# Amazon Scraper Project by Paulo Dias
![Tela](https://github.com/paulodiasred/bun-vite-task/blob/main/frontend/src/assets/tela1.png)

This project is a simple web application that scrapes product listings from Amazon and displays them in a nice interface. It has two parts: a backend and a frontend.

---

## Backend

The backend is built with **Bun** and **Express**. It uses **axios** to fetch the HTML from Amazon and **JSDOM** to parse the page and extract the product data.

### What It Does
- Receives a keyword from the user.
- Builds a search URL for Amazon.
- Fetches the HTML of the search results page.
- Extracts the product title, rating, number of reviews, and image URL.
- Returns the data as JSON.

### Requirements
- [Bun](https://bun.sh)
- Express, axios, jsdom, and cors (installed via `bun add`)

### How to Run the Backend
1. Open your terminal and navigate to the `backend` folder.
2. Run the following command:
`bun run dev`
3. The backend will start on: `http://localhost:3000`

---

## Frontend

The frontend is built with **Vite**, plain HTML, CSS, and JavaScript. It uses **Bootstrap** (via CDN) for a better design.

### What It Does
- Provides an input field for the search keyword.
- Sends a request to the backend with the keyword.
- Displays the product information in Bootstrap cards.

### Requirements
- Node.js and npm
- Vite (created with `npm create vite@latest --template vanilla`)

### How to Run the Frontend
1. Open your terminal and navigate to the `frontend` folder.
2. Run the following command:
`npm run dev`
3. Open your browser at the provided local address (usually `http://localhost:5173`).

---

## How to Use the Application

1. Open the frontend in your browser.
2. Enter a search keyword (e.g., "notebook") in the input box.
3. Click the **Buscar** button.
4. The page will display a list of products from Amazon with:
- Product image
- Title (from the image's alt text)
- Rating
- Number of reviews

---

## Notes

- The backend sends a custom **User-Agent** header to help get the correct HTML from Amazon.
- Sometimes Amazon may change its page structure or block the request. If you see errors or no products, the HTML layout might have changed.
- Make sure both the backend and frontend servers are running.

---

Enjoy using the Amazon Scraper Project!

---
