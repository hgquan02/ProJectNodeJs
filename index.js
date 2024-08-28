const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

require("dotenv").config();

const route = require("./routers/client/index.router");
const routeAdmin = require("./routers/admin/index.router");

const database = require("./config/database");
const systemConfig = require("./config/system");

database.connect();


const app = express();
const port = process.env.PORT || 3000 ;

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");


app.use(cookieParser('ASDJHASJKD'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());


app.locals.preFixAdmin = systemConfig.prefixAdmin;



app.use(express.static(`${__dirname}/public`));

//router
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});