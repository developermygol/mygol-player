import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { inject } from '../../node_modules/mobx-react/native';
import { observer } from '../../node_modules/mobx-react';
import FsSpinner from '../../components/common/FsSpinner';
import { gColors, gMetrics, ScrollableTabViewProps } from '../../GlobalStyles';
import TeamData from '../Home/TeamData';
import TeamPlayers from './TeamPlayers';
import { Localize } from '../../components/locale/Loc';
import MatchList from '../Match/MatchList';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Back from '../../assets/backgrounds/top1.jpg';


@inject('store') @observer
class TeamDetails extends Component {

    static navigationOptions = {
        title: Localize('Team')
    }

    componentDidMount = () => {
        this.loadData();
    }

    componentDidUpdate = () => {
        this.loadData();
    }

    loadData = () => {
        const p = this.props;
        const idTeam = p.navigation.getParam('idTeam');
        const storeTournament = p.store.tournaments.current;
        let idTournament = p.navigation.getParam('idTournament') || (storeTournament && storeTournament.id);
        if (!idTournament) idTournament = -1;

        if (this.idTournament === idTournament && this.idTeam === idTeam) return;

        this.idTeam = idTeam;
        this.idTournament = idTournament;
        p.store.teams.get(idTeam, idTournament);
    }

    render() {
        const p = this.props;
        const idTeam = p.navigation.getParam('idTeam');
        const { current } = p.store.teams;

        if (!current || current.id !== idTeam) return <FsSpinner lMsg='Loading team details' />;

        return (
            <View style={[style.View, p.style]}>
                <ImageBackground source={Back} style={{width: '100%', paddingBottom: 10}} >
                    <TeamData noLink style={style.TeamData} data={current} large={true} textStyle={style.TeamName}/>
                </ImageBackground>
                <ScrollableTabView {...ScrollableTabViewProps}>
                    <TeamPlayers key={1} tabLabel={Localize('Players')} players={current.players} team={current} />
                    <MatchList key={2} tabLabel={Localize('Matches')} days={current.days} showDaySeparator={false} />
                </ScrollableTabView>
            </View>            

        )
    }
}

const style = StyleSheet.create({
    View: {
        flex: 1, 
        backgroundColor: gColors.background
    },
    TeamName: {
        color: gColors.headText1, 
        fontWeight: '600',
        fontSize: 16
    },
    TeamData: {
        marginTop: 20
    }
});

export default TeamDetails;