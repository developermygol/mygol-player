import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SectionHead from '../../components/common/SectionHead';
import { Localize } from '../../components/locale/Loc';
import DataTable from '../../components/common/DataTable';
import { gColors, GS } from '../../GlobalStyles';

class PlayerStats extends Component {

    getAdaptedRow = (name, value, style) => {
        return { name: Localize(name), shortName: Localize(name + '.Short'), value, shortNameStyle: style };
    }

    adaptPlayerDayResults = (dr) => {
        if (!dr) return null;

        return [
            this.getAdaptedRow('GamesPlayed', dr.gamesPlayed, style.shortDefault),
            this.getAdaptedRow('GamesWon', dr.gamesWon, style.gamesWon),
            this.getAdaptedRow('GamesDraw', dr.gamesDraw, style.gamesDraw),
            this.getAdaptedRow('GamesLost', dr.gamesLost, style.gamesLost),
            this.getAdaptedRow('Points', dr.points, style.shortDefault),
            this.getAdaptedRow('CardsType1', dr.cardsType1, style.cardsType1),
            this.getAdaptedRow('CardsType2', dr.cardsType2, style.cardsType2),
        ];
    }

    render() {
        const p = this.props;
        if (!p.data) return null;

        return (
            <View style={{ alignSelf: 'stretch' }}>
                <SectionHead title={Localize('PlayerStats')} />

                <View style={GS.box.card}>
                    <DataTable
                        columns={[
                            { id: 1, fieldName: 'shortName', style: style.shortDefault, styleField: 'shortNameStyle' },
                            { id: 2, fieldName: 'name', style: style.nameDefault },
                            { id: 3, fieldName: 'value', style: style.valueDefault, styleField: 'shortNameStyle' },
                        ]}
                        dataKeyField='shortName'
                        data={this.adaptPlayerDayResults(p.data.dayResultSummary)}
                        style={style.DataTable}
                        hideHeader={true}
                    />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    gamesWon: { color: gColors.gamesWon, flex: 1 },
    gamesDraw: { color: gColors.gamesDraw, flex: 1 },
    gamesLost: { color: gColors.gamesLost, flex: 1 },
    cardsType1: { color: gColors.cardsType1, flex: 1 },
    cardsType2: { color: gColors.cardsType2, flex: 1 },
    shortDefault: { flex: 1, textAlign: 'center', color: gColors.text1 },
    nameDefault: { flex: 8, textAlign: 'left', color: gColors.text1 },
    valueDefault: { textAlign: 'center', color: gColors.text1 },
});

export default PlayerStats;