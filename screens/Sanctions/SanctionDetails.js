import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { inject } from 'mobx-react/native';
import { observer } from 'mobx-react';
import {withNavigation} from 'react-navigation';
import FsSpinner from '../../components/common/FsSpinner';
import { getFormattedDate, getFormattedDateTime } from '../../components/Utils';
import { observable } from 'mobx';
import InfoBox from '../../components/common/InfoBox';
import { gMetrics } from '../../GlobalStyles';
import OutputField from '../../components/common/OutputField';
import { Localize } from '../../components/locale/Loc';
import SectionHead from '../../components/common/SectionHead';
import SanctionAllegation from './SanctionAllegation';

@inject('store') @observer
class SanctionDetails extends Component {

    static navigationOptions = {
        title: Localize('Sanction')
    }

    @observable noIdProp = false;

    componentDidMount = () =>{
        const idSanction = this.props.navigation.getParam('idSanction');
        if (!idSanction) {
            this.noIdProp = true;
            return;
        }

        this.props.store.sanctions.actions.get(idSanction);
    }



    render() {
        if (this.noIdProp) return <View style={{flex: 1}}><InfoBox lMsg='Sanction.NoSanction' /></View>

        const p = this.props;
        const idSanction = p.navigation.getParam('idSanction');
        const sanction = p.store.sanctions.current;

        if (!sanction || sanction.id !== idSanction) return <FsSpinner lMsg='Loading sanction details'/>        

        return (
            <ScrollView style={style.View}>
                <View style={style.Details}>
                    <SectionHead title={Localize('Details')} />
                    <View style={style.Horizontal}>
                        <OutputField style={style.Field} title={'Sanctions.Date'} value={getFormattedDate(sanction.startDate)} />
                        <OutputField style={style.Field} title={'Sanctions.Status'} value={Localize('SanctionStatus' + sanction.status)} />
                        <OutputField style={style.Field} title={'Sanctions.NumMatches'} value={sanction.numMatches} />
                        <OutputField style={style.Field} title={'Player'} value={sanction.player && (sanction.player.name + ' ' + sanction.player.surname)} />
                        <OutputField style={style.Field} title={'Team'} value={sanction.team && (sanction.team.name)} />
                        <OutputField style={style.Field} title={'Tournament'} value={sanction.tournament && (sanction.tournament.name)} />
                    </View>

                    <SectionHead title={Localize('Sanction.Allegations')} />
                    {sanction.allegations && sanction.allegations.map(a => <SanctionAllegation allegation={a} key={a.id} />)}
                </View>
                
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    View: {
        flex: 1, 
    },
    FieldImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    Details: {
        flex: 1,
        padding: gMetrics.screenPadding
    },
    Horizontal: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },  
    Field: {
        marginRight: 20
    },
});

export default withNavigation(SanctionDetails);