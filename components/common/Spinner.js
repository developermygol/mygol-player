import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

class Spinner extends Component {
    render() {
        return (
            this.props.loading || !this.props.data ? 
                <View style={[style.View, this.props.style]}>
                    <ActivityIndicator size='large'/>
                </View>
                :
                this.props.children || null
        )
    }
}

const style = StyleSheet.create({
    View: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});

export default Spinner;