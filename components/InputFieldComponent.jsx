import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { fonts } from '../utils/fonts'

const InputFieldComponent = (props) => {
  return (
    <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder= {props.placeholder}
                keyboardType={props.keyboardType}
                value={props.value}
                onChangeText={props.onChangeText}
                secureTextEntry={props.secureTextEntry}
              />
    </View>
  )
}

export default InputFieldComponent

const styles = StyleSheet.create({
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
        marginVertical: 10,
        justifyContent: 'center',
        height: 50
      },
      textInput: {
        flex: 1,
        paddingHorizontal: 10,
        height: 50,
        fontFamily: fonts.Light,
      }
})