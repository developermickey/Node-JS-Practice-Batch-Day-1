const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bcrypt = require("bcrypt");

const userModel = require("./models/User");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Route /

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contac Us" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

app.post("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});

app.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // Check if user with the same email already exists
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists.");
    }

    // Generate salt and hash the password
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        console.error(err);
        return res.status(500).send("Error generating salt.");
      }

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          console.error(err);
          return res.status(500).send("Error hashing the password.");
        }

        // Create the user with the hashed password
        let user = await userModel.create({
          name,
          email,
          password: hash, // Store the hashed password
        });

        await user.save(); // Save the user in the database
        res.redirect("/login"); // Redirect after successful registration
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error. Please try again later.");
  }
});

app.listen(port, () => {
  console.log("Server Runing in Port 3000");
});
