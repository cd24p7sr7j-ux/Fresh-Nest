/* =========================================
   FRESH NEST JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     MOBILE MENU
  ================================= */

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");

      const spans = menuToggle.querySelectorAll("span");

      if (navMenu.classList.contains("open")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      } else {
        spans[0].style.transform = "";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "";
      }
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");

        const spans = menuToggle.querySelectorAll("span");

        spans[0].style.transform = "";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "";
      });
    });
  }


  /* ================================
     SCROLL REVEAL
  ================================= */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }

      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  /* ================================
     CURRENT YEAR
  ================================= */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* ================================
     BOOKING FORM → WHATSAPP
  ================================= */

  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {

    bookingForm.addEventListener("submit", event => {

      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();

      const service = document.getElementById("service").value;

      const quantity =
        document.getElementById("quantity").value.trim() || "Not specified";

      const size =
        document.getElementById("size").value.trim() || "Not specified";

      const date =
        document.getElementById("date").value;

      const time =
        document.getElementById("time").value;

      const location =
        document.getElementById("location").value.trim();

      const message =
        document.getElementById("message").value.trim() ||
        "No additional information provided.";

      const formattedDate = date
        ? new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        : "Not specified";


      const formattedTime = time
        ? new Date("1970-01-01T" + time).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit"
          })
        : "Not specified";


      const whatsappMessage = `🌿 FRESH NEST BOOKING

👤 CUSTOMER DETAILS
Name: ${name}
Phone: ${phone}

🧼 SERVICE
Service: ${service}
Item / Size: ${size}
Quantity: ${quantity}

📅 APPOINTMENT
Preferred Date: ${formattedDate}
Preferred Time: ${formattedTime}

📍 LOCATION
${location}

📝 ADDITIONAL INFORMATION
${message}

━━━━━━━━━━━━━━━━━━
🌿 Fresh Nest
Fresh Home. Fresh Feel.

Please confirm availability and price.`;


      const whatsappNumber = "233538623281";

      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      window.open(whatsappURL, "_blank");
    });
  }


  /* ================================
     MINIMUM BOOKING DATE
  ================================= */

  const dateInput = document.getElementById("date");

  if (dateInput) {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;
  }

});
