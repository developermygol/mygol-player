import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { gColors, GS, ScrollableTabViewProps } from '../../GlobalStyles';
import { observer } from '../../node_modules/mobx-react';
import { observable, flow } from '../../node_modules/mobx';
import { requestAsync, getOutlineSuffix } from '../../components/Utils';
import ScorersRanking from './ScorersRanking';
import FsSpinner from '../../components/common/FsSpinner';
import axios from '../../axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getIconPrefix } from '../../components/Utils';
import { Localize } from '../../components/locale/Loc';
import TournamentHead from './TournamentHead';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

@observer
class Rankings extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons name={getIconPrefix() + 'list'} size={30} color={tintColor} />
      // <Ionicons name={getIconPrefix() + 'list' + getOutlineSuffix(focused)} size={30} color={tintColor} /> // Change for SDK version
    ),
    tabBarLabel: Localize('Rankings'),
  };

  @observable loading = false;
  @observable error = null;
  @observable scorers = null;
  @observable goalkeepers = null;
  @observable assistances = null;
  @observable mvps = null;

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
    const type = 1;

    this.scorers = yield requestAsync(
      this,
      axios.get,
      null,
      '/tournaments/' + idTournament + '/ranking/scorers/' + type
    );
    this.goalkeepers = yield requestAsync(
      this,
      axios.get,
      null,
      '/tournaments/' + idTournament + '/ranking/goalkeepers/' + type
    );
    this.assistances = yield requestAsync(
      this,
      axios.get,
      null,
      '/tournaments/' + idTournament + '/ranking/assistances/' + type
    );
    this.mvps = yield requestAsync(
      this,
      axios.get,
      null,
      '/tournaments/' + idTournament + '/ranking/mvps/' + type
    );
  });

  render() {
    const p = this.props;

    if (!this.scorers || !this.goalkeepers || !this.assistances || !this.mvps)
      return <FsSpinner lMsg="Loading ranking" />;

    return (
      <View style={style.View}>
        <TournamentHead navigation={p.navigation} />
        <ScrollableTabView {...ScrollableTabViewProps}>
          <ScorersRanking
            key={1}
            tabLabel={Localize('ScorersRanking')}
            type="scorers"
            idTournament={this.idTournament}
            data={this.scorers}
          />
          <ScorersRanking
            key={2}
            tabLabel={Localize('GoalkeepersRanking')}
            type="goalkeepers"
            idTournament={this.idTournament}
            data={this.goalkeepers}
          />
          <ScorersRanking
            key={3}
            tabLabel={Localize('AssistancesRanking')}
            type="assitances"
            idTournament={this.idTournament}
            data={this.assistances}
          />
          <ScorersRanking
            key={4}
            tabLabel={Localize('MVPsRanking')}
            type="mvps"
            idTournament={this.idTournament}
            data={this.mvps}
          />
        </ScrollableTabView>
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

export default Rankings;
