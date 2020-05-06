import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image
} from 'react-native';

export default function Finish(props) {
  const name = props.route.params.name

  function toHome() {
    props.navigation.navigate('Home')
  }
   return (
     <View style={styles.container}>
       <Text style={styles.greet}>Horaaaayyyy!!!</Text>
       <Text style={styles.text}>{name} You Won</Text>
       <Button
          onPress={toHome}
          title="Home"
          color="blue"
        />
     </View>
   )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f46271',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
  },
  text: {
      fontSize: 30, color: '#04063c'
  },
  greet: {
    fontSize: 50,
    color: 'yellow',
  },
})