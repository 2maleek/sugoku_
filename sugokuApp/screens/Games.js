import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default function Games(props) {
  
  const name = props.route.params.name
  const level = props.route.params.level

  const [board, setBoard] = useState([])
  const [answer, setAnswer] = useState([])
  let temp = []
  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

  function solve() {
    const data = { board: board }
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(res => res.json())
      .then(result => {
          setBoard(result.solution)
      })
      .catch(console.warn)
  }
  function validateAnswer() {
    const data = { board: answer }
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(res => res.json())
      .then(result => {
        Alert.alert(
          "Unsolved",
          "Continue ?",
          [
            {
              text: "Exit",
              onPress: () => props.navigation.navigate('Home'),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
        // console.log(result)
        // if (result.status === 'unsolved' ) {
        //   alert('Unsolved: Try again!')
        // } else {
        //   props.navigation.navigate('Finish', { name, isWin: true })
        // }
      })
      .catch(console.warn)
  }

  function changeAnswerValue(row, col, val) {
    let temp = board
    temp[row][col] = val
    setAnswer(temp)
  }
  useEffect(() => {
    fetch('https://sugoku.herokuapp.com/board?difficulty='.concat(level))
    .then(res => res.json())
    .then(data => {
      setBoard(data.board)
      setAnswer(data.board)
    })

  }, [])

  return (
    <View style={styles.container}>
      <Text>Level : {level}</Text>

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
      <View style={{flexDirection: "row"}}>
        <Button
          onPress={solve}
          title="Solve"
          color="#841584"
        />

        <Button
          onPress={validateAnswer}
          title="Validate"
          color="blue"
        />
      </View>
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