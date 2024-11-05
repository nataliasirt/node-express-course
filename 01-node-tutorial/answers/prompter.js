const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let selectedColor = "white";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body style="background-color: ${selectedColor};">
  <p>Choose a background color:</p>
  <form method="POST">
    <select name="color">
      <option value="white">White</option>
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="green">Green</option>
    </select>
    <button type="submit">Submit</button>
  </form>
  </body>
  `;
};


const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    getBody(req, (body) => {
      if (body["color"]) {
        selectedColor = body["color"];
      }
      res.writeHead(303, { Location: "/" });
      res.end();
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
