import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
} from 'react-native';
import { Localize } from '../locale/Loc';
import { gColors } from '../../GlobalStyles';

class Button extends Component {
  render() {
    const p = this.props;
    const name = p.name;
    const title = Localize(p.title);

    return (
      <View style={p.style}>
        <View style={[styles.ButtonFrame(p.borderColor)]}>
          <TouchableOpacity activeOpacity={0.2} onPress={p.onPress} style={styles.Button(p.bgColor)}>
            <Text style={styles.ButtonText(p.color)}>{name || title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ButtonText: color => ({
    fontSize: 18,
    color: color || gColors.buttonText,
    fontWeight: '600',
    alignSelf: 'stretch',
    textAlign: 'center',
  }),

  Button: bgColor => ({
    height: 48,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: bgColor || gColors.buttonBackground,
    justifyContent: 'center',
  }),

  ButtonFrame: borderColor => ({
    borderWidth: 1,
    borderColor: borderColor || gColors.buttonBorder,
    marginTop: 10,
    borderRadius: 50,
    overflow: 'hidden',
  }),
});

export default Button;
