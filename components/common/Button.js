import React, { Component } from 'react';
import { AppRegistry, Platform, View, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, TouchableNativeFeedback, Text, StyleSheet } from 'react-native';
import { Localize } from '../locale/Loc';
import { gColors } from '../../GlobalStyles';

class Button extends Component {
    

    render() {
        const p = this.props;
        const title = Localize(p.title);

        return (
            <View style={p.style}>
                <View style={[styles.ButtonFrame]}>
                    <TouchableOpacity activeOpacity={0.2} onPress={p.onPress} style={styles.Button}>
                        <Text style={styles.ButtonText}>{title}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        ButtonText: {
            fontSize: 18,
            color: gColors.buttonText,
            fontWeight: '600',
            alignSelf: 'stretch',
            textAlign: 'center'
        },

        Button: {
            height: 48,
            paddingLeft: 30,
            paddingRight: 30,
            backgroundColor: gColors.buttonBackground,
            justifyContent: 'center'
        },

        ButtonFrame: {
            borderWidth: 1,
            borderColor: gColors.buttonBorder,
            marginTop: 10,
            borderRadius: 50,
            overflow: 'hidden'
        }
    });

export default Button;