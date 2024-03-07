var gpuTier;
DetectGPU.getGPUTier().then((x) => {
    gpuTier = JSON.stringify(x);
})
async function IP() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error:', error);
        return 'N/A';
    }
}

async function getAllBrowserInfo() {
    const info = {
        ip:await IP(),
        userAgent: navigator.userAgent,
        browserName: '',
        browserVersion: '',
        platform: navigator.platform,
        language: navigator.language,
        cookiesEnabled: navigator.cookieEnabled,
        screenWidth: screen.width,
        screenHeight: screen.height,
        plugins: [],
        onlineStatus: navigator.onLine,
        doNotTrack: navigator.doNotTrack,
        localStorageEnabled: false,
        sessionStorageEnabled: false,
        domainName: document.domain,
        isPhone: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        gpu: gpuTier,
        darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    };
    const userAgent = info.userAgent.toLowerCase();
    if (userAgent.includes("firefox")) {
        info.browserName = "Firefox";
        info.browserVersion = userAgent.match(/firefox\/([\d.]+)/)[1];
    } else if (userAgent.includes("edge")) {
        info.browserName = "Edge";
        info.browserVersion = userAgent.match(/edge\/([\d.]+)/)[1];
    } else if (userAgent.includes("chrome")) {
        info.browserName = "Chrome";
        info.browserVersion = userAgent.match(/chrome\/([\d.]+)/)[1];
    } else if (userAgent.includes("safari")) {
        info.browserName = "Safari";
        info.browserVersion = userAgent.match(/version\/([\d.]+)/)[1];
    } else if (userAgent.includes("opera")) {
        info.browserName = "Opera";
        info.browserVersion = userAgent.match(/opr\/([\d.]+)/)[1];
    } else if (userAgent.includes("trident")) {
        info.browserName = "Internet Explorer";
        info.browserVersion = userAgent.match(/rv:([\d.]+)/)[1];
    }
    try {
        localStorage.setItem("__test__", "__test__");
        localStorage.removeItem("__test__");
        info.localStorageEnabled = true;
    } catch (e) {
        info.localStorageEnabled = false;
    }
    try {
        sessionStorage.setItem("__test__", "__test__");
        sessionStorage.removeItem("__test__");
        info.sessionStorageEnabled = true;
    } catch (e) {
        info.sessionStorageEnabled = false;
    }
    for (let i = 0; i < navigator.plugins.length; i++) {
        info.plugins.push({
            name: navigator.plugins[i].name,
            filename: navigator.plugins[i].filename,
            description: navigator.plugins[i].description
        });
    }
    return JSON.stringify(info);
}

document.addEventListener('DOMContentLoaded', async function() {
    const jsonData = await getAllBrowserInfo();
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    });
});
