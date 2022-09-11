import React from 'react';
import {View} from 'react-native';

function Spacer({
  vertical,
  horizontal,
}: {
  vertical?: number;
  horizontal?: number;
}) {
  return (
    <View style={{marginVertical: vertical, marginHorizontal: horizontal}} />
  );
}

export default Spacer;
