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
    const type = 1;
    this.data = null;
    this.data = yield requestAsync(
      this,
      axios.get,
      null,
      '/tournaments/' + idTournament + '/ranking/scorers/' + type
    );
  });

  render() {
    const p = this.props;

    if (!this.data) return <FsSpinner lMsg="Loading ranking" />;

    return (
      <View style={style.View}>
        <TournamentHead navigation={p.navigation} />
        <ScrollableTabView {...ScrollableTabViewProps}>
          <ScorersRanking
            key={1}
            tabLabel={Localize('ScorersRanking')}
            idTournament={this.idTournament}
            data={this.data}
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
