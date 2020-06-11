import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { gColors } from '../../GlobalStyles';
import TeamLogo from './TeamLogo';
import { Localize } from '../../components/locale/Loc';
import { findByIdInArray } from '../../components/Data';


class TeamDataDetailed extends Component {

    handlePress = () => {
        const p = this.props;
        if (p.noLink) return;

        const teamData = p.data;
        if (!teamData) return;

        p.navigation.push('TeamDetails', { idTeam: teamData.idTeam });
    }

    render() {
        const p = this.props;
        const teamData = p.data;
        if (!teamData) return <Text>{Localize('Team.NoTournamentContext')}</Text>;

        const team = teamData.team || findByIdInArray(p.teams, teamData.idTeam);
        if (!team) return <Text>{Localize('Team.NoTournamentContext')}</Text>;

        const large = p.large;
        const name = large ? team.name.toUpperCase() : team.name;

        const pos = teamData.fieldPosition;
        const sid = teamData.fieldSide;

        return (
            <View style={[style.View, p.style]}>
                <TouchableOpacity onPress={this.handlePress} style={style.Wrapper}>
                    <TeamLogo logoImgUrl={team.logoImgUrl} id={team.id} large={large} />
                    <Text style={large ? style.TeamNameLarge : style.TeamName}>{name}</Text>
                    <Text style={style.Position}>
                        {pos ? Localize('FieldPosition' + pos) : null} { sid ? '(' + Localize('FieldSide' + sid) + ')' : null}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        paddingBottom: 10
    },
    Wrapper: {
        alignItems: 'center'
    },
    TeamName: {
        fontSize: 20,
        color: gColors.text1,
        alignSelf: 'center',
        textAlign: 'center'
    },
    TeamNameLarge: {
        fontSize: 25, 
        fontWeight: '900',
        color: gColors.text1, 
        textAlign: 'center'
    }
});

export default withNavigation(TeamDataDetailed);