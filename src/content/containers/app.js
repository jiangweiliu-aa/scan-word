// @flow
import React from 'react'
import styled from 'styled-components'
import {search, add} from '../ajax/api'
import scan from '../utils/scanWord'
import filterWords from '../utils/filterWords'

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
    color: #3F88D4;
    font-size: 12px;
    border-color: #3F88D4;
    border-radius: 4px;
    line-height: 17px;
    padding: 0 10px;
    background: none;
    border-width: 1px;
`

const MinusBtn = styled.button`
    color: #B94B49;
    font-size: 12px;
    border-color: #B94B49;
    border-radius: 4px;
    line-height: 17px;
    padding: 0 10px;
    background: none;
    border-width: 1px;
`

const Translation = styled.div`
    color: #c00;
    min-height: 20px;
    min-width: 1px;
`

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
        add(word).then(() => {
            self.setState({
                added: true,
            })
        })
    }

    render() {
        const {item} = this.props;
        const {definition, added} = this.state;
        const addBtn = added ? '' : <AddBtn onClick={() => this.addTranslation(item)}>+</AddBtn>
        return <li>
            <span>
                {addBtn}
                <MinusBtn onClick={() => this.props.removeItem()}>-</MinusBtn>
                <b onMouseOver={() => this.translate(item)}>{item}</b>
            </span>
            <Translation>{ definition }</Translation>
        </li>
    }
}

class AppList extends React.Component {
    constructor() {
        super()
        this.state = {
            items: scan().filter(w => !filterWords.includes(w.toLowerCase())),
            searchText: '',
        }
        this.removeItem = this.removeItem.bind(this)
        this.addItem = this.addItem.bind(this)
        this.onSeachChange = this.onSeachChange.bind(this)
    }

    removeItem(index) {
        this.setState({
            items: this.state.items.filter((item, i) => i !== index)
        })
    }

    addItem() {
        const items = this.state.items;
        items.unshift(this.state.searchText)
        this.setState({
            items: items
        })
    }

    onSeachChange(text) {
        this.setState({searchText: text})
    }

    render() {
        const {items} = this.state
        const childrens = items.map((t, i) => (
            <WordItem item={t} key={i} removeItem={() => {this.removeItem(i)}}/>
        ))
        return <WordListWrapper>
            <h1>total: {items.length} words</h1>
            <div>toggle shortcut: (<b>ctrl+k</b>); hover each word to show translation</div>
            <div>Search:
                <input type="text"
                    onChange={e => this.onSeachChange(e.currentTarget.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            this.addItem()
                        }
                    }}/>
            </div>
            <ul>
                {childrens}
            </ul>
        </WordListWrapper>
    }
}

export default AppList