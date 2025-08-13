import { FlatList, StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import React from 'react'

const DropdownComponent = (props) => {
  return (
    <View style={styles.dropdownArea}> 
        <Text style={styles.titleText}>{props.dropdownTitle}</Text>
        <FlatList scrollEnabled ={false} data={props.data} renderItem={({item,index}) => {
            return (
                <TouchableOpacity style={styles.countryItem} onPress={() => {
                        props.setSelectedCountry(item.name);
                        props.setIsClicked(false)
                      }}>
                {(props.currentSelectedItem === item.name) ? (<Image source={require('../assets/fonts/images/checkmark.png')} style={styles.logo} />) : (<Image style={styles.logo}/>)}
                <Text style={styles.countryItemText}>{item.name}</Text>
                        
                        
                </TouchableOpacity>
                )
            }}/>
    </View>
  )
}

export default DropdownComponent

const styles = StyleSheet.create({
    dropdownArea: {
    width: '100%',
    // height: 300,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    elevation: 5,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20
  },
  countryItem: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderBottomColor: '#8e8e8e',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10

  },
  countryItemText: {
    flex: .8,
  },
  logo: {
    flex: .07,
    height: 20,
    width: 20,
    marginRight: 5,
  },
})