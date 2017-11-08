// @flow
import React from 'react'
import { Modal } from 'antd';
import 'antd/lib/date-picker/style/css';
import {search} from '../ajax/api'
import { Input } from 'antd';
import { connect } from 'react-redux'

class SearchWrapper extends React.Component {
    constructor() {
        super()
        this.state = {
            definition: '',
            searchText: '',
        }
        this.addItem = this.addItem.bind(this)
        this.onSeachChange = this.onSeachChange.bind(this)
    }

    addItem() {
        search(this.state.searchText).then(result => {
            this.setState({
                definition: result.voc.definition,
            })
        })
    }

    onSeachChange(text) {
        this.setState({searchText: text})
    }

    render() {
        const {searchText, definition} = this.state;
        let word, translation;
        if (searchText) {
            word = <b>keyword: {searchText}</b>
        }
        if (definition) {
            translation = <span>result: {definition}</span>
        }
        return (
            <Modal
                title={`search word`}
                visible={this.props.visible}
                onCancel={() => {this.props.store.dispatch({
                    type: 'toggle_search'
                })}}
                footer={null}
                width={'60vw'}
            >
                <Input placeholder="search word, press enter to show result"
                       onChange={e => this.onSeachChange(e.currentTarget.value)}
                       onKeyPress={(e) => {
                           if (e.key === 'Enter') {
                               this.addItem()
                           }
                       }}/>
                <br/>
                {word}
                <br/>
                {translation}
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    visible: state.showSearch
})

const mapDispatchToProps = () => ({
    test: 1
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchWrapper)