import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { Localize } from '../../components/locale/Loc';
import gStyles from '../../GlobalStyles';
import Button from '../../components/common/Button';


@inject('store') @observer
class Terms extends Component {
    static navigationOptions = {
        title: Localize('TermsScreenTitle'),
    }
    
    handleNextButton = () => {
        this.props.navigation.navigate('PersonalData');
    }

    render() {
        const p = this.props;

        return (
            <ScrollView>
                <View style={style.view}>
                    <Text style={style.terms}>{termsText}</Text>
                    <View>

                    </View>
                    <Button title='AcceptConditions' onPress={this.handleNextButton} style={gStyles.NextButton} />
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    view: {
        paddingLeft: 20,
        paddingRight: 20
    },
    terms: {
        textAlign: 'left',
        fontSize: 16
    }
});

export default Terms;



export const termsText = `
Puedes consultar el texto completo de las condiciones legales y la política de privacidad de MyGol en http://mygol.es/aviso_legal.php?id=avis, no obstante, a continuación te realizamos un resumen de la misma siguiendo las mejores prácticas:

1. RESPONSABLE

Technology Sports Management S.L.; NIF B-71330229; y dirección de contacto del Delegado de Protección de Datos tsm@tsmgroup.es.

2. EDAD MÍNIMA

Para registrarse y/o utilizar en la Aplicación debes tener, al menos, 14 años.

3. FINALIDAD DEL TRATAMIENTO

Technology Sports Management S.L. utilizará tus datos personales para poder facilitarte los servicios propios de la Aplicación, siendo el tratamiento necesario para la ejecución de un contrato en el que como interesado eres parte.

4. DESTINATARIOS DE CESIONES O TRANSFERENCIAS

Tus datos pueden ser cedidos, exclusivamente para las finalidades indicadas anteriormente a otras entidades con las que Technology Sports Management SL suscriba acuerdos de colaboración, respetando en todo caso la legislación española sobre protección de datos de carácter personal y sin necesidad de que le sea comunicada cada primera cesión que se efectúe a los referidos cesionarios.

5. TUS DERECHOS

Puede ejercitar sus derechos de acceso, rectificación, supresión, limitación y portabilidad en la dirección de correo electrónico tsm@tsmgroup.es, así como presentar una reclamación ante la AEPD.

6. PROCEDENCIA DE DATOS

Proceso de registro; uso de la APP`