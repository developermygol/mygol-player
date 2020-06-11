import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { headerNavigationOptions } from '../Home/Home';
import { inject } from '../../node_modules/mobx-react/native';
import { observer } from '../../node_modules/mobx-react';
import { Localize } from '../../components/locale/Loc';
import RightButton from '../../components/common/RightButton';
import SectionHead from '../../components/common/SectionHead';
import { setOrganizationHeader } from '../../store/OrganizationStore';

@inject('store') @observer
class Configuration extends Component {

    static navigationOptions = (p) => {
        const headerOpts = headerNavigationOptions(p);
        return {
            ...headerOpts,
            title: Localize('Configuration')
        }
    }
    ;

    componentDidMount = () => {
        this.loadData();
    }

    loadData = () => {
        setOrganizationHeader(this.props.store, this.props.navigation);
    }

    navigate = (target, params) => {
        const n = this.props.navigation;
        n.navigate(target, params);
    }

    render() {
        const p = this.props;
        const { owner } = p.store.players;
        const isApproved = owner && owner.approved;

        return (
            <View style={style.View}>
                <StatusBar barStyle='light-content' />
                <View style={style.ActionsWrapper}>
                    <RightButton title='Config.PersonalInfo' onPress={() => this.navigate('PersonalData', { edit: true })} />
                    <RightButton title='Config.SocialInfo' onPress={() => this.navigate('SocialData', { edit: true })} />
                    {!isApproved ? <RightButton title='Config.FichaPicture' onPress={() => this.navigate('MainPhoto', { edit: true })} /> : null }
                    {!isApproved ? <RightButton title='Config.IdCardScan' onPress={() => this.navigate('IdScan', { edit: true })} /> : null }
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        
    }
});

export default Configuration;