import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Localize } from '../locale/Loc';
import { gColors } from '../../GlobalStyles';
import { getOpErrorText } from '../Utils';

class ErrorMsg extends Component {
    render() {
        const p = this.props;

        let msg = p.msg;
        if (p.msg && msg.message) msg = p.msg.message;

        return (
            <Text style={[style.Text, p.style]}>{msg || Localize(p.lMsg)}</Text>
        )
    }
}

const style = StyleSheet.create({
    Text:  {
        color: gColors.severeError,
        textAlign: 'center'
    },
});

export default ErrorMsg;