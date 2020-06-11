import React, { Component } from 'react';
import { AppRegistry, Platform, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Localize } from '../locale/Loc';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getIconPrefix } from '../Utils';
import { gColors } from '../../GlobalStyles';

class IconButton extends Component {
    

    render() {
        const p = this.props;
        const title = Localize(p.title);

        return (
            <View style={p.style}>
                <View style={[styles.ButtonFrame]}>
                    <TouchableOpacity activeOpacity={0.2} onPress={p.onPress} style={styles.Button}>
                        <Ionicons name={getIconPrefix() + p.icon} size={p.size || 25} color={gColors.iconButtonText} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        Button: {
            padding: 12,
            backgroundColor: gColors.iconButtonBackground,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },

        ButtonFrame: {
            borderWidth: 1,
            borderColor: gColors.iconButtonBorder,
            borderRadius: 50,
            overflow: 'hidden',
        }
    });

export default IconButton;