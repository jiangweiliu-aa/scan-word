// @flow
import React from 'react'
import styled from 'styled-components'
import {search} from './api'

const WordListWrapper = styled.div.attrs({
    className: 'word-list-wrapper'
})`
    position: fixed;
    background: pink;
    width: 200px;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 10px; 
    z-index: 1000;
    overflow-y: auto;
    opacity: 0.8;
    
    &.invisible {
        right: -220px;
    }   
`

const WordWrapper = props => <div>
    <AppList items={props.items}></AppList>
</div>

class WordItem extends React.Component {
    constructor() {
        super();
        this.state = {definition: null};
        this.translate = this.translate.bind(this)
    }

    translate(word) {
        search(word).then(result => {
            this.setState({
                definition: result.voc.definition,
            })
        })
    }

    render() {
        const {item} = this.props;
        const {definition} = this.state;
        return <li onMouseOver={() => this.translate(item)} title="hover to show translation">
            {item} <div>{ definition }</div>
        </li>
    }
}

const AppList = props => {
    const childrens = props.items.map((t, i) => (
        <WordItem item={t} key={i} />
    ))
    return <WordListWrapper>
        <h1>total: {props.items.length} words</h1>
        <div>toggle shortcut: (<h5>ctrl+i</h5>)</div>
        <ul>
            {childrens}
        </ul>
    </WordListWrapper>
}

export default WordWrapper;