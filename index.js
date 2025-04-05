document.addEventListener("DOMContentLoaded", () => {
    // Toggle menu and hamburger animation
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("show");
            menuToggle.classList.toggle("active");

            if (nav.classList.contains("show")) {
                nav.style.opacity = "1";
                nav.style.transform = "translateY(0)";
                nav.style.visibility = "visible";
            } else {
                nav.style.opacity = "0";
                nav.style.transform = "translateY(-20px)";
                setTimeout(() => {
                    if (!nav.classList.contains("show")) {
                        nav.style.visibility = "hidden";
                    }
                }, 400);
            }
        });
    }

    // Typing effect
    const typedText = document.getElementById("typed-text");
    if (typedText) {
        const texts = [
            "Web Designer",
            "WhatsApp Bot Developer",
            "Creator Templates",
            "Content Creator"
        ];
        let index = 0;
        let charIndex = 0;
        let isDeleting = false;
        const speed = 100;
        const delay = 1500;

        function typeEffect() {
            const currentText = texts[index];

            if (!isDeleting) {
                typedText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentText.length) {
                    setTimeout(() => (isDeleting = true), delay);
                }
            } else {
                typedText.textContent = currentText.substring(0, charIndex);
                charIndex--;

                if (charIndex < 0) {
                    isDeleting = false;
                    index = (index + 1) % texts.length;
                    charIndex = 0;
                }
            }

            const typingSpeed = isDeleting ? speed / 2 : speed;
            setTimeout(typeEffect, typingSpeed);
        }

        typeEffect();
    }

    // Update time for WITA, WIT, WIB
    function updateTime() {
        const now = new Date();

        const options = {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        };

        const timeWIB = document.getElementById("time-wib");
        const timeWITA = document.getElementById("time-wita");
        const timeWIT = document.getElementById("time-wit");

        if (timeWIB) timeWIB.textContent = new Intl.DateTimeFormat("id-ID", { ...options, timeZone: "Asia/Jakarta" }).format(now);
        if (timeWITA) timeWITA.textContent = new Intl.DateTimeFormat("id-ID", { ...options, timeZone: "Asia/Makassar" }).format(now);
        if (timeWIT) timeWIT.textContent = new Intl.DateTimeFormat("id-ID", { ...options, timeZone: "Asia/Jayapura" }).format(now);
    }

    setInterval(updateTime, 1000);
    updateTime();

    // Fetch user IP
    const ipElement = document.getElementById("ip");
    if (ipElement) {
        fetch("https://api64.ipify.org?format=json")
            .then(response => response.json())
            .then(data => {
                ipElement.textContent = data.ip;
            })
            .catch(() => {
                ipElement.textContent = "Tidak dapat mendeteksi";
            });
    }

    // Battery status
    const batteryElement = document.getElementById("battery");
    if (batteryElement && navigator.getBattery) {
        navigator.getBattery().then(battery => {
            function updateBattery() {
                batteryElement.textContent = Math.round(battery.level * 100) + "%";
            }
            updateBattery();
            battery.addEventListener("levelchange", updateBattery);
        });
    } else if (batteryElement) {
        batteryElement.textContent = "Tidak didukung";
    }

    // Device type
    const deviceElement = document.getElementById("device");
    if (deviceElement) {
        const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
        deviceElement.textContent = isMobile ? "Mobile" : "Desktop";
    }

    // Browser type
    const browserElement = document.getElementById("browser");
    if (browserElement) {
        const userAgent = navigator.userAgent;
        let browser = "Tidak Diketahui";
        if (userAgent.includes("Chrome") && !userAgent.includes("Edge") && !userAgent.includes("OPR")) {
            browser = "Google Chrome";
        } else if (userAgent.includes("Firefox")) {
            browser = "Mozilla Firefox";
        } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
            browser = "Safari";
        } else if (userAgent.includes("Edge")) {
            browser = "Microsoft Edge";
        } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
            browser = "Opera";
        } else if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) {
            browser = "Internet Explorer";
        }
        browserElement.textContent = browser;
    }

    // Header scroll effect
    const header = document.querySelector("header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // Footer copyright year
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Snow effect
    const snowContainer = document.createElement("div");
    snowContainer.style.position = "fixed";
    snowContainer.style.top = 0;
    snowContainer.style.left = 0;
    snowContainer.style.width = "100%";
    snowContainer.style.height = "100%";
    snowContainer.style.pointerEvents = "none";
    snowContainer.style.overflow = "hidden";
    document.body.appendChild(snowContainer);

    let windDirection = 0;

    document.addEventListener("mousemove", event => {
        windDirection = (event.clientX / window.innerWidth - 0.5) * 2;
    });

    function createSnowflake() {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflake.style.position = "absolute";
        snowflake.style.top = "-10px";
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.width = `${Math.random() * 4 + 2}px`;
        snowflake.style.height = snowflake.style.width;
        snowflake.style.backgroundColor = "white";
        snowflake.style.borderRadius = "50%";
        snowflake.style.opacity = Math.random();
        snowflake.style.pointerEvents = "none";
        snowContainer.appendChild(snowflake);

        let posY = 0;
        let posX = Math.random() * window.innerWidth;
        const fallSpeed = Math.random() * 3 + 1;
        const sideSwing = Math.random() * 3 + 1;

        function fall() {
            posY += fallSpeed;
            posX += windDirection * sideSwing;
            snowflake.style.transform = `translate(${posX}px, ${posY}px)`;

            if (posY < window.innerHeight) {
                requestAnimationFrame(fall);
            } else {
                snowflake.remove();
            }
        }
        fall();
    }

    setInterval(createSnowflake, 100);
});
