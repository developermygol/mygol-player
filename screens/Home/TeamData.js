import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TeamLogo from './TeamLogo';
import { gColors } from '../../GlobalStyles';
import { withNavigation } from 'react-navigation';
import { Localize } from '../../components/locale/Loc';
import ApparealDetail from '../../components/common/ApparealDetail';

class TeamData extends Component {
  handlePress = () => {
    const p = this.props;
    if (p.noLink) return;

    p.navigation.push('TeamDetails', { idTeam: p.data.id });
  };

  render() {
    const p = this.props;
    const team = this.props.data;
    const textStyle = p.textStyle || (large ? style.TeamNameLarge : style.TeamName);

    if (!team)
      return (
        <View style={[style.View, p.style]}>
          <Text style={[style.NoTeam, textStyle]}>{Localize('Team.NoTournamentContext')}</Text>;
        </View>
      );

    const large = p.large;
    const name = large ? team.name.toUpperCase() : team.name;

    return (
      <View style={[style.View, p.style]}>
        <TouchableOpacity onPress={this.handlePress} style={style.Wrapper}>
          <TeamLogo logoImgUrl={team.logoImgUrl} id={team.id} large={large} />
          <Text style={textStyle}>{name}</Text>
          {!p.noLink && <ApparealDetail team={team} />}
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  View: {
    paddingBottom: 10,
    justifyContent: 'center',
  },
  Wrapper: {
    alignItems: 'center',
  },
  NoTeam: {},
  TeamName: {
    paddingHorizontal: 10,
    fontSize: 20,
    color: gColors.text1,
    alignSelf: 'center',
    textAlign: 'center',
  },
  TeamNameLarge: {
    paddingHorizontal: 10,
    fontSize: 25,
    fontWeight: '900',
    color: gColors.text1,
    textAlign: 'center',
  },
});

export default withNavigation(TeamData);
