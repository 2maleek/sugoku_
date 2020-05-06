import React from 'react';
import {
  StyleSheet, Text, View, Button
} from 'react-native'

export default function HowToPlay(props) {
  return (
    <View style={style.container}>
      <Text> Jadi gini bro cR mainnya</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f46271',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  }
})