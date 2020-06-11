import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

class TopBar extends Component {
    render() {
        const p = this.props;

        return (
            <View style={style.View}>
                <Image source={null} style={style.Burguer} />
                <Text style={style.Title}>{p.title && p.title.toUpperCase()}</Text>
                <Image source={null} style={style.Search} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        flexDirection: 'row',
        backgroundColor: '#CCC',
        paddingVertical: 8
    },
    Burguer: {
        flex: 1,
        height: 30,
        width: 30
    },
    Title: {
        flex: 8,
        flexGrow: 8,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '800',
        //textTransform: 'uppercase'    // Available in react native 0.56, expo still in 0.55.4
    },
    Search: {
        flex: 1
    }
});

export default TopBar;