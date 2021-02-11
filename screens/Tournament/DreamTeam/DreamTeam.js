import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, FlatList } from 'react-native';
import { observable, flow } from 'mobx';
import { inject, observer } from 'mobx-react/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import TournamentHead from '../TournamentHead';
import { getIconPrefix, requestAsync } from '../../../components/Utils';
import axios from '../../../axios';
import Loc, { Localize } from '../../../components/locale/Loc';
import { gColors } from '../../../GlobalStyles';
import PlayerItem from './PlayerItem';

import BigField from '../../../assets/tactics/cesped.png';
import SmallField from '../../../assets/tactics/sala.png';
import { tactics } from '../../../assets/tactics/tactics.es.json';
import SoccerField from './SoccerField';
import InfoBox from '../../../components/common/InfoBox';

@inject('store')
@observer
class DreamTeam extends Component {
  static navigationOptions = navData => ({
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons name={getIconPrefix() + 'people'} size={30} color={tintColor} />
    ),
    tabBarLabel: Localize('DreamTeam'),
  });

  @observable loading = false;
  @observable error = null;
  @observable tournament = null;
  @observable tournamentModes = [];
  @observable layout = null;

  state = {
    layout: null,
  };

  componentDidMount() {
    this.loadData();
    this.tournamentModes = this.props.store.organization.current.modes;
  }

  getPoints() {}

  loadData = flow(function* () {
    // Verify if we need to reload
    const idTournament = this.props.navigation.getParam('idTournament');

    if (this.idTournament === idTournament) return;

    this.tournament = yield requestAsync(this, axios.get, null, '/tournaments/' + idTournament);
  });

  render() {
    if (!this.tournament) return null;

    let dreamTeamPlayers = [];
    let title;

    if (this.tournament.dreamTeam) {
      const dreamTeam = JSON.parse(this.tournament.dreamTeam);
      dreamTeamPlayers = dreamTeam.players;
      title = dreamTeam.title;
    }

    const { numPlayers } = this.tournamentModes.find(mode => mode.id === this.tournament.idTournamentMode);
    const defaultTactic = tactics.filter(t => t.numPlayers === numPlayers)[0];
    const FieldIamge = numPlayers === 11 ? BigField : SmallField;
    const isNoPlayersYet = dreamTeamPlayers.length === 0;

    return (
      <View style={styles.View}>
        <TournamentHead navigation={this.props.navigation} subtitle={title} />
        <ScrollView>
          <View
            style={styles.TacticContainer}
            onLayout={event => {
              // var { x, y, width, height } = event.nativeEvent.layout;
              this.setState({ layout: event.nativeEvent.layout });
            }}
          >
            <SoccerField
              layout={this.state.layout}
              image={FieldIamge}
              positions={defaultTactic.positions}
              players={dreamTeamPlayers}
            />

            <View style={styles.DreamTeam}>
              {isNoPlayersYet ? (
                <View>
                  <InfoBox msg={<Loc>DreamTeam.NoPlayers</Loc>} />
                </View>
              ) : (
                <FlatList
                  data={dreamTeamPlayers}
                  renderItem={PlayerItem}
                  keyExtractor={item => item.idPlayer}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    flex: 1,
    backgroundColor: gColors.background,
  },
  TacticContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 15,
  },
  TacticField: {},
  TacticPositions: {},
  DreamTeam: {
    marginTop: 30,
    // flex: 1,
  },
});

export default DreamTeam;
