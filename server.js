const path = require("path");
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
//set up Handlebars.js
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//turn on routes
app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));
//set up Handlebars.js
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


//turn on connection to db server
//`force: true` will make tables re-create if there are any association changes
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});