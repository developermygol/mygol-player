import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { inject } from '../../node_modules/mobx-react';
import { observer } from '../../node_modules/mobx-react/native';
import { withNavigation } from 'react-navigation';
import FsSpinner from '../../components/common/FsSpinner';
import MatchHeader from './MatchHeader';
import MatchPlayers from './MatchPlayers';
import MatchReferees from './MatchReferees';
import MatchEvents from './MatchEvents';
import { Localize } from '../../components/locale/Loc';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { gColors, GS, ScrollableTabViewProps } from '../../GlobalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getIconPrefix } from '../../components/Utils';

@inject('store')
@observer
class MatchDetails extends Component {
  static instance = null;

  static navigationOptions = {
    title: Localize('Match.Overview'),
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          instance && instance.handleUpdate();
        }}
      >
        <Ionicons
          name={getIconPrefix() + 'refresh'}
          size={25}
          color={gColors.headerTint}
          style={{ marginRight: 20 }}
        />
      </TouchableOpacity>
    ),
  };

  componentDidMount = () => {
    instance = this;

    this.loadData();
  };

  loadData = () => {
    const p = this.props;
    const idMatch = p.navigation.getParam('idMatch');
    p.store.matches.actions.get(idMatch);
  };

  handleUpdate = () => {
    this.loadData();
  };

  render() {
    const p = this.props;
    const match = p.store.matches.current;
    const idMatch = p.navigation.getParam('idMatch');

    if (!match || match.id !== idMatch) return <FsSpinner lMsg="Loading match details" />;

    return (
      <View style={style.View}>
        <MatchHeader match={match} />
        {/* <MatchSummonStatus match={match}  /> */}

        <ScrollableTabView {...ScrollableTabViewProps} initialPage={1}>
          <MatchPlayers key={2} tabLabel={Localize('Players')} match={match} />
          <MatchEvents key={1} tabLabel={Localize('Events')} match={match} />
          <MatchReferees key={3} tabLabel={Localize('Referees')} referees={match.referees} />
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

export default withNavigation(MatchDetails);
