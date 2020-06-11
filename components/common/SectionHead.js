import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { gColors } from '../../GlobalStyles';

class SectionHead extends Component {
    render() {
        const p = this.props;
        return (
            <View>
                <Text style={style.Title}>{p.title}</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    Title: {
        fontSize: 20,
        fontWeight: '600',
        paddingVertical: 10,
        textAlign: 'center',
        color: gColors.text1
    }
});

export default SectionHead;