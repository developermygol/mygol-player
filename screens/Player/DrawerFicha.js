import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ficha from './Ficha';
import { headerNavigationOptions } from '../Home/Home';

class DrawerFicha extends Component {

    static navigationOptions = headerNavigationOptions;

    render() {
        const p = this.props;

        return (
            <View style={style.View}>
                <Ficha />
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        flex: 1
    }
});

export default DrawerFicha;