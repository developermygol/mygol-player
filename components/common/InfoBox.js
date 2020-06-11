import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Localize } from '../locale/Loc';
import { gColors } from '../../GlobalStyles';

class InfoBox extends Component {
    render() {
        const p = this.props;

        return (
            <View style={style.View}>
                <View style={style.InfoBox}>
                    <Text style={style.Text}>{p.msg || Localize(p.lMsg)}</Text>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    InfoBox: {
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: gColors.infoboxBackground,
        borderColor: gColors.infoboxBorder,
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
        margin: 10
    },
    Text: {
        fontSize: 20,
        fontWeight: '600',
        color: gColors.infoboxText,
        textAlign: 'center'
    }
});

export default InfoBox;