import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { observable, flow } from '../../node_modules/mobx';
import { requestAsync, getClipEllipsis, jsonParse } from '../../components/Utils';
import axios from '../../axios';
import { observer } from '../../node_modules/mobx-react';
import { groupBy } from '../../components/Data';
import InfoBox from '../../components/common/InfoBox';
import { inject } from '../../node_modules/mobx-react/native';
import DataTable from '../../components/common/DataTable';
import { gColors } from '../../GlobalStyles';
import { Localize } from '../../components/locale/Loc';
import { withNavigation } from 'react-navigation';
import FsSpinner from '../../components/common/FsSpinner';
import ErrorBox from '../../components/common/ErrorBox';

export const GroupClassification = withNavigation(
  class GroupClass extends Component {
    adaptRow = (result, normalTeams) => {
      let team = normalTeams && normalTeams[result.idTeam];
      if (!team) team = { name: Localize('Team.NoTournamentContext') };
      return { ...result, name: team.name, logoImgUrl: team.logoImgUrl };
    };

    handleTeamPress = teamDayResult => {
      this.props.navigation.push('TeamDetails', { idTeam: teamDayResult.idTeam });
    };

    renderTeamName = (row, col) => {
      return (
        <TouchableOpacity key={col.id} style={style.teamName} onPress={() => this.handleTeamPress(row)}>
          <Text style={style.TouchableText}>{row.name}</Text>
        </TouchableOpacity>
      );
    };

    renderRank = (row, col, index, stage) => {
      const colorConfig = stage.colorConfig ? jsonParse(stage.colorConfig) : null;
      const position = index + 1;
      let colorAssigned = null;

      if (colorConfig) {
        const assignedColorConfig = colorConfig.find(c => position >= c.start && position <= c.end);
        if (assignedColorConfig) colorAssigned = assignedColorConfig.color;
      }

      if (colorAssigned) {
        return (
          <>
            <View style={{ backgroundColor: colorAssigned, flexBasis: 5 }} />
            <View style={{ flex: 1, marginLeft: 5 }}>
              <Text
                key={col.id}
                numberOfLines={1}
                ellipsizeMode={getClipEllipsis()}
                style={style.valueImportant}
              >
                {index + 1}
              </Text>
            </View>
          </>
        );
      }

      return (
        <Text key={col.id} numberOfLines={1} ellipsizeMode={getClipEllipsis()} style={style.valueImportant}>
          {index + 1}
        </Text>
      );
    };

    render() {
      const p = this.props;
      const { group } = p;
      if (!group) return null;

      const { normalTeams } = p;

      return (
        <DataTable
          columns={[
            {
              id: 1,
              fieldName: 'rank',
              title: '#',
              headerStyle: style.headerDefault,
              renderHandler: (row, col, index) => this.renderRank(row, col, index, this.props.stage),
            },
            {
              id: 2,
              fieldName: 'name',
              title: group.name,
              headerStyle: style.headerTeamName,
              renderHandler: this.renderTeamName,
            },
            {
              id: 10,
              fieldName: 'tournamentPoints',
              title: Localize('TournamentPoints.Short'),
              headerStyle: style.headerDefault,
              style: style.valueDefault,
            },
            {
              id: 3,
              fieldName: 'gamesPlayed',
              title: Localize('GamesPlayed.Short'),
              headerStyle: style.headerDefault,
              style: style.valueDefault,
            },
            {
              id: 4,
              fieldName: 'gamesWon',
              title: Localize('GamesWon.Short'),
              headerStyle: [style.headerDefault, style.gamesWon],
              style: style.valueDefault,
            },
            {
              id: 5,
              fieldName: 'gamesDraw',
              title: Localize('GamesDraw.Short'),
              headerStyle: [style.headerDefault, style.gamesDraw],
              style: style.valueDefault,
            },
            {
              id: 6,
              fieldName: 'gamesLost',
              title: Localize('GamesLost.Short'),
              headerStyle: [style.headerDefault, style.gamesLost],
              style: style.valueDefault,
            },
            {
              id: 7,
              fieldName: 'points',
              title: Localize('Points.Short'),
              headerStyle: style.headerDefault,
              style: style.valueDefault,
            },
            {
              id: 8,
              fieldName: 'pointsAgainst',
              title: Localize('PointsAgainst.Short'),
              headerStyle: style.headerDefault,
              style: style.valueDefault,
            },
            {
              id: 9,
              fieldName: 'pointDiff',
              title: Localize('PointDiff.Short'),
              headerStyle: style.headerDefault,
              style: style.valueDefault,
            },
          ]}
          dataKeyField="name"
          data={group.grouped.map(r => this.adaptRow(r, normalTeams))}
          style={style.DataTable}
        />
      );
    }
  }
);

@inject('store')
@observer
class LeagueClassification extends Component {
  @observable loading = false;
  @observable error = null;
  @observable classification = null;

  componentDidMount = flow(function* () {
    const { stage } = this.props;
    if (!stage) return null;

    this.classification = yield requestAsync(
      this,
      axios.get,
      null,
      '/tournaments/stageclassification/' + stage.id
    );
  });

  adaptTeamListToClassification = stage => {
    // Just add an idTeam to each field
    return this.props.store.teamGroups.all.filter(tg => tg.idStage === stage.id);
  };

  render() {
    if (this.error) return <ErrorBox msg={this.error} />;
    if (!this.classification) return <FsSpinner lMsg="Loading league classification" />;

    const p = this.props;
    const { stage } = p;
    const stageGroups = p.store.groups.forStage(stage.id);

    let { leagueClassification } = this.classification;
    if (!leagueClassification || leagueClassification.length === 0)
      leagueClassification = this.adaptTeamListToClassification(stage);

    const groups = groupBy(leagueClassification, stageGroups, 'id', 'idGroup');
    if (!groups || groups.length === 0) return <InfoBox lMsg="Error.NoGroupsInStage" />;

    if (groups.length === 1)
      return (
        <ScrollView>
          <GroupClassification group={groups[0]} normalTeams={p.store.teams.normal} stage={stage} />
        </ScrollView>
      );

    return (
      <ScrollView>
        {groups.map(group => {
          return (
            <View key={group.id}>
              <GroupClassification group={group} normalTeams={p.store.teams.normal} />
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  View: {},
  DataTable: {
    paddingRight: 5,
  },
  TouchableText: {
    fontWeight: '600',
    color: gColors.touchableText,
  },

  valueImportant: {
    flex: 1,
    flexWrap: 'nowrap',
    textAlign: 'right',
    paddingHorizontal: 5,
    color: gColors.text1,
  },

  valueDefault: {
    flex: 1,
    flexWrap: 'nowrap',
    fontSize: 10,
    textAlign: 'right',
    paddingHorizontal: 5,
    color: gColors.text1,
  },
  headerDefault: {
    textAlign: 'right',
    paddingHorizontal: 5,
    color: gColors.text1,
  },
  teamName: {
    flex: 8,
  },
  headerTeamName: {
    flex: 8,
    fontWeight: '600',
    color: gColors.text1,
  },

  gamesPlayed: { color: gColors.gamesPlayed },
  gamesWon: { color: gColors.gamesWon },
  gamesDraw: { color: gColors.gamesDraw },
  gamesLost: { color: gColors.gamesLost },
});

export default LeagueClassification;
