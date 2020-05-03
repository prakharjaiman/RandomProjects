// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e) {
    // Hide Default
    document.getElementById('results').style.display = 'none';

    // Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 1000); //time is shown in milliseconds


    e.preventDefault()
});

// Calculate Results
function calculateResults() {
    // console.log('calculating...');
    // UI Variables
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principle * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed();
        totalInterest.value = ((monthly * calculatedPayment) - principle).toFixed();


        // Hide loader
        document.getElementById('loading').style.display = 'none';
        // Show Results
        document.querySelector('#results').style.display = 'block';



    } else {
        showError('Please check your number');
        // Hide loader
        document.getElementById('loading').style.display = 'none';
    }



}

// Show Error
function showError(error) {
    const errorDiv = document.createElement('div');

    // Get Element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert Error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 secs
    setTimeout(clearError, 3000); //takes values in milliseconds
}

function clearError() {
    document.querySelector('.alert').remove();
}