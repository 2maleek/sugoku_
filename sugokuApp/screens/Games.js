import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { greaterThan } from 'react-native-reanimated';

export default function Games() {
  const  data = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ]
  const [board, setBoard] = useState([])
  const [answer, setAnswer] = useState(data)
  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

  function solve() {
    const data = {board:[[0,0,0,0,0,0,8,0,0],[0,0,4,0,0,8,0,0,9],[0,7,0,0,0,0,0,0,5],[0,1,0,0,7,5,0,0,8],[0,5,6,0,9,1,3,0,0],[7,8,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0],[0,0,0,9,3,0,0,1,0],[0,0,5,7,0,0,4,0,3]]}

  
  }
  function changeAnswerValue(row, col, val) {
      console.log('asas')
      data[row][col] = val
      setAnswer(data)
  }
  useEffect(() => {
    fetch('https://sugoku.herokuapp.com/board?difficulty=random')
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
                  return <TextInput key={j} style={styles.fixbox} editable={false}>{col}</TextInput>
                }else {
                  return <TextInput key={j} style={styles.box} keyboardType="number-pad" maxLength={1} onChange={(e) => {changeAnswerValue(i, j , e.nativeEvent.text)}}></TextInput>
                }
              })}
            </View>
          )
        })}
      </View>
      <Button
        onPress={() => alert(answer)}
        title="Solve"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
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
  },
  box: {
    width: 40,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center'
  },
  fixbox: {
    width: 40,
    height: 40,
    backgroundColor: '#0F9828',
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
    backgroundColor: 'white'
  }
});