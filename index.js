import express from "express";
import bodyParser from "body-parser";

// init express module
const app = express();
const PORT = 3000;

// returns JSON and only allows JSON Content-Types
app.use(bodyParser.json());

// start the server
app.listen(PORT, () =>
  // log a message to the console when the server is running
  console.log(`Server running on port: http://localhost:${PORT}`),
);

// ROUTES

app.get("/", (req, res) => {
  res.send("Welcome to the Product API!");
});

// Handle GET requests to fetch products, with optional query parameter for product ID
app.get("/api/products", (req, res) => {
  const productId = req.query.id;
  console.log(productId);

  if (productId) {
    return res.json({
      product: {
        id: `${productId}`,
        name: "Charming sundress perfect for lunch out on the town.",
        description:
          "A beautiful and lightweight sundress, ideal for warm weather. Made with durable fabric.",
        brand: {
          type: "Brand",
          name: "Tailspin",
        },
        availability: "in stock",
        condition: "new",
        ageGroup: "adult",
        color: "Blue",
        imageLink: "http://www.somebrand.com",
      },
    });
  }

  // Return all products if no ID is provided (for demonstration purposes, this is just a placeholder)
  return res.json({
    products: [
      {
        id: "1",
        name: "Charming sundress perfect for lunch out on the town.",
        description:
          "A beautiful and lightweight sundress, ideal for warm weather. Made with durable fabric.",
        brand: {
          type: "Brand",
          name: "Tailspin",
        },
        availability: "in stock",
        condition: "new",
        ageGroup: "adult",
        color: "Blue",
        imageLink: "http://www.somebrand.com",
      },
      {
        id: "2",
        name: "Stylish sneakers for everyday wear.",
        description:
          "Comfortable and trendy sneakers suitable for various occasions. Made with breathable materials.",
        brand: {
          type: "Brand",
          name: "Tailspin",
        },
        availability: "in stock",
        condition: "new",
        ageGroup: "adult",
        color: "White",
        imageLink: "http://www.somebrand.com/sneakers",
      },
    ],
  });
});

// handle POST requests to create a new product
app.post("/api/products", (req, res) => {
  const postData = req.body;
  console.log("Received body:", postData);

  return res.json({ returnedData: postData });
});

// handle PUT requests to update a product (for demonstration purposes, this just echoes back the data)
app.put("/api/products", (req, res) => {
  const putData = req.body;
  console.log("Received body:", putData);

  return res.json({ returnedData: putData });
});

// DEMO: Live Code DELETE route for /api/products

// handle unsupported HTTP methods for /api/products
app.all("/api/products", (req, res) => {
  res.status(405).json({ error: "Method Not Allowed" });
});

// handle missing routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});
