import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { inject, observer } from '../../node_modules/mobx-react/native';
import { Localize } from '../../components/locale/Loc';
import DataTable from '../../components/common/DataTable';
import { withNavigation } from 'react-navigation';
import { gColors, GS } from '../../GlobalStyles';
@inject('store')
@observer
class ScorersRanking extends Component {
  goToPlayer = row => {
    const p = this.props;
    p.navigation.push('PlayerDetails', {
      idUser: row.idUser,
      idTeam: row.idTeam,
      idTournament: p.store.tournaments.current.id,
    });
  };

  goToTeam = team => {
    const p = this.props;
    p.navigation.push('TeamDetails', { idTeam: team.id });
  };

  getRank = (row, col, i) => {
    return (
      <Text style={style.Rank} key={col.id} style={{ flex: 1, textAlign: 'center' }}>
        {i + 1}
      </Text>
    );
  };

  getPlayerName = (row, col, i) => {
    return (
      <TouchableOpacity onPress={() => this.goToPlayer(row)} key={col.id} style={{ flex: 5 }}>
        <Text style={style.PlayerName}>{row.playerName + ' ' + row.playerSurname}</Text>
      </TouchableOpacity>
    );
  };

  getTeam = (row, col, normalTeams) => {
    if (!normalTeams)
      return (
        <Text key={col.id} style={{ flex: 4 }}>
          {Localize('Team.NoTournamentContext')}
        </Text>
      );

    const team = normalTeams[row.idTeam];
    if (!team)
      return (
        <Text key={col.id} style={{ flex: 4 }}>
          {Localize('Team.NoTeamInTournament')}
        </Text>
      );

    return (
      <TouchableOpacity onPress={() => this.goToTeam(team)} key={col.id} style={{ flex: 4 }}>
        <Text style={style.TeamName}>{team.name}</Text>
      </TouchableOpacity>
    );
  };

  // 🚧💥🚧
  getSpecialData = (row, col) => {
    let value = '';
    switch (this.props.type) {
      case 'goalkeepers':
        value = row.pointsAgainst; //this.props.data.pointsAgainst;
        break;
      case 'assitances':
        value = row.assistances; //this.props.data.assistances;
        break;
      case 'mvps':
        value = row.mvpPoints; //this.props.data.mvpPoints;
        break;
      case 'scorers':
      default:
        value = row.points; //this.props.data.points;
        break;
    }

    return (
      <Text key={col.id} style={{ flex: 1, textAlign: 'center' }}>
        {value}
      </Text>
    );
  };

  getSpecialTitle = () => {
    switch (this.props.type) {
      case 'goalkeepers':
        return 'GC';
      case 'assitances':
        return 'As.';
      case 'mvps':
        return 'Pts.';
      case 'scorers':
      default:
        return 'GF';
    }
  };

  render() {
    const p = this.props;
    const normalTeams = p.store.teams.normal;

    return (
      <View style={style.Container}>
        <ScrollView>
          <DataTable
            columns={[
              { id: 1, headerStyle: style.Header1, title: Localize('Rank'), renderHandler: this.getRank },
              //   {
              //     id: 2,
              //     headerStyle: style.Header1,
              //     title: Localize('Points.Short'),
              //     style: style.Points,
              //     fieldName: 'points',
              //   },
              {
                id: 2,
                headerStyle: style.Header1,
                title: this.getSpecialTitle(),
                renderHandler: (row, col) => this.getSpecialData(row, col),
              },
              {
                id: 3,
                headerStyle: { flex: 5 },
                title: Localize('Player'),
                renderHandler: this.getPlayerName,
              },
              {
                id: 4,
                headerStyle: { flex: 4 },
                title: Localize('Team'),
                renderHandler: (row, col) => this.getTeam(row, col, normalTeams),
              },
            ]}
            data={p.data}
            stlye={style.Table}
            dataKeyField="idPlayer"
          />
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  View: {
    flex: 1,
  },
  Container: {
    flex: 1,
  },
  Table: {},
  Header1: {
    flex: 1,
    textAlign: 'center',
  },
  Rank: {
    textAlign: 'center',
  },
  Points: {
    textAlign: 'center',
  },
  PlayerName: {
    fontWeight: '600',
    color: gColors.touchableText,
  },
  TeamName: {
    fontWeight: '600',
    color: gColors.touchableText,
  },
});

export default withNavigation(ScorersRanking);
