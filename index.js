const server = require("./api/server");

const port = process.env.PORT || 5000;

server.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
