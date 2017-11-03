export default info => {
    chrome.notifications.create('reminder', {
        type: 'basic',
        title: 'scan word',
        message: info,
        iconUrl: './decode-favicon.png',
    }, (notificationId) => {
        console.log('notification id:', notificationId)
    });
}