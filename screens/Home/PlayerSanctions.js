import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { GS, gColors } from '../../GlobalStyles';
import SectionHead from '../../components/common/SectionHead';
import { Localize } from '../../components/locale/Loc';
import DataTable from '../../components/common/DataTable';
import { getFormattedDate } from '../../components/Utils';


class PlayerSanctions extends Component {

    handleDatePress = (sanction) => {
        this.props.navigation.navigate('SanctionDetails', { idSanction: sanction.id });
    }

    renderDate = (row, col) => {
        return (
            <TouchableOpacity key={col.id} style={style.StartDate} onPress={() => this.handleDatePress(row)}>
                <Text style={style.TouchableText}>{getFormattedDate(row.startDate)}</Text>
            </TouchableOpacity>
        )
    }


    render() {
        const p = this.props;

        if (!p.sanctions || p.sanctions.length === 0) return null;

        return (
            <View style={{ alignSelf: 'stretch' }}>
                <SectionHead title={Localize('Sanctions.Player.All')} />

                <View style={GS.box.card}>
                    <DataTable
                        columns={[
                            { id: 1, title: Localize('Sanctions.Date'), fieldName: 'startDate', renderHandler: this.renderDate, style: style.StartDate, headerStyle: style.StartDate },
                            //{ id: 2, title: Localize('Sanctions.NumMatches'), fieldName: 'numMatches', style: style.NumMatches, headerStyle: style.NumMatches },
                            { id: 3, title: Localize('Sanctions.Status'), fieldName: 'status', style: style.Status, headerStyle: style.Status, valueAdapter: v => Localize('SanctionStatus' + v) },
                        ]}
                        dataKeyField='id'
                        data={p.sanctions}
                        style={style.DataTable}
                        hideHeader={true}
                    />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        
    },
    TouchableText: {
        fontWeight: '600',
        color: gColors.touchableText
    },
    DataTable: {
        paddingRight: 5
    },
    StartDate: {
        paddingVertical: 5
    },
    NumMatches:  {
        flex: 1
    },
    Status:  {
        flex: 3,
        paddingVertical: 5,
        paddingLeft: 19
    }

});

export default withNavigation(PlayerSanctions);