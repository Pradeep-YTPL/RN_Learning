import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../utils/colors'
import { fonts } from '../utils/fonts'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation()

    const handleLogin = () => {
        navigation.navigate("Login")
    }

    const handleSignUp = () => {
        navigation.navigate("SignUp")
    }
  return (
    <View style={styles.container}>
      <Image source={require('../assets/fonts/images/logo.png')} style={styles.logo} />
      <Image
        source={require('../assets/fonts/images/manImage.png')}
        style={styles.manImage}
      />
      <Text style={styles.title}>Lorem ipsum dolor.</Text>
      <Text style={styles.subTitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore 
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.loginButtonWrapper,
            { backgroundColor: colors.primary },
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButtonWrapper, { backgroundColor: colors.white }]} onPress={handleSignUp}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );             
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center"
    },
    logo: {
        height: 40,
        width: 140,
        marginVertical: 30
    },
    manImage: {
        marginVertical: 20,
        height: 250,
        width: 231
    },
    title: {
        fontSize: 36,
        fontFamily: fonts.SemiBold,
        color: colors.primary,
        marginTop:10,
        paddingHorizontal: 20
    },
    subTitle: {
        fontSize: 13,
        fontFamily: fonts.Medium,
        color: colors.secondary,
        marginTop:40,
        marginHorizontal: 20,
        width: 292,
        height: 60,
        textAlign: 'center'
    },
    buttonsContainer: {
        marginTop:40,
        width: "90%",
        height:60,
        borderColor: colors.primary,
        borderWidth: 2,
        borderRadius: 100,
        flexDirection: 'row',
        
    },
    loginButtonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        borderRadius: 98,
    },
    loginButtonText: {
        color: colors.white,
        fontSize: 18,
        fontFamily: fonts.Bold
    },
    signupButtonText: {
        fontSize: 18,
        fontFamily: fonts.Bold
    }
})