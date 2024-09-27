document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');  // Make sure you have a form element

    form.addEventListener('submit', (e) => {
        e.preventDefault();  // Prevent default form submission behavior

        // Get values from the input fields
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Log values for debugging
        console.log('Email:', email);
        console.log('Password:', password);

        // Check if both fields are filled
        if (!email || !password) {
            alert('Please fill in both fields');
            return;
        }

        // Send POST request to the login API
        fetch('http://localhost:5003/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            console.log('Response Status:', response.status);  // Log the HTTP status
            return response.json();  // Parse the response as JSON
        })
        .then(data => {
            console.log('Response Data:', data);  // Log the response data
        
            // Handle login success or failure
            if (data.success) {
                alert('Login successful! Redirecting...');
                window.location.href = 'Fourth Wall Breaking.html'; 
            } else {
                alert('Error: ' + (data.message || 'Invalid email or password.')); // Show error message from server
            }
        })
        .catch(error => {
            console.error('Error:', error);  // Log any error that occurs
            alert('Error during login. Please try again.');
        });
        
    });
});
