import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
} from 'react-native';

export default function Home(props) {

    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const [levelSelected, setLevelSelected] = useState(true)
    let buttonDisabled = true
    if (name === '') {
        buttonDisabled = true
    } else {
        buttonDisabled = false
    }

    const selectLevel = (lvl) => {
        setLevel(lvl)
        setLevelSelected(false)
        alert('kepincut select level')
    }
    const playButtonAction = () => {
        props.navigation.navigate('Games')
    }

    return (
        <View style={styles.container}>

            <Text style={styles.text}>Sudoku</Text>
            <View style={styles.inputText}>
                <TextInput placeholder="Input your name" onChangeText={(text) => setName(text)} style={{ fontSize: 13, color: '#04063c' }}></TextInput>
            </View>
            <View style={styles.buttonPlay}>
                <Button title="Easy" color="#04063c" disabled={buttonDisabled} onPress={() => { selectLevel('easy')}}></Button>
            </View>
            <View style={styles.buttonPlay}>
                <Button title="Medium" color="#04063c" disabled={buttonDisabled} onPress={() => { selectLevel('medium')}}></Button>
            </View>
            <View style={styles.buttonPlay}>
                <Button title="Hard" color="#04063c" disabled={buttonDisabled} onPress={() => { selectLevel('hard')}}></Button>
            </View>
            <View style={styles.buttonPlay}>
                <Button title="Play!" color="green" disabled={levelSelected} onPress={playButtonAction}></Button>
            </View>
        </View>

    );

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
    inputText: {
        backgroundColor: '#fff',
        marginTop: 20,
        width: 200, height: 30, paddingHorizontal: 10
    },
    buttonPlay: {
        marginTop: 20,
        width: 200, height: 30, fontSize: 15
    }
});