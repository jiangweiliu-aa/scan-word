import $ from 'jquery'

const scanWord = () => {
    const texts = $('body').children().not('script').not('noscript').not('img').not('iframe').text().split(' ');
    return texts.filter(t => !!t && /^[a-z|A-Z]*(,|\.|\!|\?)?$/.test(t))
        .map(w => w.toLowerCase())
        .map(w => w.replace(/(\.|\!|,|\?)/, ''))
}

export default () => {
    return Array.from(new Set(scanWord()))
};