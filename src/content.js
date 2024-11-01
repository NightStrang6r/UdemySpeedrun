console.log('[Udemy Speedrun] Loaded.');

document.addEventListener('DOMContentLoaded', main);

async function main() {
    const interval = 200;

    while(true) {
        try {
            const { enabled } = await chrome.storage.sync.get(['enabled']);
            if (!enabled) {
                await sleep(interval);
                continue;
            }

            await processLectures();
            await sleep(interval);
        } catch (error) {
            console.log('[Udemy Speedrun] Error in thread:', error.message);
            await sleep(interval);
        }
    }
}

async function processLectures() {
    while (true) {
        const video = document.querySelector('video');
        if (video) {
            await handleVideo(video);
        }

        const checkbox = document.querySelector('li[aria-current="true"]').querySelector('input');
        if (checkbox.checked == false) {
            break;
        }

        clickNextButton();
        await sleep(200);
    }
}

async function handleVideo(video) {
    if (video.readyState < 2) return;

    const targetTime = video.duration * 0.98;

    if (video.currentTime < targetTime) {
        video.currentTime = targetTime;
    }
}

function clickNextButton() {
    const nextButton = document.querySelector('div[data-purpose="go-to-next"]');
    if (nextButton) {
        nextButton.click();
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}