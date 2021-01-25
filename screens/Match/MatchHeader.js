import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import TeamData from '../Home/TeamData';
import { inject, observer } from 'mobx-react';
import MatchStatus from './MatchStatus';

import Back from '../../assets/backgrounds/top1.jpg';
import { gColors } from '../../GlobalStyles';
@inject('store')
@observer
class MatchHeader extends Component {
  render() {
    const p = this.props;
    const { match } = p;
    if (!match) return null;

    const normalTeams = p.store.teams.normal;
    const homeTeam = normalTeams && normalTeams[match.idHomeTeam];
    const visitorTeam = normalTeams && normalTeams[match.idVisitorTeam];

    return (
      <ImageBackground source={Back} style={[style.View, p.style]}>
        <TeamData data={homeTeam} style={style.TeamIcon} textStyle={style.TeamName} />
        <MatchStatus match={match} style={style.Status} />
        <TeamData data={visitorTeam} style={style.TeamIcon} textStyle={style.TeamName} />
      </ImageBackground>
    );
  }
}

const style = StyleSheet.create({
  View: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  TeamIcon: {
    flex: 1,
  },
  Status: {
    flex: 1,
  },
  TeamName: {
    fontSize: 12,
    fontWeight: '600',
    color: gColors.headText1,
    textAlign: 'center',
  },
});

export default MatchHeader;
