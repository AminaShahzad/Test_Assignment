document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#work-shift-form");
  const messageContainer = document.querySelector("#message-container");
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  // Function to validate form fields
  function validateForm(event) {
    event.preventDefault(); // Prevent form submission for validation

    let isValid = true;
    const errorMessages = [];

    // Get form data
    const role = document.querySelector("#work-role").value.trim();
    const location = document.querySelector("#location").value.trim();
    const startDate = document.querySelector("#start-date").value.trim();
    const endDate = document.querySelector("#end-date").value.trim();
    const shiftStartTime = document.querySelector("#start-time").value.trim();
    const shiftEndTime = document.querySelector("#end-time").value.trim();
    const repeat = document.querySelector("#repeat").value.trim();
    const selectedDays = Array.from(document.querySelectorAll("[name='days']:checked")).map(input => input.value);
    const assignWorkers = Array.from(document.querySelector("#assign-workers").selectedOptions).map(option => option.value);

    // Validate role and other fields
    if (!role || !location || (repeat && selectedDays.length === 0) || assignWorkers.length === 0) {
      errorMessages.push("Kindly select an option.");
      isValid = false;
    }

    // Validate start and end dates
    if (!startDate || !endDate) {
      errorMessages.push("Please provide both start and end dates.");
      isValid = false;
    } else if (new Date(startDate) < new Date(currentDate)) {
      errorMessages.push("Invalid Start date.");
      isValid = false;
    } else if (new Date(endDate) < new Date(currentDate)) {
      errorMessages.push("Invalid End date.");
      isValid = false;
    } else if (new Date(startDate) > new Date(endDate)) {
      errorMessages.push("Start date cannot be after the end date.");
      isValid = false;
    }

    // Validate start and end times
    if (!shiftStartTime || !shiftEndTime) {
      errorMessages.push("Please provide shift start and end times.");
      isValid = false;
    }

    // Show error messages or save data
    if (!isValid) {
      alert(errorMessages.join("\n"));
    } else {
      // Save data to sessionStorage
      sessionStorage.setItem('workRole', role);
      sessionStorage.setItem('location', location);
      sessionStorage.setItem('startDate', startDate);
      sessionStorage.setItem('endDate', endDate);
      sessionStorage.setItem('startTime', shiftStartTime);
      sessionStorage.setItem('endTime', shiftEndTime);
      sessionStorage.setItem('workers', JSON.stringify(assignWorkers));

      // Redirect to shift-created.html page
      window.location.href = "shift_page.html";
    }
  }

  // Add event listener for form submission
  form.addEventListener("submit", validateForm);
});
