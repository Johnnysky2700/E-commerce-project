const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Set EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(__dirname));

// In-memory temp storage for form data (simple demo)
let lastSubmission = null;

// ---------- ROUTES ----------
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "about.html")));
app.get("/account", (req, res) => res.sendFile(path.join(__dirname, "account.html")));
app.get("/contact", (req, res) => res.sendFile(path.join(__dirname, "contact.html")));
app.get("/products", (req, res) => res.sendFile(path.join(__dirname, "products.html")));
app.get("/cart", (req, res) => res.sendFile(path.join(__dirname, "cart.html")));

// Contact form POST → redirect
app.post("/contact", urlencodedParser, (req, res) => {
  console.log("Form submitted:", req.body);
  lastSubmission = req.body;
  res.redirect("/contact-success");
});

app.post("/send-email", urlencodedParser, (req, res) => {
  console.log("Form submitted:", req.body);
  res.render("contact-success", { data: req.body });
});

// Render success page
app.get("/contact-success", (req, res) => {
  if (!lastSubmission) return res.redirect("/contact");
  res.render("contact-success", { data: lastSubmission });
  lastSubmission = null; // clear after showing
});

// Profile example
app.get("/profile/:name", (req, res) => {
  const data = {
    age: 26,
    job: "website design",
    hobbies: ["eating", "sleeping", "coding"],
  };
  res.render("profile", { person: req.params.name, data });
});

app.listen(3000, () =>
  console.log("✅ Server running at http://localhost:3000")
);
