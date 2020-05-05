import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [board, setBoard] = useState([])

  useEffect(() => {
    fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
    .then(res => res.json())
    .then(data => {
      setBoard(data.board)
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text>Game Board</Text>

      <View style={styles.boxes}>
        { board.map((row, i) => {
          return (
            <View key={i} style={styles.column}>
              { row.map((col, j) => {
                if(col > 0) {
                  return <Text style={styles.box}>{col}</Text>
                }else {
                return <TextInput style={styles.box} keyboardType="number-pad" maxLength={1}>{col}</TextInput>
                }
              })}
            </View>
          )
        })}
      <Text>Setelah loop</Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 40,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center'
  },
  column: {
    display: 'flex',
    flexDirection: 'row'
  },
  boxes: {
    margin: 20,
  }
});