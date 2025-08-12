import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React, {useState } from 'react'
import { fonts } from '../utils/fonts'
import { colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native'
import {FontAwesome6} from '@react-native-vector-icons/fontawesome6'
import DatePicker from 'react-native-date-picker'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DropdownComponent from '../components/DropdownComponent'

const countries = [
  {country: 'Afghanistan', code: '93', iso: 'AF'},
  {country: 'Albania', code: '355', iso: 'AL'},
  {country: 'Algeria', code: '213', iso: 'DZ'},
  {country: 'American Samoa', code: '1-684', iso: 'AS'},
  {country: 'Andorra', code: '376', iso: 'AD'},
  {country: 'Angola', code: '244', iso: 'AO'},
  {country: 'Anguilla', code: '1-264', iso: 'AI'},
  {country: 'Antarctica', code: '672', iso: 'AQ'},
  {country: 'Antigua and Barbuda', code: '1-268', iso: 'AG'},
  {country: 'Argentina', code: '54', iso: 'AR'},
  {country: 'Armenia', code: '374', iso: 'AM'},
  {country: 'Aruba', code: '297', iso: 'AW'},
  {country: 'Australia', code: '61', iso: 'AU'},
  {country: 'Austria', code: '43', iso: 'AT'},
  {country: 'Azerbaijan', code: '994', iso: 'AZ'},
  {country: 'Bahamas', code: '1-242', iso: 'BS'},
  {country: 'Bahrain', code: '973', iso: 'BH'},
  {country: 'Bangladesh', code: '880', iso: 'BD'},
  {country: 'Barbados', code: '1-246', iso: 'BB'},
  {country: 'Belarus', code: '375', iso: 'BY'},
  {country: 'Belgium', code: '32', iso: 'BE'},
  {country: 'Belize', code: '501', iso: 'BZ'},
  {country: 'Benin', code: '229', iso: 'BJ'},
  {country: 'Bermuda', code: '1-441', iso: 'BM'},
  {country: 'Bhutan', code: '975', iso: 'BT'},
  {country: 'Bolivia', code: '591', iso: 'BO'},
  {country: 'Bosnia and Herzegovina', code: '387', iso: 'BA'},
  {country: 'Botswana', code: '267', iso: 'BW'},
  {country: 'Brazil', code: '55', iso: 'BR'},
  {country: 'British Indian Ocean Territory', code: '246', iso: 'IO'},
  {country: 'British Virgin Islands', code: '1-284', iso: 'VG'},
  {country: 'Brunei', code: '673', iso: 'BN'},
  {country: 'Bulgaria', code: '359', iso: 'BG'},
  {country: 'Burkina Faso', code: '226', iso: 'BF'},
  {country: 'Burundi', code: '257', iso: 'BI'},
  {country: 'Cambodia', code: '855', iso: 'KH'},
  {country: 'Cameroon', code: '237', iso: 'CM'},
  {country: 'Canada', code: '1', iso: 'CA'},
  {country: 'Cape Verde', code: '238', iso: 'CV'},
  {country: 'Cayman Islands', code: '1-345', iso: 'KY'},
  {country: 'Central African Republic', code: '236', iso: 'CF'},
  {country: 'Chad', code: '235', iso: 'TD'},
  {country: 'Chile', code: '56', iso: 'CL'},
  {country: 'China', code: '86', iso: 'CN'},
  {country: 'Christmas Island', code: '61', iso: 'CX'},
  {country: 'Cocos Islands', code: '61', iso: 'CC'},
  {country: 'Colombia', code: '57', iso: 'CO'},
  {country: 'Comoros', code: '269', iso: 'KM'},
  {country: 'Cook Islands', code: '682', iso: 'CK'},
  {country: 'Costa Rica', code: '506', iso: 'CR'},
  {country: 'Croatia', code: '385', iso: 'HR'},
  {country: 'Cuba', code: '53', iso: 'CU'},
  {country: 'Curacao', code: '599', iso: 'CW'},
  {country: 'Cyprus', code: '357', iso: 'CY'},
  {country: 'Czech Republic', code: '420', iso: 'CZ'},
  {country: 'Democratic Republic of the Congo', code: '243', iso: 'CD'},
  {country: 'Denmark', code: '45', iso: 'DK'},
  {country: 'Djibouti', code: '253', iso: 'DJ'},
  {country: 'Dominica', code: '1-767', iso: 'DM'},
  {country: 'Dominican Republic', code: '1-809, 1-829, 1-849', iso: 'DO'},
  {country: 'East Timor', code: '670', iso: 'TL'},
  {country: 'Ecuador', code: '593', iso: 'EC'},
  {country: 'Egypt', code: '20', iso: 'EG'},
  {country: 'El Salvador', code: '503', iso: 'SV'},
  {country: 'Equatorial Guinea', code: '240', iso: 'GQ'},
  {country: 'Eritrea', code: '291', iso: 'ER'},
  {country: 'Estonia', code: '372', iso: 'EE'},
  {country: 'Ethiopia', code: '251', iso: 'ET'},
  {country: 'Falkland Islands', code: '500', iso: 'FK'},
  {country: 'Faroe Islands', code: '298', iso: 'FO'},
  {country: 'Fiji', code: '679', iso: 'FJ'},
  {country: 'Finland', code: '358', iso: 'FI'},
  {country: 'France', code: '33', iso: 'FR'},
  {country: 'French Polynesia', code: '689', iso: 'PF'},
  {country: 'Gabon', code: '241', iso: 'GA'},
  {country: 'Gambia', code: '220', iso: 'GM'},
  {country: 'Georgia', code: '995', iso: 'GE'},
  {country: 'Germany', code: '49', iso: 'DE'},
  {country: 'Ghana', code: '233', iso: 'GH'},
  {country: 'Gibraltar', code: '350', iso: 'GI'},
  {country: 'Greece', code: '30', iso: 'GR'},
  {country: 'Greenland', code: '299', iso: 'GL'},
  {country: 'Grenada', code: '1-473', iso: 'GD'},
  {country: 'Guam', code: '1-671', iso: 'GU'},
  {country: 'Guatemala', code: '502', iso: 'GT'},
  {country: 'Guernsey', code: '44-1481', iso: 'GG'},
  {country: 'Guinea', code: '224', iso: 'GN'},
  {country: 'Guinea-Bissau', code: '245', iso: 'GW'},
  {country: 'Guyana', code: '592', iso: 'GY'},
  {country: 'Haiti', code: '509', iso: 'HT'},
  {country: 'Honduras', code: '504', iso: 'HN'},
  {country: 'Hong Kong', code: '852', iso: 'HK'},
  {country: 'Hungary', code: '36', iso: 'HU'},
  {country: 'Iceland', code: '354', iso: 'IS'},
  {country: 'India', code: '91', iso: 'IN'},
  {country: 'Indonesia', code: '62', iso: 'ID'},
  {country: 'Iran', code: '98', iso: 'IR'},
  {country: 'Iraq', code: '964', iso: 'IQ'},
  {country: 'Ireland', code: '353', iso: 'IE'},
  {country: 'Isle of Man', code: '44-1624', iso: 'IM'},
  {country: 'Israel', code: '972', iso: 'IL'},
  {country: 'Italy', code: '39', iso: 'IT'},
  {country: 'Ivory Coast', code: '225', iso: 'CI'},
  {country: 'Jamaica', code: '1-876', iso: 'JM'},
  {country: 'Japan', code: '81', iso: 'JP'},
  {country: 'Jersey', code: '44-1534', iso: 'JE'},
  {country: 'Jordan', code: '962', iso: 'JO'},
  {country: 'Kazakhstan', code: '7', iso: 'KZ'},
  {country: 'Kenya', code: '254', iso: 'KE'},
  {country: 'Kiribati', code: '686', iso: 'KI'},
  {country: 'Kosovo', code: '383', iso: 'XK'},
  {country: 'Kuwait', code: '965', iso: 'KW'},
  {country: 'Kyrgyzstan', code: '996', iso: 'KG'},
  {country: 'Laos', code: '856', iso: 'LA'},
  {country: 'Latvia', code: '371', iso: 'LV'},
  {country: 'Lebanon', code: '961', iso: 'LB'},
  {country: 'Lesotho', code: '266', iso: 'LS'},
  {country: 'Liberia', code: '231', iso: 'LR'},
  {country: 'Libya', code: '218', iso: 'LY'},
  {country: 'Liechtenstein', code: '423', iso: 'LI'},
  {country: 'Lithuania', code: '370', iso: 'LT'},
  {country: 'Luxembourg', code: '352', iso: 'LU'},
  {country: 'Macao', code: '853', iso: 'MO'},
  {country: 'Macedonia', code: '389', iso: 'MK'},
  {country: 'Madagascar', code: '261', iso: 'MG'},
  {country: 'Malawi', code: '265', iso: 'MW'},
  {country: 'Malaysia', code: '60', iso: 'MY'},
  {country: 'Maldives', code: '960', iso: 'MV'},
  {country: 'Mali', code: '223', iso: 'ML'},
  {country: 'Malta', code: '356', iso: 'MT'},
  {country: 'Marshall Islands', code: '692', iso: 'MH'},
  {country: 'Mauritania', code: '222', iso: 'MR'},
  {country: 'Mauritius', code: '230', iso: 'MU'},
  {country: 'Mayotte', code: '262', iso: 'YT'},
  {country: 'Mexico', code: '52', iso: 'MX'},
  {country: 'Micronesia', code: '691', iso: 'FM'},
  {country: 'Moldova', code: '373', iso: 'MD'},
  {country: 'Monaco', code: '377', iso: 'MC'},
  {country: 'Mongolia', code: '976', iso: 'MN'},
  {country: 'Montenegro', code: '382', iso: 'ME'},
  {country: 'Montserrat', code: '1-664', iso: 'MS'},
  {country: 'Morocco', code: '212', iso: 'MA'},
  {country: 'Mozambique', code: '258', iso: 'MZ'},
  {country: 'Myanmar', code: '95', iso: 'MM'},
  {country: 'Namibia', code: '264', iso: 'NA'},
  {country: 'Nauru', code: '674', iso: 'NR'},
  {country: 'Nepal', code: '977', iso: 'NP'},
  {country: 'Netherlands', code: '31', iso: 'NL'},
  {country: 'Netherlands Antilles', code: '599', iso: 'AN'},
  {country: 'New Caledonia', code: '687', iso: 'NC'},
  {country: 'New Zealand', code: '64', iso: 'NZ'},
  {country: 'Nicaragua', code: '505', iso: 'NI'},
  {country: 'Niger', code: '227', iso: 'NE'},
  {country: 'Nigeria', code: '234', iso: 'NG'},
  {country: 'Niue', code: '683', iso: 'NU'},
  {country: 'North Korea', code: '850', iso: 'KP'},
  {country: 'Northern Mariana Islands', code: '1-670', iso: 'MP'},
  {country: 'Norway', code: '47', iso: 'NO'},
  {country: 'Oman', code: '968', iso: 'OM'},
  {country: 'Pakistan', code: '92', iso: 'PK'},
  {country: 'Palau', code: '680', iso: 'PW'},
  {country: 'Palestine', code: '970', iso: 'PS'},
  {country: 'Panama', code: '507', iso: 'PA'},
  {country: 'Papua New Guinea', code: '675', iso: 'PG'},
  {country: 'Paraguay', code: '595', iso: 'PY'},
  {country: 'Peru', code: '51', iso: 'PE'},
  {country: 'Philippines', code: '63', iso: 'PH'},
  {country: 'Pitcairn', code: '64', iso: 'PN'},
  {country: 'Poland', code: '48', iso: 'PL'},
  {country: 'Portugal', code: '351', iso: 'PT'},
  {country: 'Puerto Rico', code: '1-787, 1-939', iso: 'PR'},
  {country: 'Qatar', code: '974', iso: 'QA'},
  {country: 'Republic of the Congo', code: '242', iso: 'CG'},
  {country: 'Reunion', code: '262', iso: 'RE'},
  {country: 'Romania', code: '40', iso: 'RO'},
  {country: 'Russia', code: '7', iso: 'RU'},
  {country: 'Rwanda', code: '250', iso: 'RW'},
  {country: 'Saint Barthelemy', code: '590', iso: 'BL'},
  {country: 'Saint Helena', code: '290', iso: 'SH'},
  {country: 'Saint Kitts and Nevis', code: '1-869', iso: 'KN'},
  {country: 'Saint Lucia', code: '1-758', iso: 'LC'},
  {country: 'Saint Martin', code: '590', iso: 'MF'},
  {country: 'Saint Pierre and Miquelon', code: '508', iso: 'PM'},
  {country: 'Saint Vincent and the Grenadines', code: '1-784', iso: 'VC'},
  {country: 'Samoa', code: '685', iso: 'WS'},
  {country: 'San Marino', code: '378', iso: 'SM'},
  {country: 'Sao Tome and Principe', code: '239', iso: 'ST'},
  {country: 'Saudi Arabia', code: '966', iso: 'SA'},
  {country: 'Senegal', code: '221', iso: 'SN'},
  {country: 'Serbia', code: '381', iso: 'RS'},
  {country: 'Seychelles', code: '248', iso: 'SC'},
  {country: 'Sierra Leone', code: '232', iso: 'SL'},
  {country: 'Singapore', code: '65', iso: 'SG'},
  {country: 'Sint Maarten', code: '1-721', iso: 'SX'},
  {country: 'Slovakia', code: '421', iso: 'SK'},
  {country: 'Slovenia', code: '386', iso: 'SI'},
  {country: 'Solomon Islands', code: '677', iso: 'SB'},
  {country: 'Somalia', code: '252', iso: 'SO'},
  {country: 'South Africa', code: '27', iso: 'ZA'},
  {country: 'South Korea', code: '82', iso: 'KR'},
  {country: 'South Sudan', code: '211', iso: 'SS'},
  {country: 'Spain', code: '34', iso: 'ES'},
  {country: 'Sri Lanka', code: '94', iso: 'LK'},
  {country: 'Sudan', code: '249', iso: 'SD'},
  {country: 'Suriname', code: '597', iso: 'SR'},
  {country: 'Svalbard and Jan Mayen', code: '47', iso: 'SJ'},
  {country: 'Swaziland', code: '268', iso: 'SZ'},
  {country: 'Sweden', code: '46', iso: 'SE'},
  {country: 'Switzerland', code: '41', iso: 'CH'},
  {country: 'Syria', code: '963', iso: 'SY'},
  {country: 'Taiwan', code: '886', iso: 'TW'},
  {country: 'Tajikistan', code: '992', iso: 'TJ'},
  {country: 'Tanzania', code: '255', iso: 'TZ'},
  {country: 'Thailand', code: '66', iso: 'TH'},
  {country: 'Togo', code: '228', iso: 'TG'},
  {country: 'Tokelau', code: '690', iso: 'TK'},
  {country: 'Tonga', code: '676', iso: 'TO'},
  {country: 'Trinidad and Tobago', code: '1-868', iso: 'TT'},
  {country: 'Tunisia', code: '216', iso: 'TN'},
  {country: 'Turkey', code: '90', iso: 'TR'},
  {country: 'Turkmenistan', code: '993', iso: 'TM'},
  {country: 'Turks and Caicos Islands', code: '1-649', iso: 'TC'},
  {country: 'Tuvalu', code: '688', iso: 'TV'},
  {country: 'U.S. Virgin Islands', code: '1-340', iso: 'VI'},
  {country: 'Uganda', code: '256', iso: 'UG'},
  {country: 'Ukraine', code: '380', iso: 'UA'},
  {country: 'United Arab Emirates', code: '971', iso: 'AE'},
  {country: 'United Kingdom', code: '44', iso: 'GB'},
  {country: 'United States', code: '1', iso: 'US'},
  {country: 'Uruguay', code: '598', iso: 'UY'},
  {country: 'Uzbekistan', code: '998', iso: 'UZ'},
  {country: 'Vanuatu', code: '678', iso: 'VU'},
  {country: 'Vatican', code: '379', iso: 'VA'},
  {country: 'Venezuela', code: '58', iso: 'VE'},
  {country: 'Vietnam', code: '84', iso: 'VN'},
  {country: 'Wallis and Futuna', code: '681', iso: 'WF'},
  {country: 'Western Sahara', code: '212', iso: 'EH'},
  {country: 'Yemen', code: '967', iso: 'YE'},
  {country: 'Zambia', code: '260', iso: 'ZM'},
  {country: 'Zimbabwe', code: '263', iso: 'ZW'},
];

export default function SignUpScreen() {
  const navigation = useNavigation()
  const [selectedCountry, setSelectedCountry] = useState('Select Country')
  const [isClicked, setIsClicked] = useState(false)
  const [data, setData] = useState(countries)

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
        <View style={styles.inputContainer}>
          <FontAwesome6 name="envelope" size={25} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome6 name="circle-stop" size={25} color={colors.secondary} />
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
          <FontAwesome6 name="calendar" size={25} color={colors.secondary} />
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
        <View style={styles.inputContainer}>
          <Text style={styles.text}>{selectedCountry}</Text>
          <TouchableOpacity onPress={() => setIsClicked(!isClicked)}>
            {isClicked ? (
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
        {isClicked ? (
          <DropdownComponent data={data} setSelectedCountry={currentCountrySet} setIsClicked={setIsClicked}/>
          
          ) : null}

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
    // height: 60
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
    // height: 50,
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
    marginRight: 20
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
  },

  dropDownSelector: {
    width: '90%',
    height: 50,
  
  },
  icon: {
    width: 24,
    height: 24,
  },
  

})