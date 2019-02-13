// handle http requests
const http = require('http');
// help parse the url
const url = require("url");

console.log("waiting for a GET on /hello");

const server = http.createServer(function (request, response) {
    const method = request.method;
    if (typeof (method) !== "string" || method.toLowerCase() !== "get") {
        response.writeHead(405);
        response.end();
        return;
    }
    const path = (function trim(text, charToTrim) {
        return text.replace(new RegExp("^[" + charToTrim + "]+|[" + charToTrim + "]+$", "g"), "");
    })(url.parse(request.url, true).pathname, '/');
    if (path.toLowerCase() !== "hello") {
        response.writeHead(404);
        response.end();
        return;
    }
    response.setHeader("Content-Type", "application/json");
    response.writeHead(200);
    response.end(JSON.stringify({"response": "hello there"}));
});
server.listen(3000);