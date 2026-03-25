const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get values from the form
  const name = form.elements[0].value;
  const email = form.elements[1].value;
  const message = form.elements[2].value;

  const data = { name, email, message };

  // Send data to the backend running on port 5000
  fetch("http://localhost:5000/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(async function (response) {
    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }
    return response.json();
  })
  .then(function (result) {
    alert("Message sent succesfully  ");
    form.reset();
  })
  .catch(function (err) {
    console.error(err);
    alert("Error occurred ");
  });
});

document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // stop page refresh

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    try {
        const response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.text();
        alert(result);
} catch (error) {
        alert("Error occurred while sending message ❌");
        console.error(error);
    }
    
});