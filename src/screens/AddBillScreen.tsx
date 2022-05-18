import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View, TextInput, TouchableOpacity, Keyboard, Alert, DatePickerIOSBase, DatePickerAndroid, DatePickerIOSComponent } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { loginStyles } from "../theme/loginTheme";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

interface Props extends StackScreenProps<any, any> {}

const AddBillScreen = ({ navigation }: Props) => {

  const { setData } = useLocalStorage();
  const [ billName, billAmount, billDate ] = useState("");

  const onRegister = () => {
     setData("Gasto", billName, billAmount, billDate);
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
            <Text style={ loginStyles.title }>Agregar Gasto</Text>
            <Text style={ loginStyles.label }>Detalle del gasto:</Text>
            <TextInput
              placeholder="Ingrese el detalle del gasto:"
              placeholderTextColor="rgba(255,255,255,0.4)"
              underlineColorAndroid="white"
              style={[
                loginStyles.inputField,
                ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
              ]}
              selectionColor="white"

              value={ billName }

              autoCapitalize="words"
              autoCorrect={ false }
            />

            <Text style={ loginStyles.label }>Monto gastado:</Text>
            <TextInput
              placeholder="Ingrese el monto gastado:"
              placeholderTextColor="rgba(255,255,255,0.4)"
              underlineColorAndroid="white"
              style={[
                loginStyles.inputField,
                ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
              ]}
              selectionColor="white"

              value={ billAmount }

              autoCorrect={ false }
            />

            <Text style={ loginStyles.label }>Fecha del gasto:</Text>
            <DatePickerIOSComponent
              value={ billDate }
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              style={styles.inputField}
            ></DatePickerIOSComponent>

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

export default AddBillScreen;