export default () => {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        console.log("custom message")
        var event_name = message.event_name;
        if (event_name == 'ajax') {
            const xhr = new XMLHttpRequest();
            xhr.open(message.payload.method, message.payload.url);
            xhr.onload = function() {
                sendResponse(JSON.parse(xhr.responseText))
            }
            xhr.onerror = function() {
                sendResponse(xhr.statusText)
            };
            xhr.send();
        }
        return true;
    });
}

