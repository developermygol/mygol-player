import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LeagueClassification from './LeagueClassification';
import KnockoutClassification from './KnockoutClassification';

class StageClassification extends Component {

    render() {
        const p = this.props;
        const { stage } = p;
        if (!stage) return null;

        return (
            <View style={style.View}>
                {/* <Text>{stage.name}</Text>
                <Text>Select league or knockout classification</Text> */}
                {stage.type === 1 ?
                    <LeagueClassification stage={stage} />
                    : 
                    <KnockoutClassification stage={stage} />
                }
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        flex: 1
    }
});

export default StageClassification;