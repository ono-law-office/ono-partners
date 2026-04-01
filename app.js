// ナビスクロール検知
const nav = document.getElementById("nav");
const langToggle = document.getElementById("lang-toggle");
const heroSection = document.querySelector(".hero");

function updateNavState() {
    const scrolled = window.scrollY > 40;
    nav.classList.toggle("scrolled", scrolled);

    // ヒーロー内にいるかどうかで言語トグルの色を切り替え
    if (heroSection && langToggle) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        langToggle.classList.toggle("on-hero", window.scrollY < heroBottom - 80);
    }
}

window.addEventListener("scroll", updateNavState, { passive: true });
updateNavState();

// モバイルメニュー
const toggle = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");

if (toggle && links) {
    toggle.addEventListener("click", () => {
        toggle.classList.toggle("open");
        links.classList.toggle("open");
    });

    links.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
            toggle.classList.remove("open");
            links.classList.remove("open");
        });
    });
}

// スクロールアニメーション
const observerOptions = {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".section").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(24px)";
    section.style.transition = "opacity 0.7s ease, transform 0.7s ease";
    observer.observe(section);
});

// ========== 言語切替 ==========
(function () {
    const langBtn = document.getElementById("lang-toggle");
    if (!langBtn) return;

    let currentLang = localStorage.getItem("ono-lang") || "ja";

    function applyLang(lang) {
        currentLang = lang;
        localStorage.setItem("ono-lang", lang);
        const attr = "data-" + lang;
        document.querySelectorAll("[data-ja][data-en]").forEach(el => {
            const text = el.getAttribute(attr);
            if (text) el.textContent = text;
        });
        langBtn.textContent = lang === "ja" ? "EN" : "JP";
        document.documentElement.lang = lang === "ja" ? "ja" : "en";
    }

    langBtn.addEventListener("click", () => {
        applyLang(currentLang === "ja" ? "en" : "ja");
    });

    if (currentLang !== "ja") {
        applyLang(currentLang);
    }
})();
