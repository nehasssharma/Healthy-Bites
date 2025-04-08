document.addEventListener("DOMContentLoaded", function () {
    let searchBox = document.getElementById("searchBox");
    let foodItems = document.querySelectorAll(".food");
    let customAlert = document.getElementById("customAlert");
    let nutritionDiv = document.querySelector(".nutrition");
    let foodName = document.getElementById("foodName");
    let moreInfoBtn = document.getElementById("moreInfoBtn");
    let BackBtn = document.getElementById("BackBtn");

    // Search functionality
    searchBox.addEventListener("input", function () {
        let searchValue = searchBox.value.toLowerCase().trim();
        foodItems.forEach(food => {
            let name = food.getAttribute("data-name").toLowerCase();
            food.style.display = name.includes(searchValue) && searchValue !== "" ? "flex" : "none";
        });
    });

    // Open alert box on clicking a food div
    foodItems.forEach(food => {
        food.addEventListener("click", function () {
            let name = this.getAttribute("data-name");

            // Extracting data from the hidden nutrition div
            let calories = this.querySelector(".calories").textContent;
            let protein = this.querySelector(".protein").textContent;
            let sugar = this.querySelector(".sugar").textContent;

            // Set the food name
            foodName.textContent = name.charAt(0).toUpperCase() + name.slice(1);

            // Clear existing nutrition data
            nutritionDiv.innerHTML = "";

            // Add new nutrition details
            let nutritionData = {
                "Calories": calories,
                "Protein": protein,
                "Sugar": sugar
            };

            for (let key in nutritionData) {
                let item = document.createElement("div");
                item.textContent = `${key}: ${nutritionData[key]}`;
                nutritionDiv.appendChild(item);
            }

            // Set More Info button link
            moreInfoBtn.href = `/food/${name.toLowerCase()}`;

            // Show alert box
            customAlert.style.display = "flex";
        });
    });

    // Close alert box
    BackBtn.addEventListener("click", function () {
        customAlert.style.display = "none";
    });
});
