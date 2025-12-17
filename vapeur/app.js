const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bodyParser = require("body-parser");
const path = require('path');
const hbs = require("hbs");

const app = express();
const port = 8000;

// Configuration Handlebars 
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Helper Handlebars
hbs.registerHelper("formatDate", (date) => {
  return new Date(date).toLocaleDateString();
});

// Route /
app.get("/", async (req, res) => {
  res.render("index");
});

// 🚀 Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
