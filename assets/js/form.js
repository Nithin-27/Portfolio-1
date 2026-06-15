
    document.getElementById("contact-form").addEventListener("submit", async function(e) {
        e.preventDefault();  // Stop normal form submit (no redirect)

    const form = e.target;
    const formData = new FormData(form);
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    // UI Elements
    const loading = form.querySelector(".loading");
    const errorMsg = form.querySelector(".error-message");
    const successMsg = form.querySelector(".sent-message");

    loading.style.display = "block";
    errorMsg.style.display = "none";
    successMsg.style.display = "none";

    const response = await fetch("https://api.web3forms.com/submit", {
        method:"POST",
    body: formData
    });

    const result = await response.json();
    loading.style.display = "none";

    if (result.success) {
        successMsg.style.display = "block";
    form.reset();
    } else {
        errorMsg.innerText = result.message;
    errorMsg.style.display = "block";
    }
});

