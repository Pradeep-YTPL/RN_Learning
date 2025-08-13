import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, FlatList, Modal } from 'react-native'
import React, {useState } from 'react'
import { fonts } from '../utils/fonts'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native'
import {FontAwesome6} from '@react-native-vector-icons/fontawesome6'
import DatePicker from 'react-native-date-picker'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DropdownComponent from '../components/DropdownComponent'
import InputFieldComponent from '../components/InputFieldComponent'
import countriesList from '../utils/countries.json'
import statesList from '../utils/states.json'
import DropdownFieldComponent from '../components/DropdownFieldComponent'


const countries = countriesList
const states = statesList
export default function SignUpScreen() {
  const navigation = useNavigation()
  const [selectedCountry, setSelectedCountry] = useState('Select Country')
  const [isClicked, setIsClicked] = useState(false)
  const [data, setData] = useState(countries)

  //states
  const [selectedState, setSelectedState] = useState('Select State')
  const [isStatesClicked, setStatesIsClicked] = useState(false)
  const [statesData, setStatesData] = useState(states)

  const [secureEntry, setSecureEntry] = useState(true)
  //date
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  //image
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const currentCountrySet = value => {
    setSelectedCountry(value);
    console.log(value);
  };

  const currentStateSet = value => {
    setSelectedState(value);
    console.log(value);
  };

  const backTapped = () => {
    navigation.goBack()
    console.log('back tapped')
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={backTapped}>
        <FontAwesome6 name="circle-left" size={30} color={colors.primary} />
      </TouchableOpacity>
      <View>
        <Text style={styles.titleText}>Let's, Get Started</Text>
      </View>
      {/* form */}
      <View style={styles.formContainer}>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.previewImage} />
            ) : (
              <View style={styles.placeHolderContainer}>
                <FontAwesome6 name="image" size={25} color={colors.secondary} />
                <Text style={styles.placeholderText}>Select Image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <InputFieldComponent placeholder={"Enter your email"} keyboardType={"email-address"}/>
        <InputFieldComponent placeholder={"Enter your first name"} keyboardType={"default"}/>
        <InputFieldComponent placeholder={"Enter your last name"} keyboardType={"default"}/>
        <InputFieldComponent placeholder={"Enter your phone number"} keyboardType={"phone-pad"}/>
        <InputFieldComponent placeholder={"Enter your password"} keyboardType={"phone-pad"} secureTextEntry={true}/>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            secureTextEntry={secureEntry}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry(prev => {
                !prev;
              });
            }}
          >
          <FontAwesome6 name="eye" size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>{date.toDateString()}</Text>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <FontAwesome6
              name="calendar-check"
              size={20}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
        {/* country dropdown */}
        <DropdownFieldComponent selectedCountry={selectedCountry} isClicked={isClicked} setIsClicked={setIsClicked}/>
        <Modal visible={isClicked} onRequestClose={setIsClicked}  presentationStyle='formSheet'>
          <DropdownComponent data={data} setSelectedCountry={currentCountrySet} setIsClicked={setIsClicked} currentSelectedItem={selectedCountry} dropdownTitle={"Select Country"}/>
        </Modal>
        
        
        <DropdownFieldComponent selectedCountry={selectedState} isClicked={isStatesClicked} setIsClicked={setStatesIsClicked}/>
        <Modal visible={isStatesClicked} onRequestClose={setStatesIsClicked}  presentationStyle='formSheet'>
          <DropdownComponent data={statesData} setSelectedCountry={currentStateSet} setIsClicked={setStatesIsClicked} currentSelectedItem={selectedState} dropdownTitle={"Select State"}/>
        </Modal>

        <TouchableOpacity
          style={styles.signUpButtonWrapper}
          onPress={backTapped}
        >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    size: 30,
    color: colors.primary
  },
  formContainer:{
    marginTop: 20,
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
    marginVertical: 10,
    justifyContent: 'center',
    height: 50
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    height: 50,
    fontFamily: fonts.Light,
  },
  text: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
  },
  signUpText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.Bold,
    textAlign: 'center',
    padding: 10,
    height: 50,
  },
  imagePicker: {
    width: '30%',
    height: 100,
    backgroundColor: '#FAF6E9',
    borderRadius: '45%',
    borderWidth: 1,
    borderColor: '#F0BB78',
    overflow: 'hidden'
  },
  previewImage: {
    width: '100%',
    height: '100%'
  },
  placeHolderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderText: {
    color: '#393E46',
    marginTop: 8
  },
  imageContainer: {
    alignItems: 'center'
  }
})