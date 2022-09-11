import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

type DismissKeyboardViewProps = {
  children?: any;
  height?: number | string;
  scrollable?: boolean;
  style?: any;
};

function DimissKeyboardView(props: DismissKeyboardViewProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
      style={{flex: 1, ...props.style}}
      {...props}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {props.scrollable ? (
          <ScrollView
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            onEnded={Keyboard.dismiss}>
            <View>{props.children}</View>
          </ScrollView>
        ) : (
          <View
            style={{flex: 1}}
            // height={props.height}
          >
            {props.children}
          </View>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default DimissKeyboardView;
