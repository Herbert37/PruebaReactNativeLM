import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext } from 'react'
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useRandomBanner } from '../hooks/useRandomBanner';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Props extends StackScreenProps<any, any> {}

const HomeScreen = ({ navigation }: Props) => {

    const { user, token, logOut } = useContext( AuthContext );

    const { getRandomBanner } = useRandomBanner();
    const { getDataObject } = useLocalStorage();

    return (
        <View style={ styles.container }>
            <Image 
                source={require(getRandomBanner)}
                style={{ justifyContent: 'flex-start', width: 40, height: 40 }} 
            />
            <Text style={ styles.title }>Usuarios</Text>

            <Text>
                { getDataObject }
            </Text>

            <Button 
                title="AgregarUsuario"
                color="#5856D6"
                onPress={ () => navigation.navigate('AddUserScreen') }
            />

            <Button 
                title="Cerrar sesion"
                color="#5856D6"
                onPress={ logOut }
            />

            <Image 
                source={require(getRandomBanner)}
                style={{ justifyContent: 'flex-end', width: 40, height: 40 }} 
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginBottom: 20
    }
});

export default HomeScreen;