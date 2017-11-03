import initXhr from './background/xhr'
import autoLoadExtention from './background/autoLoad'
import config from '../config'

initXhr()

console.log('config', config)
if (config.dev) {
    // hot reload extention while source file changes
    autoLoadExtention()
}

chrome.runtime.onInstalled.addListener(details => {
    console.log(details, chrome.notifications.create)
    if (details.reason === 'update') {
        console.log(`scan work background has been updated...`)
    }
})


