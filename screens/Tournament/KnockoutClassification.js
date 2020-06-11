import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { inject } from 'mobx-react/native';
import { observer } from 'mobx-react';
import { observable, flow } from 'mobx';
import ErrorBox from '../../components/common/ErrorBox';
import FsSpinner from '../../components/common/FsSpinner';
import InfoBox from '../../components/common/InfoBox';
import { groupBy } from '../../components/Data';
import { requestAsync } from '../../components/Utils';
import axios from '../../axios';
import Loc from '../../components/locale/Loc';
import MatchList from '../Match/MatchList';
import { gColors, GS } from '../../GlobalStyles';

// @observer
// class KnockoutMatch extends Component {
//     render() {
//         const p = this.props;
//         const { match, normalTeams } = p;

//         if (!match) return <View style={style.Empty} />

        

//         return (
//             <View style={style.Match}>

//             </View>
//         )
//     }
// }

// @observer
// class KnockoutDay extends Component {
//     render() {
//         const p = this.props;
//         const  { day, normalTeams } = p;        

//         return (
//             <View style={style.Day}>
//                 <Text style={style.DayTitle}>{day.name}</Text>
//                 {day.matches && day.matches.map(match => {
//                     return <KnockoutMatch key={match && match.id} match={match} normalTeams={normalTeams} />
//                 })}
//             </View>
//         )
//     }
// }


@observer
class KnockoutGroup extends Component {
    render() {
        const p = this.props;
        const { group, normalTeams } = p;

        if (!group.grouped) return;

        return <MatchList days={group.grouped} isFlatMatchList={false} showDaySeparator={true} />

        // return (
        //     <View style={style.Group}>
        //         {group.grouped.map(day => {
        //             return <KnockoutDay key={day.id} day={day} normalTeams={normalTeams} />
        //         })}
        //     </View>
        // )
    }
}

@inject('store') @observer
class KnockoutClassification extends Component {
    @observable loading = false;
    @observable error = null;
    @observable classification = null;

    componentDidMount = flow(function *() {
        const { stage } = this.props;
        if (!stage) return null;

        this.classification = yield requestAsync(this, axios.get, null, '/tournaments/stageclassification/' + stage.id);
    })

    adaptTeamListToClassification = (stage) => {
        // Just add an idTeam to each field
        return this.props.store.teamGroups.all.filter(tg => tg.idStage === stage.id);
    }

    render() {
        if (this.error) return <ErrorBox msg={this.error} />;
        if (!this.classification) return <FsSpinner lMsg='Loading league classification' />

        const p = this.props;
        const { stage } = p;
        const stageGroups = p.store.groups.forStage(stage.id);
    
        let { knockoutClassification } = this.classification;
        if (!knockoutClassification || knockoutClassification.length === 0) knockoutClassification = this.adaptTeamListToClassification(stage);

        const groups = groupBy(knockoutClassification, stageGroups, 'id', 'idGroup');
        if (!groups || groups.length === 0) return <InfoBox lMsg='Error.NoGroupsInStage' />

        if (groups.length === 1) return (
            <ScrollView>
                <KnockoutGroup group={groups[0]} normalTeams={p.store.teams.normal} />
            </ScrollView>
        );

        return (
            <ScrollView>
               {groups.map(group => {
                   return (
                       <View key={group.id}>
                            <Text style={[style.GroupTitle, GS.font.title2]}>{group.name}</Text>
                           <KnockoutGroup group={group} normalTeams={p.store.teams.normal} />
                       </View>
                   )
               })}
           </ScrollView>
       )
    }
}

const style = StyleSheet.create({
    View: {
        flex: 1
    }, 
    Group: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    Day: {
        flex: 1,
        backgroundColor: '#BBB'
    },
    Match: {

    },
    Empty: {

    },
    GroupTitle: {
        backgroundColor: gColors.listTitleBackground,
        color: gColors.text1,
        textAlign: 'center',
        paddingVertical: 5
    }
});

export default KnockoutClassification;