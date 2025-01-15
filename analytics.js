const url = "https://data.lefa22.com/items/homepage_analytics";

const data = {
    path: "",
    referer: "",
    browser: "",
    os: "",
    "mobile": false,
    resolution: "",
    language: ""
};

let platform = "";
let browser = "";
let mobile = false;



function locationType(){
    if (window.location.protocol === "file:") {
      return 0;
    } else if (
      !window.location.host.replace(/(localhost|127\.0\.0\.1)(:\d+)?/i, "")
    ) {
      return 1;
    } else {
      return 2;
    }
}

function checkOS(n) {
    if (n.userAgentData) {
        const hints = ["architecture", "model", "platform", "platformVersion", "uaFullVersion"];
        n.userAgentData.getHighEntropyValues(hints)
            .then(ua => {
                platform = `${ua.platform} ${ua.architecture}`;
                browser = `${ua.brands[0].brand} ${ua.brands[0].version}`;
                mobile = ua.mobile;

                fillData();
                //console.log(data);
                if (locationType() == 2) {
                    sendData();
                }
            });
    } else {
        console.log(n.userAgent);
        return "navigator.userAgentData is not supported!";
    }
}

async function sendData() {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": ""
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        console.log("Data sent successfully:", response.status);
    } catch (error) {
        console.error("Error sending data:", error);
    }
}

function fillData() {
    data.path = window.location.pathname;
    data.referer = document.referrer;
    data.browser = browser;
    data.os = platform;
    data.mobile = mobile;
    data.resolution = `${window.screen.width}x${window.screen.height}`;
    data.language = navigator.language;
}



checkOS(navigator);

