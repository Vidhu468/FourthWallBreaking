function submitForm(event) {
    event.preventDefault(); 
    console.log("Form submission started."); // Check if the function is being called

    // Collect input values from the form
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Simple form validation: Ensure all required fields are provided
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
        alert("Please fill in all the fields.");
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Password strength validation (at least 6 characters, contains letters and numbers)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters long and contain both letters and numbers.");
        return;
    }

    // Create a data object with the form values
    const formData = {
        firstname,
        lastname,
        email,
        password,
    };

    console.log("Sending data:", formData); 

    // Send form data to the server using Fetch API
    fetch('http://localhost:5001/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)  // Send formData as JSON
    })
    .then(response => {
        console.log("Response received:", response); 
        return response.json();  // Parse the JSON response
    })
    .then(data => {
        // Handle the server's response
        if (data.success) {
            alert("Registration successful!");
            window.location.href = "HomePage.html";  // Redirect to the homepage
        } else {
            alert("Registration failed. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred during registration.");
    });
}

// Attach the submit event listener to the registration form
document.getElementById('registrationForm').addEventListener('submit', submitForm);
