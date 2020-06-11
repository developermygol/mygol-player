import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Loc, { Localize } from './locale/Loc';

class NotImplemented extends Component {
    render() {
        let text = this.props.content;
        text = text ? Localize(text) : '';

        return (
            <View style={style.View}>
                <View style={style.RedMark}>
                    <Text style={style.Content}>{text.toUpperCase()}</Text>
                    <Text style={style.Text}><Loc>Not implemented</Loc></Text>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    
    View: {
       
    },

    RedMark: {
        width: 200, 
        height: 200, 
        backgroundColor: 'red',
        borderRadius: 100, 
        marginTop: 40, 
        marginBottom: 20, 
        //overflow: 'hidden'  // to support circle in iOS (otherwise borederRadius doesn't work)
        justifyContent: 'center',
        alignItems: 'center'
    },

    Text: {
        fontSize: 18,
        color: 'white'
    },

    Content: {
        fontWeight: "800",
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 3
    }

});

export default NotImplemented;