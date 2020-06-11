import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, SectionList } from 'react-native';
import InfoBox from '../../components/common/InfoBox';
import { gColors } from '../../GlobalStyles';
import MatchListItem from './MatchListItem';
import FsSpinner from '../../components/common/FsSpinner';
import { inject, observer } from 'mobx-react';
import { findByIdInArray } from '../../components/Data';

@inject('store') @observer
class MatchList extends Component {

    adaptDaysToSections = (days) => {
        const stages = this.props.store.stages.all;

        return days.slice().map((day) => {
            if (!day) return null;

            let title = day.name;

            if (stages && stages.length > 1) {
                const stage = findByIdInArray(stages, day.idStage);
                if (stage) title += ' - ' + stage.name;
            }

            const data = (day.matches && day.matches.length > 0) ? day.matches.slice() : [];
            return ({ title, data });
        });
    }

    adaptMatchesToSections = (matches) => {
        return matches.slice().map((match) => ({ title: '', data: [ match ] }));
    }

    render() {
        const p = this.props;
        const { days, showDaySeparator, isFlatMatchList } = p;
        if (!days) return <FsSpinner lMsg='Loading matches list' />
        if (days.length === 0) return <InfoBox lMsg='Matches.NoMatches' />

        const sections = isFlatMatchList ? this.adaptMatchesToSections(days) : this.adaptDaysToSections(days);
        if (!sections || sections.length === 0) return <InfoBox lMsg='Matches.NoMatches' />

        return (
            <SectionList 
                sections={sections}
                renderItem={({item, index, section}) => <MatchListItem match={item} />}
                renderSectionHeader={showDaySeparator ? ({section}) => <Text style={style.SectionHeader}>{section.title}</Text> : null}
                keyExtractor={(item, i) => item.id}
                style={style.View}
            />
        )
    }
}

const style = StyleSheet.create({
    View: {
        backgroundColor: gColors.background,
    }, 
    SectionHeader: {
        backgroundColor: gColors.tableHeaderBack,
        fontWeight: '600',
        color: gColors.text1, 
        paddingVertical: 7,
        textAlign: 'center',
        marginBottom: 3
    }
});

export default MatchList;