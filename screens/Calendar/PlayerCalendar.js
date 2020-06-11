import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { observer } from '../../node_modules/mobx-react';
import { inject } from '../../node_modules/mobx-react/native';
import { observable, action, flow } from '../../node_modules/mobx';
import { requestAsync } from '../../components/Utils';
import axios from '../../axios';
import MatchList from '../Match/MatchList';
import FsSpinner from '../../components/common/FsSpinner';
import SectionHead from '../../components/common/SectionHead';
import { Localize } from '../../components/locale/Loc';
import GlobalStyles, { gColors, gMetrics } from '../../GlobalStyles';

import Back from '../../assets/backgrounds/top2.jpg';
import ErrorBox from '../../components/common/ErrorBox';

@inject('store') @observer
class PlayerCalendar extends Component {

    static navigationOptions = {
        title: Localize('Player.MatchCalendar')
    }


    @observable loading = false;
    @observable error = null;
    @observable playerMatches = null;
    

    componentDidMount() {
        this.loadData();
    }
    
    componentDidUpdate = () => {
        this.loadData();
    }

    loadData = flow(function *() {
        // Verify if we need to reload
        const p = this.props;
        const idPlayer = p.navigation.getParam('idPlayer');
        const idTournament = p.navigation.getParam('idTournament');

        if (this.idPlayer === idPlayer && this.idTournament === idTournament) return;

        this.idPlayer = idPlayer;
        this.idTournament = idTournament;

        const tStore = p.store.tournaments;
        const tournament = tStore.current;
        if (!tournament || tournament.id !== idTournament) yield tStore.setCurrent(idTournament);

        this.playerMatches = yield requestAsync(this, axios.get, null, '/matches/forplayer/' + idPlayer + '?idTournament=' + idTournament);
    })

    render() {
        const p = this.props;

        if (this.error) return <ErrorBox msg={this.error} />;
        if (!this.playerMatches) return <FsSpinner lMsg='Loading calendar'/>;

        return (
            <View style={style.View}>
                <Image source={Back} style={{width: '100%', height: 120, resizeMode: 'cover'}} />
                {/* Dibuja arriba el último partido y el próximo (por fecha) */}
                <MatchList days={this.playerMatches} showDaySeparator={false} isFlatMatchList={true} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        flex: 1,
        backgroundColor: gColors.background, 
        
    }
});

export default PlayerCalendar;