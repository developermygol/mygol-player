import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { inject } from '../../node_modules/mobx-react';
import { observer } from '../../node_modules/mobx-react/native';
import FsSpinner from '../../components/common/FsSpinner';
import InfoBox from '../../components/common/InfoBox';
import { GroupClassification } from './LeagueClassification';
import { gColors } from '../../GlobalStyles';

@inject('store') @observer
class PlainTeamList extends Component {

    adaptTeamsToGroup = (teams) => {
        return {
            grouped: teams.map(team => ({ idTeam: team.id }))
        }
    }

    render() {
        const p = this.props;
        const teams = p.store.teams.all;

        if (!teams) return <FsSpinner lMsg='Loading teams' />
        if (teams.length === 0) return <InfoBox lMsg='Tournament.NoTeams' />

        const groupData = this.adaptTeamsToGroup(teams);

        return (
            <ScrollView style={style.View}>
                <GroupClassification group={groupData} normalTeams={p.store.teams.normal} />
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    View: {
        flex: 1, 
        backgroundColor: gColors.background
    }
});

export default withNavigation(PlainTeamList);