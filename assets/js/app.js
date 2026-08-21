document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Form submitted:', { email, message });

    fetch('https://7llm46qdiwc6vp74etprvcqqdy0tfxux.lambda-url.eu-west-1.on.aws/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, description: message }),  // Ensure matching field names with Lambda
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Message sent!');
        
        // Clear the form after successful submission
        document.getElementById('contact-form').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to send message.');
    });
});
