/* =========================================
   FRESH NEST JAVASCRIPT
   Fresh Home. Fresh Feel.
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     MOBILE MENU
  ========================================= */

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navMenu.classList.toggle("open");

      const spans = menuToggle.querySelectorAll("span");

      if (isOpen) {

        spans[0].style.transform =
          "rotate(45deg) translate(5px, 5px)";

        spans[1].style.opacity = "0";

        spans[2].style.transform =
          "rotate(-45deg) translate(5px, -5px)";

        menuToggle.setAttribute("aria-label", "Close menu");

      } else {

        closeMenu();

      }
    });


    /* Close menu when a link is clicked */

    navMenu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", closeMenu);

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }

    });


    function closeMenu() {

      navMenu.classList.remove("open");

      const spans = menuToggle.querySelectorAll("span");

      spans[0].style.transform = "";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "";

      menuToggle.setAttribute("aria-label", "Open menu");

    }

  }


  /* =========================================
     SCROLL REVEAL
  ========================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("visible");

              revealObserver.unobserve(
                entry.target
              );

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

  } else {

    /* Fallback for older browsers */

    revealElements.forEach(element => {

      element.classList.add("visible");

    });

  }


  /* =========================================
     CURRENT YEAR
  ========================================= */

  const yearElement =
    document.getElementById("year");


  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }


  /* =========================================
     BOOKING FORM → WHATSAPP
  ========================================= */

  const bookingForm =
    document.getElementById("bookingForm");


  if (bookingForm) {

    bookingForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        /* -------------------------------
           GET FORM VALUES
        -------------------------------- */

        const name =
          document.getElementById("name")
            ?.value.trim();

        const phone =
          document.getElementById("phone")
            ?.value.trim();

        const service =
          document.getElementById("service")
            ?.value;

        const quantity =
          document.getElementById("quantity")
            ?.value.trim() ||
          "Not specified";

        const size =
          document.getElementById("size")
            ?.value.trim() ||
          "Not specified";

        const date =
          document.getElementById("date")
            ?.value;

        const time =
          document.getElementById("time")
            ?.value;

        const location =
          document.getElementById("location")
            ?.value.trim();

        const message =
          document.getElementById("message")
            ?.value.trim() ||
          "No additional information provided.";


        /* -------------------------------
           BASIC VALIDATION
        -------------------------------- */

        if (!name || !phone || !service ||
            !date || !time || !location) {

          alert(
            "Please complete all required fields before sending your booking."
          );

          return;

        }


        /* -------------------------------
           FORMAT DATE
        -------------------------------- */

        const formattedDate =
          new Date(
            date + "T00:00:00"
          ).toLocaleDateString(
            "en-GB",
            {
              day: "numeric",
              month: "long",
              year: "numeric"
            }
          );


        /* -------------------------------
           FORMAT TIME
        -------------------------------- */

        const formattedTime =
          new Date(
            "1970-01-01T" + time
          ).toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              minute: "2-digit"
            }
          );


        /* -------------------------------
           CREATE WHATSAPP MESSAGE
        -------------------------------- */

        const whatsappMessage =

`🌿 *FRESH NEST BOOKING*

👤 *CUSTOMER DETAILS*
Name: ${name}
Phone: ${phone}

🧼 *SERVICE*
Service: ${service}
Item / Size: ${size}
Quantity: ${quantity}

📅 *APPOINTMENT*
Preferred Date: ${formattedDate}
Preferred Time: ${formattedTime}

📍 *LOCATION*
${location}

📝 *ADDITIONAL INFORMATION*
${message}

━━━━━━━━━━━━━━━━━━

🌿 *FRESH NEST*
Fresh Home. Fresh Feel.

Please confirm availability and final price.`;


        /* -------------------------------
           FRESH NEST WHATSAPP NUMBER
        -------------------------------- */

        const whatsappNumber =
          "233538623281";


        /* -------------------------------
           CREATE WHATSAPP URL
        -------------------------------- */

        const whatsappURL =
          `https://wa.me/${whatsappNumber}?text=${
            encodeURIComponent(whatsappMessage)
          }`;


        /* -------------------------------
           OPEN WHATSAPP
        -------------------------------- */

        window.open(
          whatsappURL,
          "_blank",
          "noopener,noreferrer"
        );

      }
    );

  }


  /* =========================================
     MINIMUM BOOKING DATE
  ========================================= */

  const dateInput =
    document.getElementById("date");


  if (dateInput) {

    const today = new Date();

    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        today.getDate()
      ).padStart(2, "0");


    dateInput.min =
      `${year}-${month}-${day}`;

  }


  /* =========================================
     SMOOTH NAVIGATION
  ========================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(targetId);


        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


  /* =========================================
     PHONE NUMBER CLEANUP
  ========================================= */

  const phoneInput =
    document.getElementById("phone");


  if (phoneInput) {

    phoneInput.addEventListener(
      "input",
      () => {

        phoneInput.value =
          phoneInput.value.replace(
            /[^0-9+\s()-]/g,
            ""
          );

      }
    );

  }


  /* =========================================
     IMAGE ERROR HANDLING
  ========================================= */

  document.querySelectorAll("img")
    .forEach(image => {

      image.addEventListener(
        "error",
        () => {

          image.style.opacity = "0.85";

        }
      );

    });

});
