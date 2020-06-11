import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Localize } from '../../components/locale/Loc';
import { headerNavigationOptions } from '../Home/Home';
import { termsText } from '../Enrollment/Terms';
import GlobalStyles from '../../GlobalStyles';
import { inject, observer } from '../../node_modules/mobx-react/native';

@inject('store') @observer
class TermsAndConditions extends Component {

    static navigationOptions = (p) => {
        const headerOpts = headerNavigationOptions(p);
        return {
            ...headerOpts, 
            title: Localize('TermsScreenTitle')
        }
    }

    
    componentDidMount = () => {
        this.loadData();
    }

    loadData = () => {
        // Set org name
        const p = this.props;
        const org = p.store.organization.current;
        if (org) p.navigation.setParams({title: org.name});        
    }

    render() {
        return (
            <ScrollView style={GlobalStyles.MainView}>
                <StatusBar barStyle='light-content' />
                <View style={[style.View]}>
                    <Text style={style.terms}>{termsText}</Text>
                </View>
                <View style={style.Center}>
                    <Text style={style.Version}>v{Expo.Constants.manifest.version}</Text>
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    View: {
        paddingBottom: 50
    },
    Center: {
        margin: 30,
    },
    Version: {
        color: '#AAA',
        fontSize: 10,
        textAlign: 'center'
    }
});

export default TermsAndConditions;