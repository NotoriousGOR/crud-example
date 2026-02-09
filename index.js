const http = require("node:http");
const { URL } = require("url");
const hostname = "127.0.0.1";
const port = 3000;

// create local HTTP server you can send and receive data from
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log(req.url);
  console.log(req.method);

  //   using built in Node URL package to easily get search parameters
  const requestURL = new URL(`http://${hostname}:${port}${req.url}`);
  // handling routes, used switch to eliminate multiple if statements. Not standard practice, but I think it looks cleaner :)

  // breaking out into categories
  if (requestURL.pathname.startsWith("/api/products")) {
    // breaking down into request types
    const productId = requestURL.searchParams.get("id");
    console.log(productId);

    //   GET one Product
    if (req.method == "GET" && productId) {
      // build out response object and return to sender
      return res.end(
        JSON.stringify({
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
            gender: "female",
            color: "Blue",
            imageLink: "http://www.tailspintoys.com",
          },
        }),
      );
    }

    //   GET all
    if (req.method == "GET") {
      // build out response object and return to sender
      return res.end(
        JSON.stringify({
          data: "Wasdaorld!",
        }),
      );
    }

    // if POST
    else if (req.method == "POST") {
      // empty variable we will be streaming the data too
      let body = "";

      // Event handler for data that's received from the request, it takes a lambda function that runs on each byte or "chunk" of data
      req.on("data", (chunk) => {
        // appending our broader scoped variable with the data that's parsed as a string
        body += chunk.toString();
      });

      // Event handler for when the data is done coming in. Similar to .on("data"), it takes a lambda function to do whatever
      req.on("end", () => {
        console.log("Received body:", body);

        // parse JSON from body
        try {
          // parsing the data from a string to an Object we can use
          const postData = JSON.parse(body);

          // not gonna do anything with it
          console.log("Parsed data:", postData);

          // return to sender
          return res.end(JSON.stringify({ returnedData: postData }));
        } catch (error) {
          console.error("error: ", error);
          return res.end("Invalid JSON :p");
        }
      });

      // prevents fall through
      return;
    }

    //   if a random HTTP method is used like OPTIONS or PATCH
    res.statusCode = 405;

    //   use return to prevent requests from "falling through" and keeping the threads or workers open
    return res.end(JSON.stringify({ error: "Method Not Allowed" }));
  }
  // if (requestURL.pathname.startsWith("/api/auth")) ....
  // or
  // if (requestURL.pathname.startsWith("/api/inventory")) ....
  // etc..

  //   if hitting missing route:
  res.statusCode = 404;
  return res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(port, hostname, () => {
  console.log(`server listening at: ${hostname}:${port}`);
});
