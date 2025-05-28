console.log("✅ script.js loaded");

// Dark or Light mode toggle
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const isDark = localStorage.getItem("theme") === "dark";
  body.classList.add(isDark ? "dark-mode" : "light-mode");

  const togglePairs = [
    { btn: "modetoggleButton", text: "modeText", icon: "modeIcon" },
    {
      btn: "modetoggleButtonClone",
      text: "modeTextClone",
      icon: "modeIconClone",
    },
  ];

  togglePairs.forEach((pair) => {
    const btn = document.getElementById(pair.btn);
    const text = document.getElementById(pair.text);
    const icon = document.getElementById(pair.icon);

    if (!btn || !text || !icon) return;

    // Initial state set
    text.textContent = isDark ? "Light Mode" : "Dark Mode";
    icon.style.backgroundImage = isDark
      ? 'url("images/moon.svg")'
      : 'url("images/moonoff.svg")';

    btn.addEventListener("click", () => toggleTheme(text, icon));
  });

  // Toggle theme function
  function toggleTheme(textElement, iconElement) {
    const isNowDark = body.classList.toggle("dark-mode");
    const newTheme = isNowDark ? "dark" : "light";

    textElement.textContent = isNowDark ? "Light Mode" : "Dark Mode";
    iconElement.style.backgroundImage = isNowDark
      ? 'url("images/moon.svg")'
      : 'url("images/moonoff.svg")';

    localStorage.setItem("theme", newTheme);
  }
});

// Hamburger menu toggle
const menuToggle = document.getElementById("menuToggle");
const navlinks = document.querySelector(" nav ul");
menuToggle.addEventListener("click", () => {
  navlinks.classList.toggle("show");
});

// Close menu on link click (for mobile)
document.querySelectorAll("nav ul li a").forEach((link) => {
  link.addEventListener("click", () => {
    navlinks.classList.remove("show");
  });
});

// Modal JS for direct email
const contactBtn = document.getElementById("contactBtn");
const contactModal = document.getElementById("contactModal");
const closeBtn = document.querySelector(".close");

contactBtn.addEventListener("click", function (e) {
  e.preventDefault();
  contactModal.classList.add("show");
  contactModal.style.display = "block";
});

// Close the modal when "X" button is clicked or clicked outside
closeBtn.addEventListener("click", function () {
  contactModal.style.display = "none";
  contactModal.classList.remove("show");
  setTimeout(() => {
    contactModal.style.display = "none";
  }, 300);
});

window.addEventListener("click", function (e) {
  if (e.target === contactModal) {
    contactModal.classList.remove("show");
    setTimeout(() => {
      contactModal.style.display = "none";
    }, 300);
  }
});

// Direct email - form validation for error and success message
document.addEventListener("DOMContentLoaded", function () {
  function resetContactForm() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const errorMessage = document.getElementById("errorMessage");

    name.value = "";
    email.value = "";
    message.value = "";

    name.classList.remove("error");
    email.classList.remove("error");
    message.classList.remove("error");

    errorMessage.textContent = "";
  }

  // Form submit listener
  document
    .getElementById("contactForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      console.log("Form submitted successfully!");

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      const errorMessage = document.getElementById("errorMessage");
      const popup = document.getElementById("popupMessage");

      // Reset errors
      errorMessage.textContent = "";
      name.classList.remove("error");
      email.classList.remove("error");
      message.classList.remove("error");

      let isValid = true;

      if (name.value.trim() === "") {
        name.classList.add("error");
        isValid = false;
      }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(email.value.trim())) {
        email.classList.add("error");
        isValid = false;
      }

      if (message.value.trim() === "") {
        message.classList.add("error");
        isValid = false;
      }

      if (!isValid) {
        errorMessage.textContent = "Please fill all fields correctly.";
        return;
      }

      // Send data to backend
      try {
        // 👇 Yeh block sirf temporary dumy testing ke liye hai
        const fakeSuccess = true;
        if (fakeSuccess) {
           resetContactForm(); // 👈 Yeh line add karo for reseting call
          document.getElementById("contactModal").style.display = "none";
          const popup = document.getElementById("popupMessage");
          popup.classList.add("popup-visible");
          setTimeout(() => {
            popup.classList.remove("popup-visible");
          }, 5000);
          return; // Yeh real fetch call ko skip karega
        }
        //yeh oper oper wala dummy test hai

        //real fetch call(abi skip hogi)
        const response = await fetch("http://localhost:5000/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.value.trim(),
            email: email.value.trim(),
            message: message.value.trim(),
          }),
        });

        const result = await response.json();
        console.log("Backend response:", result);

        if (result.success) {
          name.value = "";
          email.value = "";
          message.value = "";

          // 👇 Reset the form after successful submission
        resetContactForm(); // <-- Here it is!

          document.getElementById("contactModal").style.display = "none";

          popup.classList.add("popup-visible");

          setTimeout(() => {
            popup.classList.remove("popup-visible");
          }, 5000);
        } else {
          errorMessage.textContent = "Failed to send message.";
        }
      } catch (error) {
        console.error("Error sending form data:", error);
        errorMessage.textContent = "Something went wrong. Please try again.";
      }
    });

  // Close modal and reset form
  document
    .getElementById("closeModalBtn")
    .addEventListener("click", function () {
      document.getElementById("contactModal").style.display = "none";
      resetContactForm();
    });
});

// JS for about section see more button
document.addEventListener("DOMContentLoaded", function () {
  const moreText = document.getElementById("moreText");
  const seemorelesstoggleBtn = document.getElementById("seemorelesstoggleBtn");

  seemorelesstoggleBtn.addEventListener("click", function () {
    if (moreText.style.display === "none" || moreText.style.display === "") {
      moreText.style.display = "block";
      seemorelesstoggleBtn.innerText = "See Less";
    } else {
      moreText.style.display = "none";
      seemorelesstoggleBtn.innerText = "See More";
    }
  });
});

// Active links of navbar
document.addEventListener("DOMContentLoaded", () => {
  const navlinks = document.querySelectorAll("nav a[href^='#']");
  const sections = document.querySelectorAll("section");

  const homelink = document.querySelector('a[href="#hero"]');
  if (homelink) {
    homelink.classList.add("active");
  }

  navlinks.forEach((link) => {
    link.addEventListener("click", () => {
      navlinks.forEach((navlink) => navlink.classList.remove("active"));
      link.classList.add("active");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navlinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    {
      threshold: 0.6,
    }
  );

  sections.forEach((section) => observer.observe(section));
});

// JS for view my work button click action
document.getElementById("viewWorkBtn").addEventListener("click", function () {
  document.body.classList.add("work-mode");
});

// Detailed modal functionality
const modall = document.getElementById("projectModall");
const modallImage = document.getElementById("modallImage");
const modallTitle = document.getElementById("modallTitle");
const modallText = document.getElementById("modallText");
const closeModbtn = document.querySelector(".close-button");

document.querySelectorAll(".project-item").forEach((item) => {
  item.addEventListener("click", function () {
    const imgSrc = this.querySelector("img").src;
    const title = this.querySelector("h3").innerText;
    const description = this.querySelector("p").innerText;

    modallImage.src = imgSrc;
    modallTitle.innerText = title;
    modallText.innerText = description;

    modall.style.display = "flex";
  });
});

closeModbtn.addEventListener("click", () => {
  modall.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modall) {
    modall.style.display = "none";
  }
});
