import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getShortMatchDate } from '../../components/Utils';
import { Localize } from '../../components/locale/Loc';
import { gColors } from '../../GlobalStyles';
import { withNavigation } from 'react-navigation';


class MatchStatus extends Component {

    handleGoToField = (idField) => {
        const n = this.props.navigation;
        n.push('FieldDetails', { idField });
    }

    render() {
        const p = this.props;
        const {match} = p;
        if (!match) return null;

        return (
            <View style={[style.View, p.style]}>
                <Text style={style.Day}>{match.day ? match.day.name : null}</Text>
                {match.status > 2 ? 
                    <View style={style.Scores}>
                        <Text style={style.Score}>{match.homeScore} · {match.visitorScore}</Text>
                    </View>
                    : 
                    <Text style={style.NoScore}>---</Text>
                }
                <Text style={style.Date}>{getShortMatchDate(match.startTime)}</Text>
                <Text style={style.Status}>{Localize('MatchStatus' + match.status)}</Text>
                
                {match.field ? 
                    <TouchableOpacity onPress={() => this.handleGoToField(match.field.id)} style={style.Button}>
                        <Text style={style.TouchableField}>{match.field.name}</Text>
                    </TouchableOpacity>
                    :
                    // <Text style={style.Field}>{Localize('Match.NoField')}</Text>
                    null
                }
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        alignItems: 'center',
        paddingVertical: 10
    },
    Scores: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        padding: 2, 
        marginBottom: 5
    },
    // Score: {
    //     padding: 5,
    //     fontSize: 30,
    //     fontWeight: '900',
    //     color: '#FFF',
    //     borderColor: '#ddd',
    //     borderWidth: 1, 
    //     borderRadius: 5,
    //     backgroundColor: '#333',
    // }, 
    Score: {
        padding: 5,
        paddingTop: 10,
        fontSize: 36,
        fontWeight: '800',
        textAlign: 'center',
        color: gColors.headText1
    }, 
    NoScore: {

    },
    Date: {
        color: gColors.headText1, 
        fontWeight: '600'
    },
    Status: {
        marginVertical: 5,
        color: gColors.headText1,
        fontSize: 12
    },
    Field: {
        textAlign: 'center',
        color: gColors.headText1
    },
    Day: {
        color: gColors.headText1,
        paddingBottom: 5
    },
    Button: {
        marginVertical: 5,
        borderRadius: 8, 
        borderWidth: 1, 
        borderColor: gColors.headText2,
        padding: 3,
    },
    TouchableField: {
        color: gColors.headText2,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center'
    }
});

export default withNavigation(MatchStatus);