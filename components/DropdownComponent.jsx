import { FlatList, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const DropdownComponent = (props) => {
  return (
    <View style={styles.dropdownArea}> 
        <FlatList scrollEnabled ={false} data={props.data} renderItem={({item,index}) => {
            return (
                <TouchableOpacity style={styles.countryItem} onPress={() => {
                        props.setSelectedCountry(item.country);
                        props.setIsClicked(false)
                      }}>
                        <Text>{item.country}</Text>
                </TouchableOpacity>
                )
            }}/>
    </View>
  )
}

export default DropdownComponent

const styles = StyleSheet.create({
    dropdownArea: {
    width: '90%',
    height: 300,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center'
  },
  countryItem: {
    width: '80%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#8e8e8e',
    alignSelf: 'center'
  }
})