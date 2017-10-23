import React from 'react'
import {render} from 'react-dom'
import $ from 'jquery'
import AppList from './app'

$(window).keypress(function(event) {
    console.log("scan word keypress:", event, event.which)
    if (!(event.which == 11 && event.ctrlKey)) return true;
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
    <AppList />,
    container[0]
)