console.log('[Udemy Speedrun] Loaded.');

document.addEventListener('DOMContentLoaded', main);

async function main() {
    setInterval(async () => {
        const { enabled } = await chrome.storage.sync.get(['enabled']);
        if (!enabled) return;

        await processVideos();
    }, 200);
}

async function processVideos() {
    document.querySelectorAll('video').forEach(video => handleVideo(video));
}

function handleVideo(video) {
    if (video.readyState < 2) return;

    const targetTime = video.duration * 0.98;

    if (video.currentTime < targetTime) {
        video.currentTime = targetTime;
        setTimeout(clickNextButton, 50);
    }
}

function clickNextButton() {
    const nextButton = document.querySelector('div[data-purpose="go-to-next"]');
    if (nextButton) {
        nextButton.click();
    }
}
