chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(changeInfo)
    if (changeInfo.status == 'complete') {
        console.log("complete")
        chrome.scripting.executeScript({
            target: {tabId: tabId, allFrames: true},
            files: ["scripts/content.js"]
        });
    }
})