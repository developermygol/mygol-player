import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionHead from '../../components/common/SectionHead';
import { Localize } from '../../components/locale/Loc';
import FontAwesome from '../../node_modules/@expo/vector-icons/FontAwesome';
import Spinner from '../../components/common/Spinner';
import { headerNavigationOptions } from './Home';

class News extends Component {
    
    static navigationOptions = headerNavigationOptions;

    render() {
        return (
            <View style={style.View}>
                <SectionHead title='News' />
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        flex: 1
    }
});

export default News;