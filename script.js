document.addEventListener("DOMContentLoaded", function () {

    // ========== Menu Toggle ==========
    const MenuItems = document.getElementById("Menuitems");
    if (MenuItems) {
        MenuItems.style.maxHeight = "0px";
        window.menutoggle = function () {
            MenuItems.style.maxHeight = MenuItems.style.maxHeight === "0px" ? "200px" : "0px";
        };
    }

    // ========== Product Gallery ==========
    const ProductImg = document.getElementById("ProductImg");
    const SmallImg = document.getElementsByClassName("small-img");
    if (ProductImg && SmallImg.length > 0) {
        for (let i = 0; i < SmallImg.length; i++) {
            SmallImg[i].onclick = () => (ProductImg.src = SmallImg[i].src);
        }
    }

    // ========== Toggle Form ==========
    const LoginForm = document.getElementById("LoginForm");
    const RegForm = document.getElementById("RegForm");
    const Indicator = document.getElementById("Indicator");

    if (LoginForm && RegForm && Indicator) {
        window.register = function () {
            RegForm.style.transform = "translateX(0px)";
            LoginForm.style.transform = "translateX(0px)";
            Indicator.style.transform = "translateX(100px)";
        };

        window.login = function () {
            RegForm.style.transform = "translateX(300px)";
            LoginForm.style.transform = "translateX(300px)";
            Indicator.style.transform = "translateX(0px)";
        };
    }

    // ========== Send Email ==========
   async function sendEmail(event) {
  event.preventDefault(); // stop page reload

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  const response = await fetch("/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ name, email, phone, message }),
  });

  const result = await response.json();

  if (result.success) {
    alert("✅ Message sent successfully!");
  } else {
    alert("❌ Failed to send message.");
  }
}

});
