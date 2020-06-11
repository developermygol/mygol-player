import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button as BaseButton } from 'react-native';
import Loc, { Localize } from '../../components/locale/Loc';
import { inject, observer } from 'mobx-react/native';
import Button from '../../components/common/Button';
import { getUploadsIcon } from '../../components/Utils';
import gStyles from '../../GlobalStyles';
import Tick from '../../assets/tick.png';
import SpinnerButton from '../../components/common/SpinnerButton';

@inject('store') @observer
class Congrats extends Component {
    
    static navigationOptions = {
        title: Localize('CongratsScreenTitle'),
        header: null
    }
    
    handleNextButton = async () => {
        const pls = this.props.store.players;
        await pls.saveEnrollmentStep100();

        this.props.navigation.navigate('SocialData');
    }

    handleGoHomeButton = async () => {
        const pls = this.props.store.players;
        await pls.saveEnrollmentStep100();

        this.props.navigation.navigate('Home');
    }

    render() {
        const p = this.props;
        const pls = this.props.store.players;

        return (
            <View style={style.view}>
                <View style={gStyles.vcenter1}>
                    <Text style={style.topTitle}><Loc>Congrats.Title</Loc></Text>
                    <Text style={style.details}><Loc>Congrats.EnrollmentSuccessful</Loc></Text>
                </View>
                <View style={gStyles.vcenter2}><Image source={Tick} style={style.tick} /></View>
                <View style={gStyles.vcenter2}>
                    <Text style={style.details}><Loc>Congrats.Details</Loc></Text>
                    <Text style={style.suggestion}><Loc>Congrats.Suggestion</Loc></Text>
                </View>
                
                <SpinnerButton title='Congrats.GotoProfile' onPress={this.handleNextButton} style={style.Button} loading={pls.loading} />
                <BaseButton title={Localize('Congrats.GotoHome')} onPress={this.handleGoHomeButton} style={style.Button} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    view: {
        flex: 1, 
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 40
    },
    topTitle: {
        flex: 1,
        marginTop: 10,
        fontSize: 30,
        fontWeight: "600",
        textAlign: 'center'
    }, 
    details: {
        textAlign: 'center'
    },
    tick: {
        flex: 2,
        width: 130, 
        height: 130, 
        resizeMode: 'contain'
    },
    details:  {
        textAlign: 'center',
        marginBottom: 10
    },
    suggestion: {
        fontSize: 16,
        textAlign: 'center'
    },
    Button: {
        marginBottom: 20,
        justifyContent: 'center'
    }
});

export default Congrats;