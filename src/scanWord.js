import $ from 'jquery'
import _ from 'lodash'

const scanWord = () => {
    const texts = $('body').children().not('script').not('noscript').not('img').not('iframe').text().split(' ');
    // console.log('scan word module', _.filter(texts, t => !!t && /^[a-z|A-Z]*$/.test(t)))
    return _.filter(texts, t => !!t && /^[a-z|A-Z]*$/.test(t))
}

export default () => {
    return Array.from(new Set(scanWord()))
};