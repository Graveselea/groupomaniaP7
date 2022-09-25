const http = require("http"); //--Import du package http de node
const app = require("./app");
const path = require("path");
const fs = require("fs");

//--Création du dossier images s'il n'existe pas
if (!fs.existsSync(__dirname + "/images")) {
  fs.mkdirSync(path.join(__dirname, "images"));
}

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//--Création du serveur
const port = normalizePort(process.env.PORT || "8000");
app.set("port", port);

//--Recherche des erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app); //--Création du serveur

server.on("error", errorHandler);

//--Ecouteur d'évènements consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port); //--Le serveur écoute le port 8000
