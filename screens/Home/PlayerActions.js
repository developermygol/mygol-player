import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import SectionHead from '../../components/common/SectionHead';
import { Localize } from '../../components/locale/Loc';
import { inject } from '../../node_modules/mobx-react/native';
import { observer } from '../../node_modules/mobx-react';
import RightButton from '../../components/common/RightButton';
import { GS } from '../../GlobalStyles';

@inject('store')
@observer
class PlayerActions extends Component {
  getTournamentId = () => {
    const p = this.props;
    const tId = p.store.players.ownerTournamentId;
    if (tId !== -1) return tId;

    Alert.alert('No tournament context');
    return -1;
  };

  goToClassification = () => {
    const p = this.props;
    const idTournament = this.getTournamentId();
    if (idTournament === -1) return;

    p.navigation.push('PlayerClassification', { idTournament });
  };

  goToCalendar = () => {
    const p = this.props;
    const idPlayer = p.data.id;
    const idTournament = this.getTournamentId();
    if (idTournament === -1) return;

    this.props.navigation.push('PlayerCalendar', { idPlayer, idTournament });
  };

  goToDreamTeams = () => {
    const currentTournament = this.props.store.tournaments.current;
    this.props.navigation.push('DreamTeams', { idTournament: currentTournament.id });
  };

  goToFicha = () => {
    const p = this.props;
    p.navigation.push('Ficha', { player: p.data });
  };

  goToPayment = () => {
    const p = this.props;
    p.navigation.push('PaymentForm', { player: p.data });
  };

  render() {
    const p = this.props;
    if (!p.data) return null;

    if (!p.isOwner) return null;

    // if (!p.isOwner) return (
    //     <View style={style.View}>
    //         <SectionHead title={Localize('PlayerActions')} />
    //         <RightButton title='Player.MatchCalendar' onPress={this.goToCalendar} />
    //     </View>
    // );

    return (
      <View style={style.View}>
        <SectionHead title={Localize('PlayerActions')} />
        <View style={GS.box.card}>
          <RightButton title="My.Tournament" onPress={this.goToClassification} />
          <RightButton title="My.Calendar" onPress={this.goToCalendar} />
          <RightButton title="My.Rankings" onPress={this.goToRankings} />
          <RightButton title="My.Ficha" onPress={this.goToFicha} />

          {/* <RightButton title='PaymentFormScreenTitle' onPress={this.goToPayment} /> */}
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  View: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default PlayerActions;
