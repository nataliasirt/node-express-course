//import express modules and data
const express = require("express");
const { products } = require("./data");
const app = express();
const port = 3000;

//middleware for stattic files from 'public' directory
app.use(express.static("./public"));

//routes for /api/v1/test to return JSON
app.get("/api/v1/test", (req, res) => {
    res.json({ message: "It worked!" });
  });

//routes to return all products
app.get("/api/v1/products", (req, res) => {
    res.json(products);
  });

//get product by ID
app.get("/api/v1/products/:productID", (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find((p) => p.id === idToFind);
  
    if (!product) {
      return res.status(404).json({ message: "That product was not found." });
    }
  
    res.json(product);
  });

// query products
app.get("/api/v1/query", (req, res) => {
    const { search, limit } = req.query;
    let filteredProducts = products;
  
    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().startsWith(search.toLowerCase())
      );
    }
  
    if (limit) {
      filteredProducts = filteredProducts.slice(0, parseInt(limit));
    }
  
    res.json(filteredProducts);
  });

  // handle 404 - Page Not Found
app.all('*', (req, res) => {
    res.status(404).send('Page Not Found');
  });

  //start the server 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
// Console log to seee in the console the script is running
  console.log('Express Tutorial')