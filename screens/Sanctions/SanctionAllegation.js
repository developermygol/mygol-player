import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { gColors } from '../../GlobalStyles';
import { getFormattedDateTime } from '../../components/Utils';
import { Localize } from '../../components/locale/Loc';

class SanctionAllegation extends Component {

    getAllegationTitle = (al) => {
        const userName = (al.user && (al.user.name + ' - ')) || '';
        const level = al.idUser >= 10000000 ? 5 : 1;
        const date = getFormattedDateTime(al.date);

        return userName + Localize('UserLevel' + level) + ' - ' + date;
    }

    render() {
        const p = this.props;
        const al = p.allegation;


        return (
            <View style={[style.View, p.style]}>
                <Text style={style.Title}>{this.getAllegationTitle(al)}</Text>
                <Text style={style.Value}>{al.content}</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        marginVertical: 5
    },
    Title: {
        fontSize: 14,
        color: gColors.text1,
        paddingBottom: 5
    },
    Value: {
        fontSize: 12,
        color: gColors.text2,

    }
});

export default SanctionAllegation;