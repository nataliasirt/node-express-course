document.getElementById("fetch-data").addEventListener("click", async () => {
    const response = await fetch("/api/v1/products");
    const products = await response.json();
  
    const productsDiv = document.getElementById("products");
    productsDiv.innerHTML = products
      .map((product) => `<p>${product.name} - $${product.price}</p>`)
      .join("");
  });
  