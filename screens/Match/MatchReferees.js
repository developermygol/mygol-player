import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { getUploadsIcon } from '../../components/Utils';
import { GS, gColors } from '../../GlobalStyles';
import InfoBox from '../../components/common/InfoBox';


class MatchReferee extends Component {

    
    render() {
        const p = this.props;
        const { referee } = p;
        if (!referee || !referee.referee) return null;

        const r = referee.referee;

        return (
            <View style={style.Referee}>
                <View style={style.IconWrapper}>
                    <Image source={{uri: getUploadsIcon(r.avatarImgUrl, r.id, 'user')}} style={style.Icon} />
                </View>
                {/* <TouchableOpacity onPress={this.handlePress}> */}
                <Text style={GS.font.small}>{r.name}</Text>
                 {/* </TouchableOpacity> */}
             </View>
        )
    }
}

class MatchReferees extends Component {
    render() {
        const p = this.props;
        const { referees } = p;
        if (!referees || referees.length === 0) return <InfoBox lMsg='Match.NoReferees' />
        
        return (
            <ScrollView contentContainerStyle={style.ContainerView}>
                {referees.map(referee => <MatchReferee key={referee.idUser} referee={referee} /> )}
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    ContainerView: {
        
    }, 
    Referee: {
        padding: 10, 
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: gColors.tableHeaderBack
    },
    IconWrapper: {
        backgroundColor: gColors.logoBackground,
        borderColor: gColors.logoBorder,
        borderWidth: 1,
        borderRadius: 25,
        marginRight: 10,
        overflow: 'hidden',
    },
    Icon: {
        width: 50, 
        height: 50,         
    }
});

export default MatchReferees;