const producRoutes = require("./product.router");
const homeRoutes = require("./home.route");

module.exports = (app) => {
  app.use("/", homeRoutes);
      
  app.use("/", producRoutes);
}