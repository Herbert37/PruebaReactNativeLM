import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext, useEffect } from "react";
import { KeyboardAvoidingView, Platform, Text, View, TextInput, TouchableOpacity, Keyboard, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { loginStyles } from "../theme/loginTheme";

interface Props extends StackScreenProps<any, any> {}

const BillScreen = ({ navigation }: Props) => {

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
            <Text style={ loginStyles.title }>Gastos</Text>
            <Text style={ loginStyles.label }>Categoria:</Text>
            <Text style={ loginStyles.label }>Descripcion:</Text>
            

            {/* Register Button */}
            <View style={ loginStyles.buttonContainer }>
              <TouchableOpacity
              activeOpacity={ 0.8 }
              style={ loginStyles.button }
              onPress={ onRegister }
              >
                <Text style={ loginStyles.buttonText }>Agregar gasto</Text>
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

export default BillScreen;