import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, StatusBar, TouchableNativeFeedback } from 'react-native';
import GlobalStyles, { GS, gColors } from '../../GlobalStyles';
import PlayerData from './PlayerData';
import Awards from './Awards';
import PlayerStats from './PlayerStats';
import PlayerActions from './PlayerActions';
import { inject, observer } from 'mobx-react';
import { headerNavigationOptions } from './Home';
import FsSpinner from '../../components/common/FsSpinner';
import { setOrganizationHeader } from '../../store/OrganizationStore';
import TeamDataDetailed from './TeamDataDetailed';
import { observable } from 'mobx';
import PlayerSanctions from './PlayerSanctions';
import TeamSanctions from './TeamSanctions';

@inject('store', 'ui')
@observer
class PlayerDetails extends Component {
  static navigationOptions = headerNavigationOptions;

  @observable player = null;
  @observable teamSanctions = null;

  constructor(props) {
    super(props);

    this.loadData();

    setOrganizationHeader(this.props.store, this.props.navigation);
  }

  loadData = async () => {
    const p = this.props;
    const nav = p.navigation;

    let idUser = nav.getParam('idUser');
    let idTeam = nav.getParam('idTeam');
    let idTournament = nav.getParam('idTournament');

    if (!idUser) {
      // None specified, go for the owner.
      const { owner } = p.store.players;
      idUser = owner.idUser;
      const td = owner.teamData;
      const team = td && td.team;
      idTeam = td && td.idTeam;
      const tournament = team && team.tournament;
      idTournament = tournament && tournament.id;
    }

    if (this.idUser == idUser && this.idTeam == idTeam && this.idTournament == idTournament) return;

    this.idUser = idUser;
    this.idTeam = idTeam;
    this.idTournament = idTournament;

    this.player = await p.store.players.getUser(idUser, idTeam, idTournament);
    this.teamSanctions = await p.store.sanctions.getSanctionsForTeamAndTournament(idTeam, idTournament);
  };

  render() {
    const p = this.props;

    const player = this.player;
    if (!player) return <FsSpinner lMsg="Loading player data" />;

    const isOwner = p.ui.auth.idUser === player.idUser;

    return (
      <ScrollView style={{ backgroundColor: gColors.headerBack }}>
        <StatusBar barStyle="light-content" />
        <View style={GlobalStyles.MainViewCenter}>
          <PlayerData style={style.PlayerData} data={player} age motto />
          <View style={style.TeamData}>
            <TeamDataDetailed data={player.teamData} teams={player.teams} />
          </View>
          <Awards data={player} currentIdTeam={this.idTeam} currentIdTournament={this.idTournament} />
          <PlayerStats data={player} />
          <TeamSanctions sanctions={this.teamSanctions} />
          <PlayerSanctions sanctions={player.sanctions} />
          <PlayerActions data={player} navigation={p.navigation} isOwner={isOwner} />
          {/* {isOwner ? <News /> : null } */}
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  View: {},
  TeamData: {
    marginVertical: 20,
  },
  PlayerData: {
    paddingTop: 10,
    paddingBottom: 0,
  },
});

export default PlayerDetails;
