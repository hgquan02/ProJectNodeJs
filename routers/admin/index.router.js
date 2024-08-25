const systemConfig = require("../../config/system");
const dashboardRoutes = require("./dashboard.router");
const productRoutes = require("./products.router");



module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
  app.use(PATH_ADMIN + "/products", productRoutes);
      
}