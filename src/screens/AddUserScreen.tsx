import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View, TextInput, TouchableOpacity, Keyboard, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { loginStyles } from "../theme/loginTheme";

interface Props extends StackScreenProps<any, any> {}

const AddUserScreen = ({ navigation }: Props) => {

  const { setData } = useLocalStorage();
  const [ name ] = useState("");

  const onRegister = () => {
     setData("Usuarios", name);
     Alert.alert( 'Usuario agregado');
     navigation.navigate('HomeScreen');
  }

  return (
    <>
        <KeyboardAvoidingView
          style={{ flex:1, backgroundColor: '#5856D6' }}
          behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
        >
          <View style={ loginStyles.formContainer }>

            {/* Formulario de registro */}
            <Text style={ loginStyles.title }>Agregar Usuario</Text>
            <Text style={ loginStyles.label }>Nombre:</Text>
            <TextInput
              placeholder="Ingrese su nombre:"
              placeholderTextColor="rgba(255,255,255,0.4)"
              underlineColorAndroid="white"
              style={[
                loginStyles.inputField,
                ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
              ]}
              selectionColor="white"

              value={ name }

              autoCapitalize="words"
              autoCorrect={ false }
            />

            {/* Register Button */}
            <View style={ loginStyles.buttonContainer }>
              <TouchableOpacity
              activeOpacity={ 0.8 }
              style={ loginStyles.button }
              onPress={ onRegister }
              >
                <Text style={ loginStyles.buttonText }>Agregar</Text>
              </TouchableOpacity>
            </View>

            {/* Volver al Home */}
            <TouchableOpacity
              onPress={ () => navigation.navigate('HomeScreen') }
              activeOpacity={ 0.8 }
              style={ loginStyles.buttonReturnLogin  }
            >
              <Text style={ loginStyles.buttonText }>Volver al Home</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
    </>
  )
}

export default AddUserScreen;