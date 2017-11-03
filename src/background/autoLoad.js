import io from 'socket.io-client'
import config from '../../config'

const CHROME_EXTENSION_URL = 'chrome://extensions/'

function reloadTab(tab) {
    console.log('reloading tab', tab)
    chrome.tabs.reload(tab.id)
}

function reloadExtensions() {
    // search for any open extension tab and reload
    chrome.tabs.query({
        url: CHROME_EXTENSION_URL
    }, function (tabs) {
        console.log('found tabs', tabs.length, tabs)

        if (tabs.length) {
            reloadTab(tabs[0])
        } else {
            // no extension tab found. Create and reload
            console.log('creating new tab')
            chrome.tabs.create({
                    url: CHROME_EXTENSION_URL,
                    index: 0,
                    pinned: true,
                    active: false
                }, function (tab) {
                    window.setTimeout(function () {
                        reloadTab(tab)
                    }, 500) //not sure why immediate reload does not seem to work...
                    // note to self, probably one has to wait for load event, so it can be actually *re*loaded
                }
            )
        }

    })
}

export default () => {
    const socket = io('http://localhost:' + config.port, {
        forceNew: false
    })
    socket.on('connect', client => {
        console.log('client side socket io already connected...')
        socket.emit('socket:connected', 'client socket connected')
    })
    socket.on('disconnect', () => {
        console.log('client side socket io already disconnected...')
        socket.emit('socket:disconnected', 'client socket connected')
    })
    socket.on('file.change', function () {
        console.log('received ping')
        reloadExtensions()
    })
}