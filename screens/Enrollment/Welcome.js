import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Loc, { Localize } from '../../components/locale/Loc';
import { inject, observer } from 'mobx-react/native';
import Button from '../../components/common/Button';
import { getUploadsIcon } from '../../components/Utils';
import gStyles, { gColors } from '../../GlobalStyles';
import { observable } from '../../node_modules/mobx';
import FsSpinner from '../../components/common/FsSpinner';


@inject('store') @observer
class Welcome extends Component {
    
    @observable error = null;

    static navigationOptions = {
        title: Localize('WelcomeScreenTitle'),
        header: null
    }
    
    handleNextButton = () => {
        this.navigateToNextStep();
    }

    isResuming = () => {
        const pl = this.props.store.players.owner;

        return (pl.enrollmentStep > 0);
    }

    navigateToNextStep = () => {
        const player = this.props.store.players.owner;
        const playerEnrollmentStep = player.enrollmentStep;
        const n = this.props.navigation;

        if (playerEnrollmentStep < 10) {
            switch (playerEnrollmentStep) {
                case 0:
                case 1: n.navigate('TermsWithAccept'); break;
                case 2: n.navigate('PersonalData'); break;
                case 3: n.navigate('MainPhoto'); break;
                case 4: n.navigate('IdScan'); break;
                
                default: break;
            }
        }
        else {
            const teamEnrollmentStep = player.teamData.enrollmentStep;

            switch (teamEnrollmentStep) {
                case 0: // initial payment screen
                case 10: // initial payment screen
                case 11: 
                case 12: 
                case 13: 
                case 14: n.navigate('PaidOptionStep'); break; // Navigate to payment process screen with step number as index
    
                case 20:  // Payment summary
                case 21: n.navigate('PaidOptionsSummary'); break; // Payment form
                
                case 100: 
                case 101:
                case 102: n.navigate('Home'); break;
                
                default: break;  // navigate to initial step
            }
        }
    }

    render() {
        const p = this.props;
        const org = p.store.organization.current;
        const player = p.store.players.owner;
        if (!player) return <FsSpinner lMsg='LoadingEnrollment' />

        const store = p.store.players;
        const team = store.owner.teamData.team;
        const tournament = null; // Tournament is not loaded in the store yet.

        const logo = team ? getUploadsIcon(team.logoImgUrl, team.id, 'team') : null;

        return (
            <View style={style.view}>
                <View style={gStyles.vcenter1}><Text style={style.topTitle}>{org && org.name.toUpperCase()}</Text></View>
                <View style={gStyles.vcenter2}><Text style={style.welcome}>Bienvenido, {player && (player.name + ' ' + player.surname)}</Text></View>
                <View style={gStyles.vcenter2}><Image source={{uri: logo } } style={style.teamLogo} /></View>
                <View style={gStyles.vcenter2}>
                    <Text style={style.welcomeDetails}>Tienes una invitación para unirte al equipo {team && team.name}{tournament ? ' en la competición ' + tournament.name : ''}.</Text>
                    <Text style={style.welcomeDetails}>{ this.isResuming() ? 
                            'Vamos a continuar con la inscripción donde lo dejaste.'
                            : 
                            'Vamos a comenzar con la inscripción.'
                            }
                    </Text>
                </View>
                <Button title='Next' onPress={this.handleNextButton} style={style.Button} />
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
        fontSize: 22,
        fontWeight: "800",
        textAlign: 'center',
        color: gColors.headText1
    }, 
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        color: gColors.text1
    },
    teamLogo: {
        flex: 2,
        width: 300, 
        height: 300, 
        resizeMode: 'contain'
    },
    welcomeDetails:  {
        fontSize: 16,
        textAlign: 'center',
        color: gColors.text1,
        marginBottom: 5
    },
    Button: {
        flex: 1,
        marginBottom: 30,
        alignSelf: 'stretch'
    }
});

export default Welcome;