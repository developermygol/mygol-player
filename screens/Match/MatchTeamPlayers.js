import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';

import InfoBox from '../../components/common/InfoBox';
import { Localize } from '../../components/locale/Loc';
import GlobalStyles, { GS, gColors } from '../../GlobalStyles';

const TeamPlayerNav = withNavigation(
  class TeamPlayer extends Component {
    handlePress = () => {
      const p = this.props;
      const { player, idTeam, idTournament } = p;

      this.props.navigation.push('PlayerDetails', {
        idPlayer: player.id,
        idUser: player.userData.id || player.idUser,
        idTeam,
        idTournament,
      });
    };

    render() {
      const p = this.props;
      const { player } = p;
      if (!player) return null;

      const { matchData } = player;
      const number = matchData && matchData.apparelNumber;
      const avatar = player.userData && player.userData.avatarImgUrl;
      const currentTeam = player.teamData.idTeam;
      const playerHasSanctionOnCurrentTeam = player.idSanction > 0 && currentTeam === player.idSanctionTeam;

      return (
        <View style={style.Player}>
          <View style={[GlobalStyles.ApparelNumberWrapper, style.NumberWrapper]}>
            <Text style={GlobalStyles.ApparelNumber}>{number}</Text>
          </View>
          <TouchableOpacity onPress={this.handlePress}>
            <Text style={GS.font.touchable}>{player.name + ' ' + player.surname}</Text>
            {playerHasSanctionOnCurrentTeam && (
              <Text style={style.SanctionedPlayer}>{Localize('TeamPlayer.Sanctioned')}</Text>
            )}
          </TouchableOpacity>
        </View>
      );
    }
  }
);

class MatchTeamPlayers extends Component {
  render() {
    const p = this.props;
    const { players, idTeam, idTournament } = p;
    if (!players || players.length === 0) return <InfoBox lMsg="TeamPlayers.NoPlayers" />;

    return (
      <ScrollView style={style.View}>
        {players.map(player => (
          <TeamPlayerNav key={player.id} player={player} idTeam={idTeam} idTournament={idTournament} />
        ))}
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  View: {},
  Player: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  NumberWrapper: {
    marginRight: 5,
  },
  SanctionedPlayer: {
    color: gColors.red,
  },
});

export default MatchTeamPlayers;
