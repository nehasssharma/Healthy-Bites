const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const path = require("path");
const fs = require("fs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

// Load data 
const foodData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./data/foodData.json"), "utf-8")
);

//home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "/front-end/health.html"));
});

//nav-health
app.get("/health", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "/front-end/health.html"));
});

// Search Page Render Karna
app.get("/Search", (req, res) => {
    res.render("Search", { foods: foodData }); // JSON ka data frontend ko send karna
});

// "More Info" ke liye dynamic food page
app.get("/food/:name", (req, res) => {
    const foodName = req.params.name.toLowerCase();
    const foodItem = foodData.find(food => food.name.toLowerCase() === foodName);

    if (foodItem) {
        res.render("food", { food: foodItem });
    }
});

//calorie count
app.get("/Caloriecount", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "/front-end/Caloriecount.html"));
});

//macronutrient
app.get("/Macronutrient", (req, res) => { 
    res.sendFile(path.join(__dirname, "public", "/front-end/Macronutrient.html"));
});

//health benefits
app.get("/HealthBenefits", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "/front-end/HealthBenefits.html"));
});

//mealplanning
app.get("/mealplanning", (req, res) => {
    res.render("mealplanning");
});

// Load meal data
const vegMeals = JSON.parse(fs.readFileSync("./data/vegMeals.json", "utf-8"));
const nonVegMeals = JSON.parse(fs.readFileSync("./data/nonVegMeals.json", "utf-8"));

app.post("/generate", (req, res) => {
    const calories = parseInt(req.body.calories);
    const mealType = req.body.type; // 'veg' or 'non-veg'

    if (!calories || calories < 500) {
        return res.status(400).send("Enter a valid calorie requirement (min 500).");
    }

    const mealsData = mealType === "veg" ? vegMeals : nonVegMeals;
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Generate a weekly meal plan
    const mealPlan = days.reduce((plan, day) => {
        plan[day] = {
            breakfast: getRandomMeal(mealsData.breakfast, calories),
            snacks: getRandomMeal(mealsData.snacks, calories),
            lunch: getRandomMeal(mealsData.lunch, calories),
            dinner: getRandomMeal(mealsData.dinner, calories),
        };
        return plan;
    }, {});

    res.render("mealplan", { mealPlan, mealType });
});

// Function to get a random meal within calorie limits
function getRandomMeal(mealList, maxCalories) {
    const options = mealList.filter(meal => meal.calories <= maxCalories);
    return options.length ? options[Math.floor(Math.random() * options.length)] : { name: "No meal available", calories: 0 };
}

//weight management
app.get("/WeightManagement", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "/front-end/WeightManagement.html"));
});

//port working
app.listen(port, () => {
    console.log(`Port(${port}) is working...`);
});