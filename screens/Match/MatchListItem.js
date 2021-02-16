import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getShortMatchDate, getUploadsIcon } from '../../components/Utils';
import { inject } from '../../node_modules/mobx-react/native';
import { gColors } from '../../GlobalStyles';
import { withNavigation } from 'react-navigation';
import { Localize } from '../../components/locale/Loc';
import { matchHasSootOut } from '../../helpers/helpers';

@inject('store')
class MatchListItem extends Component {
  isFillerMatch = m => {
    return m.idHomeTeam === -1 || m.idVisitorTeam === -1;
  };

  getTeamNameContent = (idTeam, team, descriptionText, styles) => {
    if (idTeam === -1) return <Text style={styles}>{Localize('Rests')}</Text>;

    if (team) {
      return <Text style={[style.Touchable, ...styles]}>{team.name || '--'}</Text>;
    } else {
      return <Text style={styles}>{descriptionText}</Text>;
    }
  };

  getTeamLogo = team => {
    source = team ? { uri: getUploadsIcon(team.logoImgUrl, team.id, 'team') } : null;

    return <Image source={source} style={style.TeamLogo} />;
  };

  getMatchScore = match => {
    if (this.isFillerMatch(match)) return <Text style={[style.Score]}></Text>;

    const hasShootout = matchHasSootOut(match);

    return (
      <View style={style.ScoreView}>
        <View>
          <Text style={[style.Score]}>
            {match.status > 1 && match.status < 10
              ? (hasShootout ? match.visibleHomeScore : match.homeScore) +
                ' · ' +
                (hasShootout ? match.visibleVisitorScore : match.visitorScore)
              : '---'}
          </Text>
        </View>
        {hasShootout && <View style={style.Dote}></View>}
      </View>
    );
  };

  handlePress = () => {
    const p = this.props;
    const m = p.match;
    if (this.isFillerMatch(m)) return;

    const idMatch = m.id;
    p.navigation.push('MatchDetails', { idMatch });
  };

  render() {
    const p = this.props;
    const { match } = p;
    if (!match) return null;

    const normalTeams = p.store.teams.normal;
    const homeTeam = normalTeams && normalTeams[match.idHomeTeam];
    const visitorTeam = normalTeams && normalTeams[match.idVisitorTeam];

    return (
      <View style={style.View}>
        <TouchableOpacity onPress={this.handlePress} style={null}>
          <Text style={[style.Touchable, style.Date]}>{getShortMatchDate(match.startTime)}</Text>
          <View style={style.Row}>
            {this.getTeamLogo(homeTeam)}
            {this.getTeamNameContent(match.idHomeTeam, homeTeam, match.homeTeamDescription, [
              style.Name,
              style.Left,
            ])}
            {this.getMatchScore(match)}
            {this.getTeamNameContent(match.idVisitorTeam, visitorTeam, match.visitorTeamDescription, [
              style.Name,
              style.Right,
            ])}
            {this.getTeamLogo(visitorTeam)}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  View: {
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: gColors.tableHeaderBack,
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
  },
  RestTeam: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  Rests: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    alignItems: 'center',
  },
  Date: {
    marginTop: 5,
    flex: 2.5,
    fontSize: 12,
    textAlign: 'center',
  },
  Name: {
    flex: 4,
  },
  Left: {
    //textAlign: 'center'
    textAlign: 'left',
    marginHorizontal: 10,
  },
  Right: {
    //textAlign: 'center'
    textAlign: 'right',
    marginHorizontal: 10,
  },
  Touchable: {
    color: gColors.touchableText,
    fontWeight: '600',
  },
  ScoreView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Score: {
    flex: 1.3,
    fontWeight: '800',
    fontSize: 16,
    color: gColors.text1,
    textAlign: 'center',
  },
  TeamLogo: {
    width: 30,
    height: 30,
  },
  Dote: {
    backgroundColor: 'green',
    height: 5,
    width: 5,
    borderRadius: 100,
    marginBottom: 5,
    marginLeft: 2,
  },
});

export default withNavigation(MatchListItem);
