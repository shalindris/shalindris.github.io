document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#button2').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way
        
        // Gather form data
        const fullname = document.querySelector('input[name="fullname"]').value;
        const address = document.querySelector('textarea[name="address"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const number = document.querySelector('input[name="number"]').value;
        const dob = document.querySelector('input[name="dob"]').value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked');
        
        // Check if all required fields are filled
        if (fullname && address && email && number && dob && paymentMethod) {
            // Calculate delivery date (e.g., 5 days from today)
            const today = new Date();
            const deliveryDate = new Date(today.setDate(today.getDate() + 5)).toLocaleDateString();
            
            // Display confirmation message
            alert(`Thank you for your purchase! Your order will be delivered by ${deliveryDate}.`);
        } else {
            // Display error message if fields are missing
            alert('Please fill out all fields.');
        }

        console.log({ fullname, address, email, number, dob, paymentMethod });

    });
});
