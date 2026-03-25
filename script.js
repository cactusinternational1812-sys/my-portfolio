const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // 🚀 stops reload

    console.log("Form submitted"); // 👈 DEBUG LINE

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

      if (!response.ok) throw new Error("Failed");

      alert("Message sent successfully ✅");
      form.reset();

    } catch (error) {
      console.error(error);
      alert("Error occurred ❌");
    }
  });
}