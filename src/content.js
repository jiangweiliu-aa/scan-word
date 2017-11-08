import React from 'react'
import {render} from 'react-dom'
import { createStore } from 'redux'
import $ from 'jquery'
import WordWrapper from './content/containers/Words'
import SearchWrapper from './content/containers/search'

const reducer = (state, action) => {
    console.log('redux reducer before:', state, action)
    switch(action.type) {
        case 'toggle_word_list': return {showWordList: !state.showWordList, showSearch: false};
        case 'toggle_search': return {showWordList: false, showSearch: !state.showSearch};
        default: return { showWordList: false, showSearch: false };
    }
}

const store = createStore(reducer);

store.subscribe(() => {
    console.log('redux listener:', store.getState(), 'has been changed')
})

$(window).keypress(function(event) {
    console.log("scan word keypress:", event, event.which, event.key)
    if ((event.key !== 'a' || event.key !== 's') && !event.ctrlKey) return true
    if (event.key === 'a') {
        store.dispatch({
            type: 'toggle_word_list'
        })
    }
    if (event.key === 's') {
        store.dispatch({
            type: 'toggle_search'
        })
    }
    if (event.key === 'a')
    event.preventDefault()
    return false
});

const wordContainer = $('<div></div>')
$('body').append(wordContainer)

const searchContainer = $('<div></div>')
$('body').append(searchContainer)

render(
    <WordWrapper store={store} />,
    wordContainer[0]
)

render(
    <SearchWrapper store={store} />,
    searchContainer[0]
)