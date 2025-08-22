import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView ,TouchableOpacity} from 'react-native';

export default function TestScreen({ navigation }) {
  const [frequency, setFrequency] = useState('--');
  const [duration, setDuration] = useState('--');
  const [pitch, setPitch] = useState('--');
  const [result, setResult] = useState('--');

  const handleStart = () => {
    // 這裡可以呼叫 GutSoundAnalyzer 進行分析，暫用模擬數值
    setFrequency(2);
    setDuration(0.5);
    setPitch('50 Hz (low)');
    setResult('abnormal');
  };

  const handleReset = () => {
    setFrequency('--');
    setDuration('--');
    setPitch('--');
    setResult('--');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bowel Sound Monitoring</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}><Text>Frequency</Text><Text>{frequency} /min</Text></View>
        <View style={styles.infoBox}><Text>Time duration</Text><Text>{duration} sec</Text></View>
        <View style={styles.infoBox}><Text>Pitch</Text><Text>{pitch} Hz</Text></View>
        <View style={styles.infoBox}><Text>Result</Text><Text style={{ color: result === 'abnormal' ? 'red' : 'black' }}>{result}</Text></View>
      </View>

      <View style={styles.waveform}><Text>Spectrum diagram</Text></View>

        <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]} onPress={handleStart}>
            <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, {backgroundColor: 'green'}]} onPress={handleReset}>
            <Text style={styles.buttonText}>RESET</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, {backgroundColor: 'gray'}]} onPress={() => navigation.navigate('History')}>
            <Text style={styles.buttonText}>HISTORY</Text>
        </TouchableOpacity>
        </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                      
    padding: 25,
    backgroundColor: '#fff3cc',
    justifyContent: 'flex-start',   
    alignItems: 'center',       
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    marginTop: 60,  
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  infoBox: {
    width: '48%',
    height: '100%',
    padding: 15,
    backgroundColor: '#add8e6',
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  waveform: {
    height: 150,
    backgroundColor: '#fff',
    marginBottom: 20,
    marginTop: 160, 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
  },
    buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    },

    button: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    },

    buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    },

});
