import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import PlayerIcon from './PlayerIcon';
import InfoBox from '../../components/common/InfoBox';

class TeamPlayers extends Component {
    render() {
        const p = this.props;
        const { players } = p;
        if (!players || players.length === 0) return <InfoBox lMsg='TeamPlayers.NoPlayers' />

        return (                
            <ScrollView style={style.Players} contentContainerStyle={style.PlayerContainer}>
                {players.map(player => {
                    return <PlayerIcon key={player.id} data={player} team={p.team} />
                })}    
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    View: {
        
    },
    Players: {
                
    },
    PlayerContainer: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
});

export default TeamPlayers;