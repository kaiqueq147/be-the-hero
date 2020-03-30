import React from 'react';

import { View, Linking, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';


import styles from './styles';
import logoimg from '../../assets/logo.png';


export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident
    const message = `Olá ${incident.name} estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de ${incident.value}`

    function navigateBack(){
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAynsc({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body:  message,
        })
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
       
        
    }

    return (
        <View style={styles.container}>
             <View style={styles.header}>
                <Image source={logoimg} />
                <TouchableOpacity onPress={navigation.goBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                    <Text style={styles.incidentProperty, { marginTop: 0}}>ONG</Text>
                    <Text style={styles.incidentValue}>{incident.name} de {incident.city} / {incident.uf}</Text>

                    <Text style={styles.incidentProperty}>CASO</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR</Text>
                    <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL' 
                            }).format(incident.value)}
                        </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroesTitle}>Salve o dia</Text>
                <Text style={styles.heroesTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre um contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} OnPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} OnPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>    
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
}