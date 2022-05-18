import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext, useEffect } from "react";
import { KeyboardAvoidingView, Platform, Text, View, TextInput, TouchableOpacity, Keyboard, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { loginStyles } from "../theme/loginTheme";

interface Props extends StackScreenProps<any, any> {}

const RegisterScreen = ({ navigation }: Props) => {

  const { signUp, errorMessage, removeError } = useContext( AuthContext );

  const { email, password, name, onChange } = useForm({
    name: '',
    email: '',
    password: '' 
  });

  useEffect(() => {
      if( errorMessage.length === 0 ) return;

      Alert.alert( 'Registro incorrecto', errorMessage,[{
          text: 'Ok',
          onPress: removeError
      }]);

  }, [ errorMessage ])

  const onRegister = () => {
      console.log({email, password, name});
      Keyboard.dismiss();
      signUp({
          name: name,
          email: email,
          password
      });
  }

  return (
    <>
        <KeyboardAvoidingView
          style={{ flex:1, backgroundColor: '#5856D6' }}
          behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
        >
          <View style={ loginStyles.formContainer }>

            {/* Formulario de registro */}
            <Text style={ loginStyles.title }>Registro</Text>
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

              //onchange, value
              onChangeText={ (value) => onChange(value, 'name') }
              value={ name }
              onSubmitEditing={ onRegister }

              autoCapitalize="words"
              autoCorrect={ false }
            />
            <Text style={ loginStyles.label }>Email:</Text>
            <TextInput
              placeholder="Ingrese su email:"
              placeholderTextColor="rgba(255,255,255,0.4)"
              keyboardType="email-address"
              underlineColorAndroid="white"
              style={[
                loginStyles.inputField,
                ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
              ]}
              selectionColor="white"

              //onchange, value
              onChangeText={ (value) => onChange(value, 'email') }
              value={ email }
              onSubmitEditing={ onRegister }

              autoCapitalize="none"
              autoCorrect={ false }
            />

            <Text style={ loginStyles.label }>Contraseña:</Text>
            <TextInput
              placeholder="************"
              placeholderTextColor="rgba(255,255,255,0.4)"
              underlineColorAndroid="white"
              secureTextEntry={ true }
              style={[
                loginStyles.inputField,
                ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
              ]}
              selectionColor="white"

              //onchange, value
              onChangeText={ (value) => onChange(value, 'password') }
              value={ password }
              onSubmitEditing={ onRegister }

              autoCapitalize="none"
              autoCorrect={ false }
            />

            {/* Register Button */}
            <View style={ loginStyles.buttonContainer }>
              <TouchableOpacity
              activeOpacity={ 0.8 }
              style={ loginStyles.button }
              onPress={ onRegister }
              >
                <Text style={ loginStyles.buttonText }>Crear cuenta</Text>
              </TouchableOpacity>
            </View>

            {/* Volver al inicio de sesion */}
            <TouchableOpacity
              onPress={ () => navigation.replace('LoginScreen') }
              activeOpacity={ 0.8 }
              style={ loginStyles.buttonReturnLogin  }
            >
              <Text style={ loginStyles.buttonText }>Volver al Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
    </>
  )
}

export default RegisterScreen;