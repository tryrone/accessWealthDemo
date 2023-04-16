import {Dimensions} from 'react-native';

const pWidth = Dimensions.get('window').width;
const pHeight = Dimensions.get('window').height;

export const phoneHeight = pHeight > 896 ? 896 : pHeight;
export const phoneWidth = pWidth > 414 ? 414 : pWidth;
