import React from 'react'
import {render} from 'react-dom'
import $ from 'jquery'
import WordWrapper from './app'
import scan from './scanWord'
import batchSave from './api'

const items = scan()

// batchSave(items).then((data) => {
//     console.log(1111111111111122222, data)
// })

$(window).keypress(function(event) {
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

render(
    <WordWrapper items={items}/>,
    $('body').children()[0]
)