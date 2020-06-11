import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { gColors } from '../../GlobalStyles';
import { Localize } from '../locale/Loc';

class OutputField extends Component {

    render() {
        const p = this.props;

        return (
            <View style={[style.View, p.style]}>
                <Text style={style.Title}>{Localize(p.title)}</Text>
                <Text style={style.Value}>{p.value}</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        marginVertical: 5
    },
    Title: {
        fontSize: 12,
        color: gColors.text2
    },
    Value: {
        color: gColors.text1,

    }
});

export default OutputField;