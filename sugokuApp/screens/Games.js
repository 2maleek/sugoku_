import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { useSelector, useDispatch} from 'react-redux'
import { getBoard, setAnswer } from '../store/actions/sugokuActions'

export default function Games(props) {
  
  const name = props.route.params.name
  const level = props.route.params.level

  const boards = useSelector(state => state.sugokuReducers.board)
  const answers = useSelector(state => state.sugokuReducers.answer)
  
  const dispatch = useDispatch()

  const [board, setBoard] = useState([])
  const [answer, setAnswer] = useState([])
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
          dispatch(setAnswer(result.solution))
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
        console.log(result.status)
        if (result.status === 'unsolved' ) {
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
        } else {
          props.navigation.navigate('Finish', { name, isWin: true })
        }
      })
      .catch(console.warn)
  }

  function changeAnswerValue(row, col, val) {
    let temp = board
    temp[row][col] = val
    setAnswer(temp)
  }
  useEffect(() => {
    // dispatch(getBoard(level))
    fetch('https://sugoku.herokuapp.com/board?difficulty='.concat(level))
    .then(res => res.json())
    .then(data => {
      setAnswer(data.board)
      setBoard(data.board)
    })

  }, [])

  return (
    <View style={styles.container}>
      <Text>Level : {level}</Text>

      <View style={styles.boxes}>
        { board ? board.map((row, i) => {
          return (
            <View key={i} style={styles.column}>
              { row.map((col, j) => {
                if(col > 0) {
                  return <TextInput key={j} style={styles.fixbox} editable={false}>{col}</TextInput>
                }else {
                return <TextInput key={j} style={styles.box} keyboardType="number-pad" maxLength={1} onChange={(e) => {changeAnswerValue(i, j , e.nativeEvent.text)}}>{answer[i][j] === 0 ? '' : answer[i][j] }</TextInput>
                }
              })}
            </View>
          )
        }) : () => { return <Text>Please Wait</Text>}}
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
      <Text></Text>
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