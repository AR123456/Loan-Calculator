// listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  // hide resutls
  document.getElementById("results").style.display = "none";

  //show loader when this is clicked.
  document.getElementById("loading").style.display = "block";
  // stope showing spinner after 1 sec
  setTimeout(calculateResults, 1000);
  e.preventDefault();
});

//calculate Resutls
function calculateResults() {
  console.log("Calculating...");
  //UI variables decliration
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");
  // calculations
  // take amount put into form and turn amount into a decimal
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;
  // computed monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  // check with is finite method
  if (isFinite(monthly)) {
    //
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // show results
    document.getElementById("results").style.display = "block";
    //hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    // something went wrong - show an error
    showError("Check your numbers");
  }

  function showError(error) {
    // show results
    document.getElementById("results").style.display = "none";
    //hide loader
    document.getElementById("loading").style.display = "none";
    // create a div
    const errorDiv = document.createElement("div");
    // insert into the dom Get elements
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    // add class
    errorDiv.className = "alert alert-danger";
    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    // insert error above heading
    card.insertBefore(errorDiv, heading);
    //clear error with set time out
    setTimeout(clearError, 1000);
  }
  //clear error
  function clearError() {
    document.querySelector(".alert").remove();
  }
}
