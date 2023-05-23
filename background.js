chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "contentScript.js"});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "download") {
    const file = new Blob([request.text], {type: 'text/markdown'});
    const url = URL.createObjectURL(file);
    chrome.downloads.download({
      url: url,
      filename: 'chat.md',
    });
  }
});
