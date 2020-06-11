import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Localize } from '../locale/Loc';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { gColors } from '../../GlobalStyles';
import { getIconPrefix } from '../Utils';

class RightButton extends Component {
    render() {
        const p = this.props;
        const title = Localize(p.title);

        return (
            <View style={style.View}>
                <View style={style.ButtonFrame}>
                    <TouchableOpacity activeOpacity={0.2} onPress={p.onPress} style={style.CommonButton}>
                        {/* <Ionicons name={getIconPrefix() + (p.iconName || '')} size={25} style={style.Icon}  /> */}
                        <Text style={style.ButtonText}>{title}</Text>
                        <Ionicons name={getIconPrefix() + 'arrow-forward'} size={25} style={style.RightArrow}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        
    },
    ButtonFrame: {
        
        
    },
    CommonButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingLeft: 30
    },
    IonIcon: {

    },
    ButtonText: {
        paddingVertical: 15,
        textAlign: 'left',
        flex: 12,
        color: gColors.text1,
        fontWeight: '600'
    },
    RightArrow: {
        position: 'absolute',
        right: 15,
        color: gColors.text2
    }

});

export default RightButton;