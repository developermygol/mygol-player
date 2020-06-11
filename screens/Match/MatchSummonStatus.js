import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class MatchSummonStatus extends Component {

    render() {
        const p = this.props;

        return (
            <View style={style.View}>
                <Text style={{textAlign: 'center'}}>Estado de la convocatoria del jugador para este partido (si participa en él). Con el contexto del usuario actual. Si no lo hay, entonces, no mostrar nada.</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        marginVertical: 10
    }
});

export default MatchSummonStatus;