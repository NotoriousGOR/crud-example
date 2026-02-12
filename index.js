// This is a simple Express server that provides a RESTful API for managing products.
// It includes routes for fetching products, creating new products, and updating existing products.
// The server listens on port 3000 and returns JSON responses.
// The code also includes error handling for unsupported HTTP methods and missing routes.

import express from "express";

// body-parser is a middleware that parses incoming request bodies in a middleware before your handlers, available under the req.body property.
import bodyParser from "body-parser";

// initialize the Express application
const app = express();

// define the port number for the server to listen on
const PORT = 3000;

// use body-parser middleware to parse JSON request bodies where the Content-Type header is application/json
app.use(bodyParser.json());

// start the server
app.listen(PORT, () =>
  // log a message to the console when the server is running
  console.log(`Server running on port: http://localhost:${PORT}`),
);

/* 

  *** ROUTES *** 

*/

// Handle GET requests to the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Product API!");
});

// Handle GET requests to fetch products, with optional parameter for product ID
app.get("/api/products{/:id}", (req, res) => {
  const productId = req.params.id;
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
  // Usually, you would save the new product to a database here.
  // For demonstration purposes, we'll just log the received data and return it in the response.
  console.log("Received body:", postData);

  return res.json({ returnedData: postData });
});

// handle PUT requests to update a product (for demonstration purposes, this just echoes back the data)
app.put("/api/products/:id", (req, res) => {
  const putData = req.body;
  console.log("Received body:", putData);

  return res.json({ returnedData: putData });
});

// DEMO: Live Code DELETE route for /api/products:id
app.delete("/api/products/:id", (req, res) => {
  const productID = req.params.id;
  console.log(`Received request to delete product with ID: ${productID}`);

  // In a real application, you would delete the product from the database here.

  // For demonstration purposes, we'll just return a success message.
  return res.json({
    message: `Product with ID ${productID} has been deleted (not really, this is just a demo).`,
  });
});

// handle unsupported HTTP methods for /api/products
app.all("/api/products", (req, res) => {
  res.status(405).json({ error: "Method Not Allowed" });
});

// handle missing routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});
