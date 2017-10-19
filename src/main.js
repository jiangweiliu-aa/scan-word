import React from 'react'
import {render} from 'react-dom'
import $ from 'jquery'
import WordWrapper from './app'
import scan from './scanWord'
import filterWords from './filterWords'

const items = scan().filter(w => !filterWords.includes(w.toLowerCase()))

$(window).keypress(function(event) {
    console.log("scan word keypress:", event, event.which)
    if (!(event.which == 9 && event.ctrlKey)) return true;
    const wrapper = $('.word-list-wrapper');
    if (wrapper.hasClass('invisible')) {
        wrapper.removeClass('invisible');
    } else {
        wrapper.addClass('invisible');
    }
    event.preventDefault();
    return false;
});

const container = $('<div></div>')
$('body').append(container)

render(
    <WordWrapper items={items}/>,
    container[0]
)