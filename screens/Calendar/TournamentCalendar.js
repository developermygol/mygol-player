import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { flow, observable } from '../../node_modules/mobx';
import { inject } from '../../node_modules/mobx-react/native';
import { observer } from '../../node_modules/mobx-react';
import MatchList from '../Match/MatchList';
import { requestAsync, getOutlineSuffix } from '../../components/Utils';
import axios from '../../axios';
import GlobalStyles, { gColors } from '../../GlobalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getIconPrefix } from '../../components/Utils';
import { Localize } from '../../components/locale/Loc';
import TournamentHead from '../Tournament/TournamentHead';

@inject('store')
@observer
class TournamentCalendar extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons name={getIconPrefix() + 'calendar'} size={30} color={tintColor} />
      //   <Ionicons name={getIconPrefix() + 'calendar' + getOutlineSuffix(focused)} size={30} color={tintColor} /> // Change for SDK version
    ),
    tabBarLabel: Localize('TournamentCalendar'),
  };

  @observable loading = false;
  @observable error = null;
  @observable data = null;

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate = () => {
    this.loadData();
  };

  loadData = flow(function* () {
    // Verify if we need to reload
    const p = this.props;
    const idTournament = p.navigation.getParam('idTournament');

    if (this.idTournament === idTournament) return;

    this.idTournament = idTournament;
    this.data = yield requestAsync(this, axios.get, null, '/matches/fortournament/' + idTournament);
  });

  render() {
    const p = this.props;

    return (
      <View style={style.View}>
        <TournamentHead navigation={this.props.navigation} />
        <MatchList days={this.data} showDaySeparator={true} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  View: {
    flex: 1,
    backgroundColor: gColors.background,
  },
});

export default TournamentCalendar;
