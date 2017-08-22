import { mergeObjects } from './helpers';

const themeList = {};

themeList.extend = (themename, newsetting) =>
  mergeObjects(themeList[themename], newsetting);

themeList.main = {
  colors: {
    main: '#22BAD9',
    success: '#5cb85c',
    warn: '#ffc067',
    error: '#d9534f',
    background: '#ffffff',
    text: '#000000',
    textAlt: '#ffffff'
  }
};

export default themeList;
