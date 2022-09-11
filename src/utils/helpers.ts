import {Dimensions} from 'react-native';

const dimensions = Dimensions.get('window');

export function capitalizeText(value: string) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
}

export {dimensions};
