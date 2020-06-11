import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Button from './Button';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import Spinner from './Spinner';

@observer
class SpinnerButton extends Component {

    render() {
        const p = this.props;

        return (
            <View style={p.style}>
                {p.loading ? 
                    <ActivityIndicator style={style.Spinner} size='large' />
                    :
                    ( p.content || <Button title={p.title} onPress={p.onPress} /> )
                }
            </View>
        )
    }
}

const style = StyleSheet.create({
    Spinner: {
        alignSelf: 'center'
    }
});

export default SpinnerButton;