import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { inject, observer } from '../../node_modules/mobx-react';
import InfoBox from '../../components/common/InfoBox';
import { findByIdInArray } from '../../components/Data';
import { Localize } from '../../components/locale/Loc';
import { Ionicons } from '@expo/vector-icons';
import { gColors } from '../../GlobalStyles';
import { getIconPrefix } from '../../components/Utils';
import { withNavigation } from 'react-navigation';


@inject('store') @observer
class MatchEvents extends Component {
    render() {
        const p = this.props;
        const  { match } = p;
        if (!match) return null;

        const { events } = match;
        if (!events || events.length === 0) return <InfoBox msg={Localize('Match.NoEvents')} />

        return (
            <View style={[style.View, p.style]}>
                <FlatList
                    data={events}
                    renderItem={({item}) => <MatchEvent match={match} event={item} />}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    }
}


const MatchEvent = withNavigation(class MatchEventClass extends Component {

    handlePlayerPress = (player, idTeam) => {
        const p = this.props;
        p.navigation.push('PlayerDetails', { idPlayer: player.id, idUser: player.userData.id, idTeam: idTeam, idTournament: this.props.match.idTournament });

    }

    getPlayerNameLink = (idPlayer, textAlign) => {
        if (!idPlayer) return <Text style={style.PlayerName} />;

        const { event, match } = this.props;
        
        let player = null;
        if (event.idTeam === match.idHomeTeam) player = findByIdInArray(match.homePlayers, idPlayer);
        if (event.idTeam === match.idVisitorTeam) player = findByIdInArray(match.visitorPlayers, idPlayer);
        if (!player) return <Text style={style.PlayerName} />;

        return (
            <View style={style.PlayerName}>
                <TouchableOpacity onPress={() => this.handlePlayerPress(player, event.idTeam)}>
                    <Text style={[style.TouchablePlayerName, { textAlign }]}>{player.name + ' ' + player.surname}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    getEventImage = (eventType) => {
        //return <Text style={style.EventIcon} />
        switch (eventType) {
            case 31: return <Ionicons style={style.EventIcon} name={getIconPrefix() + "football"} size={26} color={gColors.text1} />;        // Goal
            case 61: return <Ionicons style={style.EventIcon} name={getIconPrefix() + "square"} size={26} color={gColors.cardsType1} />;     // yellow card
            case 62: return <Ionicons style={style.EventIcon} name={getIconPrefix() + "square"} size={26} color={gColors.cardsType2} />;     // red card
            case 33: return <Ionicons style={style.EventIcon} name={getIconPrefix() + "flag"} size={26} color={gColors.text1} />;            // corner
            default: return <Text style={style.EventIcon}>{this.getEventText(eventType)}</Text>
        }
    }

    getEventText = (eventType, match) => {
        const isShootout = eventType === 80;
        if (isShootout)
          return `${Localize('MatchEventType' + eventType)} (${match.homeScore - match.visibleHomeScore}-${
            match.visitorScore - match.visibleVisitorScore
          })`;
        return Localize('MatchEventType' + eventType);
    }

    renderLeft = (idTeam) => {
        const { event } = this.props;

        return (
            <View style={style.Event}>
                {this.getPlayerNameLink(event.idPlayer, 'right')}
                {this.getEventImage(event.type)}
                <Text style={style.CenterLine}></Text>
                <Text style={style.EventMinute}>{event.matchMinute}'</Text>
                <Text style={style.Padding}></Text>
            </View>
        )
    }

    renderRight = (idTeam) => {
        const { event } = this.props;

        return (
            <View style={style.Event}>
                <Text style={style.Padding}></Text>
                <Text style={style.EventMinute}>{event.matchMinute}'</Text>
                <Text style={style.CenterLine}></Text>
                {this.getEventImage(event.type)}
                {this.getPlayerNameLink(event.idPlayer, 'left')}
            </View>
        )
    }

    renderCenter = () => {
        const { event, match } = this.props;

        return (
            <View style={style.Event}>
                <View style={style.CenterEvent}>
                    <Text style={style.CenterEventText}>{this.getEventText(event.type, match)}</Text>
                </View>
            </View>
        );
    }
    
    isVisibleEvent = (type) => {
        switch (type) {
            case 30: // Assist
            case 100: // Record closed
            case 1001:  // hidden: AddToPdrData1
            case 1002:  // hidden: AddTournamentPoints
                return false;
            default: 
                return true;
        }
    }

    render() {
        const p = this.props;
        const { event, match } = p;

        if (!event) return null;
        if (!this.isVisibleEvent(event.type)) return null;

        if (event.idTeam === match.idHomeTeam) return this.renderLeft(match.idHomeTeam);
        if (event.idTeam === match.idVisitorTeam) return this.renderRight(match.idVisitorTeam);

        return this.renderCenter();
    }
});



const style = StyleSheet.create({
    View: {
        
    },
    Event: {
        flexDirection: 'row',
        justifyContent: 'space-around', 
        alignItems: 'center'
    },
    PlayerName: {
        flex: 9,
        //paddingHorizontal: 5,
        //backgroundColor: '#bbb'
    },
    TouchablePlayerName: {
        color: gColors.touchableText,
        fontWeight: '600'
    },
    IconWrapper: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: 40, 
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 7
    },
    EventIcon: {
        flex: 3,
        textAlign: 'center'
        //paddingHorizontal: 5,
        //backgroundColor: '#aaa'
    },
    CenterLine: {
        flex: 0.1,
        backgroundColor: gColors.tableHeaderBack,
        paddingVertical: 15
    }, 
    EventMinute: {
        flex: 4,
        fontWeight: '800',
        textAlign: 'center',
        color: gColors.text1
        //backgroundColor: '#aaa'
    },
    Padding: {
        flex: 8,
        //backgroundColor: '#bbb'
    },
    CenterEvent: {
        backgroundColor: gColors.background,
        paddingVertical: 7, 
        //paddingHorizontal: 10,
        //borderRadius: 10, 
        marginVertical: 2
    },
    CenterEventText: {
        color: gColors.text2,
        backgroundColor: gColors.background,
        fontSize: 12
    }
});


export default MatchEvents;