import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { GS, gColors } from '../../GlobalStyles';
import SectionHead from '../../components/common/SectionHead';
import { Localize } from '../../components/locale/Loc';
import DataTable from '../../components/common/DataTable';
import { getFormattedDate } from '../../components/Utils';

class TeamSanctions extends Component {
  handleDatePress = sanction => {
    this.props.navigation.navigate('SanctionDetails', { idSanction: sanction.id });
  };

  renderDate = (row, col) => {
    return (
      <TouchableOpacity key={col.id} style={styles.StartDate} onPress={() => this.handleDatePress(row)}>
        <Text style={styles.TouchableText}>{getFormattedDate(row.startDate)}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    if (!this.props.sanctions || this.props.sanctions.length === 0) return null;

    return (
      <View style={{ alignSelf: 'stretch' }}>
        <SectionHead title={Localize('Sanctions.Team.All')} />
        <View style={GS.box.card}>
          <DataTable
            columns={[
              {
                id: 1,
                title: Localize('Sanctions.Date'),
                fieldName: 'startDate',
                renderHandler: this.renderDate,
                style: styles.StartDate,
                headerStyle: styles.StartDate,
              },
              //{ id: 2, title: Localize('Sanctions.NumMatches'), fieldName: 'numMatches', style: styles.NumMatches, headerStyle: styles.NumMatches },
              {
                id: 3,
                title: Localize('Sanctions.Status'),
                fieldName: 'status',
                style: styles.Status,
                headerStyle: styles.Status,
                valueAdapter: v => Localize('SanctionStatus' + v),
              },
            ]}
            dataKeyField="id"
            data={this.props.sanctions}
            style={styles.DataTable}
            hideHeader={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  View: {},
  TouchableText: {
    fontWeight: '600',
    color: gColors.touchableText,
  },
  DataTable: {
    paddingRight: 5,
  },
  StartDate: {
    paddingVertical: 5,
  },
  NumMatches: {
    flex: 1,
  },
  Status: {
    flex: 3,
    paddingVertical: 5,
    paddingLeft: 19,
  },
});

export default withNavigation(TeamSanctions);
