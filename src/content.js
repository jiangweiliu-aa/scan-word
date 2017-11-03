import React from 'react'
import {render} from 'react-dom'
import $ from 'jquery'
import WordWrapper from './content/containers/Words'

let showWordList = true;
$(window).keypress(function(event) {
    console.log("scan word keypress:", event, event.which)
    if (!(event.which == 11 && event.ctrlKey)) return true;
    showWordList = !showWordList
    event.preventDefault();
    return false;
});

const container = $('<div></div>')
$('body').append(container)

render(
    <WordWrapper/>,
    container[0]
)