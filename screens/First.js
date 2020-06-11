import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { inject } from '../node_modules/mobx-react';
import { observer } from '../node_modules/mobx-react/native';

@inject('ui') @observer
class First extends Component {
    constructor(props) {
        super(props);
        this.bootstrapAsync(props);
    }

    bootstrapAsync = async (props) => {
        const token = props.ui.auth.token;
        const initialScreen = token ? 'PlayerTeamChooser' : 'Auth';

        this.props.navigation.navigate(initialScreen);
    }

    render() {
        return (
            <View style={style.View}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {

    }
});

export default First;