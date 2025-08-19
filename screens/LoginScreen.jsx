import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { fonts } from '../utils/fonts'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native'
import FontAwesome6 from '@react-native-vector-icons/fontawesome6'
import InputFieldComponent from '../components/InputFieldComponent'


export default function LoginScreen() {
  const navigation = useNavigation()
  const [secureEntry, setSecureEntry] = useState(true)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    let errors = {}
    if (!email.trim())
      errors.email = 'Email is required'
    if(!password.trim())  
      errors.password = 'Password is required'
    if(!emailRegex.test(email.trim()))
      errors.email = 'Enter a valid email'

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const backTapped = () => {
    navigation.goBack()
    console.log('back tapped')
  }

  const loginTapped = () => {
    if(validateForm()) {
      console.log('login success')
      setEmail('')
      setPassword('')
      setErrors({})
    }
    else {
      console.log(errors.email)
    }

  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={backTapped}>
        <FontAwesome6 name="circle-left" size={30} color={colors.primary} />
      </TouchableOpacity>
      <View>
        <Text style={styles.titleText}>Hey,</Text>
        <Text style={styles.titleText}>Welcome Back</Text>
      </View>
      <View style={styles.formContainer}>
        <InputFieldComponent placeholder='Enter your email' keyboardType='email-address' value={email} onChangeText={setEmail}/>
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        <View style={styles.inputContainer}>
          <TextInput style={styles.textInput} placeholder='Enter your Password' secureTextEntry={secureEntry} value={password} onChangeText={setPassword}/>
          <TouchableOpacity onPress={() => {setSecureEntry((prev) => {!prev})}}>
            <FontAwesome6 name="eye" size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={loginTapped}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleText: {
    marginTop: 10,
    fontSize: 32,
    fontFamily: fonts.SemiBold,
    marginLeft: 5,
  },
  backButtonWrapper: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 5,
    size: 30
  },
  formContainer:{
    marginTop: 20,
    height: 60
  },
  inputContainer: {
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginVertical: 10
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    height: 50,
    fontFamily: fonts.Light
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.Bold,
    textAlign: 'center',
    padding: 10,
    height: 50,
  },
  errorText: {
    fontStyle: 'italic',
    color: 'red',
    marginLeft: 30,
  }
})