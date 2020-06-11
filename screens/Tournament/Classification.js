import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { inject } from '../../node_modules/mobx-react/native';
import { observer } from '../../node_modules/mobx-react';
import { observable, action, observe } from '../../node_modules/mobx';
import TournamentHead from './TournamentHead';
import StageClassification from './StageClassification';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import { gColors, ScrollableTabViewProps } from '../../GlobalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getIconPrefix, getOutlineSuffix } from '../../components/Utils';
import { Localize } from '../../components/locale/Loc';
import FsSpinner from '../../components/common/FsSpinner';
import PlainTeamList from './PlainTeamList';
import ErrorBox from '../../components/common/ErrorBox';

@inject('store')
@observer
class Classification extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons name={getIconPrefix() + 'list-box'} size={30} color={tintColor} />
    ),
    // tabBarIcon: ({focused, tintColor}) => <Ionicons name={getIconPrefix() + 'list-box' + getOutlineSuffix(focused)} size={30} color={tintColor} />, // Change for SDK version
    tabBarLabel: Localize('Classification'),
  };

  @observable loading = false;
  @observable error = null;

  @action setStage = stageIndex => {
    this.tabState.index = stageIndex;
  };

  render() {
    const p = this.props;
    const stages = p.store.stages.all;

    if (p.store.tournaments.error) return <ErrorBox msg={p.store.tournaments.error} />;

    if (!stages) return <FsSpinner lMsg="Loading classification" />;

    return (
      <View style={style.View}>
        <TournamentHead navigation={this.props.navigation} />
        {stages.length > 0 ? (
          <ScrollableTabView {...ScrollableTabViewProps}>
            {stages.map(stage => {
              return <StageClassification key={stage.id} tabLabel={stage.name} stage={stage} />;
            })}
          </ScrollableTabView>
        ) : (
          <PlainTeamList />
        )}
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

export default Classification;
