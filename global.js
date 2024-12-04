const reducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
const modes = ["light_mode", "dark_mode", "night_sight_max"];
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;


function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

function switch_mode(element, dont_switch=false) {
    if (!dont_switch) {
        element.innerHTML = modes[(modes.indexOf(element.innerHTML) + 1) % modes.length];
    }
    if (element.innerHTML === "night_sight_max") {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("oled-mode");
    } else if (element.innerHTML === "dark_mode") {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("oled-mode");
        document.body.classList.add("light-mode");
    }
    setCookie('theme', element.innerHTML, 365); // Saves for 1 year
}

document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById("theme-switcher-icon");
    const savedTheme = getCookie('theme');
    
    if (savedTheme && modes.includes(savedTheme)) {
        themeSwitcher.innerHTML = savedTheme;
        switch_mode(themeSwitcher, true);
    } else if (!prefersDark) {
        themeSwitcher.innerHTML = "light_mode";
        switch_mode(themeSwitcher, true);
    }
});