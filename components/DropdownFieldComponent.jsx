import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { fonts } from '../utils/fonts'

const DropdownFieldComponent = (props) => {
  return (
    <View style={styles.inputContainer}>
        <Text style={styles.text}>{props.selectedCountry}</Text>
        <TouchableOpacity onPress={() => props.setIsClicked(!props.isClicked)}>
            {props.isClicked ? (
                <Image
                    source={require('../assets/fonts/images/upload.png')}
                    style={styles.icon}
                  />
                ) : (
                <Image
                    source={require('../assets/fonts/images/dropdown.png')}
                    style={styles.icon}
                  />
                )}
        </TouchableOpacity>
    </View>
  )
}

export default DropdownFieldComponent

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
    text: {
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: fonts.Light,
        textAlign: 'left',
        justifyContent: 'center',
        alignItems: 'center'
      },
    icon: {
        width: 24,
        height: 24,
    },
})