// @flow
import React from 'react'
import styled from 'styled-components'
import {search, add} from './api'

const WordListWrapper = styled.div.attrs({
    className: 'word-list-wrapper invisible',
})`
    position: fixed;
    background: pink;
    left: 20%;
    right: 20%;
    top: 0;
    bottom: 0;
    padding: 10px; 
    z-index: 1000;
    overflow-y: auto;
    opacity: 0.8;
    
    &.invisible {
        display: none;
    }   
`

const AddBtn = styled.button`
    padding: 10px;
`

const Translation = styled.div`
    color: #c00;
    min-height: 20px;
    min-width: 1px;
`

const WordWrapper = props => <div>
    <AppList items={props.items}></AppList>
</div>

class WordItem extends React.Component {
    constructor() {
        super();
        this.state = {definition: null}
        this.translate = this.translate.bind(this)
        this.addTranslation = this.addTranslation.bind(this)
    }

    translate(word) {
        search(word).then(result => {
            this.setState({
                definition: result.voc.definition,
            })
        })
    }

    addTranslation(word) {
        const self = this;
        add(word).then(result => {
            console.log('added word', result)
            self.setState({
                added: true,
            })
        })
    }

    render() {
        const {item} = this.props;
        const {definition, added} = this.state;
        const addBtn = added ? <span>(added to dictionary)</span> : <AddBtn onClick={() => this.addTranslation(item)}>add</AddBtn>
        return <li title="hover to show translation">
            <span onMouseOver={() => this.translate(item)}><b>{item}</b> {addBtn}</span>
            <Translation>{ definition }</Translation>
        </li>
    }
}

const AppList = props => {
    const childrens = props.items.map((t, i) => (
        <WordItem item={t} key={i} />
    ))
    return <WordListWrapper>
        <h1>total: {props.items.length} words</h1>
        <div>toggle shortcut: (<b>ctrl+i</b>)</div>
        <ul>
            {childrens}
        </ul>
    </WordListWrapper>
}

export default WordWrapper;