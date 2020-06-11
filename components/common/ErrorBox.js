import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Localize } from '../locale/Loc';
import { gColors, gMetrics } from '../../GlobalStyles';
import { FontAwesome } from '@expo/vector-icons';

class ErrorBox extends Component {
    render() {
        const p = this.props;

        return (
            <View style={style.View}>
                <FontAwesome name="exclamation" size={80} style={style.Icon} />
                <Text style={style.Text}>{p.msg || Localize(p.lMsg)}</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: gColors.background, 
        padding: gMetrics.screenPadding
    },
    Text:  {
        fontSize: 20, 
        fontWeight: '600', 
        color: gColors.text1,
        textAlign: 'center'
    },
    Icon: {
        color: gColors.severeError,
    }
});

export default ErrorBox;