import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext, useEffect } from "react";
import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity } from "react-native";
import { Background } from "../components/Background";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { loginStyles } from "../theme/loginTheme";

interface Props extends StackScreenProps<any, any> {}

const LoginScreen = ({ navigation }: Props) => {

  const { signIn, errorMessage, removeError } = useContext( AuthContext );

  const { email, password, onChange } = useForm({
      email: '',
      password: '' 
  });

  useEffect(() => {
      if( errorMessage.length === 0 ) return;

      Alert.alert( 'Login incorrecto', errorMessage,[{
          text: 'Ok',
          onPress: removeError
      }]);

  }, [ errorMessage ])

  const onLogin = () => {
      console.log({email, password});
      Keyboard.dismiss();
      signIn({ email: email, password });
  }

  return (
    <>
        {/* Background */}
        <Background />

        <KeyboardAvoidingView
          style={{ flex:1 }}
          behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
        >
          <View style={ loginStyles.formContainer }>

            {/* Keyboard avoid view */}
            <Text style={ loginStyles.title }>Login</Text>
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
              onSubmitEditing={ onLogin }

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
              onSubmitEditing={ onLogin }

              autoCapitalize="none"
              autoCorrect={ false }
            />

            {/* Login Button */}
            <View style={ loginStyles.buttonContainer }>
              <TouchableOpacity
              activeOpacity={ 0.8 }
              style={ loginStyles.button }
              onPress={ onLogin }
              >
                <Text style={ loginStyles.buttonText }>Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>

            {/* Crear cuenta */}
            <View style={ loginStyles.newUserContainer }>
              <TouchableOpacity
                activeOpacity={ 0.8 }
                onPress={ () => navigation.replace('RegisterScreen') }
              >
                <Text style={ loginStyles.buttonText }>Crear cuenta </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
    </>
  )
}

export default LoginScreen;