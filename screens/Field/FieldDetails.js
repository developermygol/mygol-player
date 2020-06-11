import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { inject } from '../../node_modules/mobx-react/native';
import { observer } from '../../node_modules/mobx-react';
import {withNavigation} from 'react-navigation';
import FsSpinner from '../../components/common/FsSpinner';
import { getUploadsIcon } from '../../components/Utils';
import Button from '../../components/common/Button';
import { observable } from '../../node_modules/mobx';
import InfoBox from '../../components/common/InfoBox';
import { gMetrics } from '../../GlobalStyles';
import OutputField from '../../components/common/OutputField';
import openMaps from '../../components/common/MapLinking';
import { Localize } from '../../components/locale/Loc';

@inject('store') @observer
class FieldDetails extends Component {

    static navigationOptions = {
        title: Localize('Field')
    }

    @observable noIdProp = false;

    componentDidMount = () =>{
        const idField = this.props.navigation.getParam('idField');
        if (!idField) {
            this.noIdProp = true;
            return;
        }

        this.props.store.facilities.actions.get(idField);
    }

    handlePress = (location, name) => {
        // Maps deep link to location

        const ll = location.split(',');
        if (ll.length !== 2) return;

        const latitude = ll[0].trim();
        const longitude = ll[1].trim();
        openMaps({latitude, longitude, zoomLevel: 17, query: name});
    }

    render() {
        if (this.noIdProp) return <View style={{flex: 1}}><InfoBox lMsg='Field.NoField' /></View>

        const p = this.props;
        const idField = p.navigation.getParam('idField');
        const field = p.store.facilities.current;

        if (!field || field.id !== idField) return <FsSpinner lMsg='Loading field details'/>        

        const imgSrc = getUploadsIcon(field.imgUrl, field.id, 'field');

        return (
            <View style={style.View}>
                <Image style={style.FieldImage} source={{uri: imgSrc}} />
                <View style={style.Details}>
                    <OutputField style={style.Name} title={'Field.Name'} value={field.name} />
                    <OutputField style={style.Description} title={'Field.Description'} value={field.description} />
                    <OutputField style={style.Address} title={'Field.Address'} value={field.address} />
                    {field.location ? <Button style={style.Button} title={'How to arrive'} onPress={() => this.handlePress(field.location, field.name)} /> : null}
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    View: {
        flex: 1.5, 
    },
    FieldImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    Details: {
        flex: 1,
        padding: gMetrics.screenPadding
    },
    Name: {},
    Description: {},
    Address: {},
    Button: {
        marginTop: 10
    }
});

export default withNavigation(FieldDetails);