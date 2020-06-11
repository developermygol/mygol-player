import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { gColors } from '../../GlobalStyles';
import { Localize } from '../locale/Loc';

class FsSpinner extends Component {
    render() {
        const p = this.props;

        return (
            <View style={[style.View, p.style]}>
                <ActivityIndicator size='large'/>
                { p.lMsg ? <Text style={style.Status}>{Localize(p.lMsg)}</Text> : null }
                { p.msg ? <Text style={style.Status}>{p.msg}</Text> : null }
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Status: {
        marginVertical: 10,
        color: gColors.text2, 
        fontSize: 10
    }
});

export default FsSpinner;