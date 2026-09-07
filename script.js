// ========================================
// LUMÉ BEAUTY & SALON
// Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // NAVIGATION / BOOK NOW BUTTONS
    // ========================================

    const bookButtons = document.querySelectorAll(".book-btn, .primary-btn");

    bookButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            const bookingSection = document.querySelector("#booking");

            if (bookingSection) {
                bookingSection.scrollIntoView({
                    behavior: "smooth"
                });
            }

        });
    });


    // ========================================
    // SERVICE → PACKAGE
    // ========================================

    const servicePackages = {

        Hair: [
            {
                name: "Haircut & Styling",
                price: 800
            },
            {
                name: "Hair Spa",
                price: 1500
            },
            {
                name: "Hair Colour",
                price: 2500
            },
            {
                name: "Keratin Treatment",
                price: 4000
            }
        ],

        Skin: [
            {
                name: "Basic Facial",
                price: 1000
            },
            {
                name: "Glow Facial",
                price: 1800
            },
            {
                name: "Hydra Facial",
                price: 2500
            },
            {
                name: "Luxury Skin Treatment",
                price: 3500
            }
        ],

        Makeup: [
            {
                name: "Party Makeup",
                price: 2000
            },
            {
                name: "HD Makeup",
                price: 3500
            },
            {
                name: "Premium Makeup",
                price: 5000
            }
        ],

        Nails: [
            {
                name: "Classic Manicure",
                price: 700
            },
            {
                name: "Gel Nails",
                price: 1200
            },
            {
                name: "Nail Art",
                price: 1500
            },
            {
                name: "Premium Nail Extension",
                price: 2500
            }
        ],

        Bridal: [
            {
                name: "Bridal Makeup",
                price: 12000
            },
            {
                name: "HD Bridal Makeup",
                price: 18000
            },
            {
                name: "Luxury Bridal Package",
                price: 25000
            }
        ]

    };


    const serviceSelect = document.getElementById("service");
    const packageSelect = document.getElementById("package");


    // ========================================
    // UPDATE PACKAGE DROPDOWN
    // ========================================

    function updatePackages() {

        if (!serviceSelect || !packageSelect) {
            return;
        }

        const selectedService = serviceSelect.value;

        // Reset package dropdown
        packageSelect.innerHTML =
            '<option value="">Select a package</option>';

        // No service selected
        if (!selectedService) {
            return;
        }

        // Get packages
        const packages = servicePackages[selectedService];

        if (!packages) {
            return;
        }

        // Add packages
        packages.forEach(function (pkg) {

            const option = document.createElement("option");

            option.value = pkg.name;

            option.textContent =
                `${pkg.name} — ₹${pkg.price.toLocaleString("en-IN")}`;

            // Store price for WhatsApp message
            option.dataset.price = pkg.price;

            packageSelect.appendChild(option);

        });

    }


    // Service changed
    if (serviceSelect) {
        serviceSelect.addEventListener("change", updatePackages);
    }


    // ========================================
    // BOOKING FORM
    // ========================================

    const bookingForm = document.querySelector(".booking-form");

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            // Get form fields
            const name =
                document.getElementById("name")?.value.trim();

            const phone =
                document.getElementById("phone")?.value.trim();

            const service =
                document.getElementById("service")?.value;

            const packageName =
                document.getElementById("package")?.value;

            const date =
                document.getElementById("date")?.value;

            const time =
                document.getElementById("time")?.value;

            const message =
                document.getElementById("message")?.value.trim();


            // ========================================
            // VALIDATION
            // ========================================

            if (
                !name ||
                !phone ||
                !service ||
                !packageName ||
                !date ||
                !time
            ) {

                showBookingMessage(
                    "Please fill in all required fields."
                );

                return;
            }


            // ========================================
            // PHONE NUMBER VALIDATION
            // ========================================

            let customerPhone =
                phone.replace(/\D/g, "");

            // Remove +91 / 91 if entered
            if (customerPhone.startsWith("91") &&
                customerPhone.length === 12) {

                customerPhone =
                    customerPhone.substring(2);
            }


            if (!/^[6-9]\d{9}$/.test(customerPhone)) {

                showBookingMessage(
                    "Please enter a valid 10-digit Indian phone number."
                );

                return;
            }


            // ========================================
            // FORMAT DATE
            // ========================================

            let formattedDate = date;

            if (date) {

                const dateObject =
                    new Date(date + "T00:00:00");

                if (!isNaN(dateObject.getTime())) {

                    formattedDate =
                        dateObject.toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        });

                }
            }


            // ========================================
            // GET PACKAGE PRICE
            // ========================================

            const selectedPackage =
                packageSelect.options[
                    packageSelect.selectedIndex
                ];

            const packagePrice =
                selectedPackage?.dataset.price || "";


            // ========================================
            // WHATSAPP MESSAGE
            // ========================================

            const whatsappMessage =
`✨ NEW LUMÉ APPOINTMENT ✨

Hello LUMÉ Beauty Salon!

I would like to book an appointment.

━━━━━━━━━━━━━━━━━━

👤 Name:
${name}

📱 Customer Phone:
+91 ${customerPhone}

💇 Service:
${service}

💎 Package:
${packageName}

💰 Price:
₹${packagePrice ? Number(packagePrice).toLocaleString("en-IN") : "Not available"}

📅 Date:
${formattedDate}

⏰ Time:
${time}

💬 Message:
${message || "No additional message."}

━━━━━━━━━━━━━━━━━━

Please confirm my appointment.

Thank you!
LUMÉ Beauty Salon`;


            // ========================================
            // YOUR SALON WHATSAPP NUMBER
            // ========================================

            const salonWhatsApp =
                "918287149271";


            // ========================================
            // CREATE WHATSAPP LINK
            // ========================================

            const whatsappURL =
                "https://wa.me/" +
                salonWhatsApp +
                "?text=" +
                encodeURIComponent(whatsappMessage);


            // ========================================
            // OPEN WHATSAPP
            // ========================================

           const whatsappWindow = window.open(
    whatsappURL,
    "_blank"
);

// Check if the browser blocked WhatsApp
if (!whatsappWindow) {

    const bookingMessage =
        document.getElementById("booking-message");

    if (bookingMessage) {

        bookingMessage.className =
            "booking-message error";

        bookingMessage.innerHTML =
            `WhatsApp was blocked by your browser.<br>
            <a href="${whatsappURL}" target="_blank" rel="noopener">
                Click here to open WhatsApp
            </a>`;
    }

}

 else {

    const bookingMessage =
        document.getElementById("booking-message");

    if (bookingMessage) {

        bookingMessage.textContent =
            "WhatsApp opened successfully. Please send the appointment message.";

        bookingMessage.className =
            "booking-message success";
    }

}


            // Success message
            showBookingMessage(
                "Your WhatsApp booking message is ready."
            );

        });

    }


    // ========================================
    // BOOKING MESSAGE
    // ========================================

    function showBookingMessage(text) {

        const bookingMessage =
            document.getElementById("booking-message");

        if (bookingMessage) {

            bookingMessage.textContent = text;

        } else {

            alert(text);

        }

    }

});