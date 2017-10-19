import $ from 'jquery'
const loginUrl = 'http://www.shanbay.com/accounts/login'

const batchSave = words => {
    return new Promise((resolve, reject) => {
        const encodedWords = encodeURIComponent(words.join('\n'));
        const batchUrl = 'https://www.shanbay.com/bdc/vocabulary/add/batch/';
        $.get(batchUrl, {words: encodedWords}, data => resolve(data), error => reject(error))
    })
}

const search = word => {
    const searchUrl = `https://www.shanbay.com/api/word/${word}`
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({
            event_name: 'ajax',
            payload: {
                url: searchUrl,
                method: 'GET',
                dataType: 'json'
            }
        }, data => {
            resolve(data)
        })
    })
}

const add = word => {
    const addUrl = `http://www.shanbay.com/api/learning/add/${word}`
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({
            event_name: 'ajax',
            payload: {
                url: addUrl,
                method: 'GET',
                dataType: 'json'
            }
        }, data => {
            resolve(data)
        })
    })
}

export default batchSave
export { search, add }