document.getElementById('calculate-btn').addEventListener('click', (e) => { e.preventDefault();
    const age = parseInt(document.getElementById('age').value);
    const sex = document.getElementById('sex').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activityLevel = document.getElementById('activity-level').value;

    let basalMetabolicRate;
    if (sex === 'male') {
        basalMetabolicRate = 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age);
    } else {
        basalMetabolicRate = 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
    }

    let dailyCalorieNeeds;
    switch (activityLevel) {
        case 'sedentary':
            dailyCalorieNeeds = basalMetabolicRate * 1.2;
            break;
        case 'lightly-active':
            dailyCalorieNeeds = basalMetabolicRate * 1.375;
            break;
        case 'moderately-active':
            dailyCalorieNeeds = basalMetabolicRate * 1.55;
            break;
        case 'very-active':
            dailyCalorieNeeds = basalMetabolicRate * 1.725;
            break;
        case 'extra-active':
            dailyCalorieNeeds = basalMetabolicRate * 1.9;
            break;
    }

    document.getElementById('result').textContent = `Your daily calorie needs are approximately ${Math.round(dailyCalorieNeeds)} calories.`;
});