import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HistoryScreen({ navigation }) {
  const [records, setRecords] = useState([
    { date: '2025/08/01', frequency: 2, duration: 0.5, pitch: 50, result: 'abnormal' },
    { date: '2025/07/10', frequency: 15, duration: 1.2, pitch: 250, result: 'normal' }
  ]);

  const handleDelete = (index) => {
    const newRecords = [...records];
    newRecords.splice(index, 1);
    setRecords(newRecords);
  };

  return (
    <View style={styles.container}>
      {/* Back arrow */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require('../assets/arrow.png')} // 確認你的 arrow.png 路徑
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {records.map((r, idx) => (
          <View key={idx} style={styles.recordBox}>
            <Text style={styles.recordText}>{r.date}</Text>
            <Text style={styles.recordText}>Frequency: {r.frequency} /min</Text>
            <Text style={styles.recordText}>Time duration: {r.duration} sec</Text>
            <Text style={styles.recordText}>Pitch: {r.pitch} Hz</Text>
            <Text style={styles.recordText}>Result: {r.result}</Text>
            <TouchableOpacity onPress={() => handleDelete(idx)} style={styles.deleteBtn}>
              <Text style={{ color: 'red', fontWeight: 'bold',fontSize:'20'}}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex:1,
    paddingTop: 60, 
    backgroundColor: '#fff3cc', 
  },
  backBtn: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  backIcon: {
    width: 80,
    height: 30,
    marginTop: '50',
    resizeMode: 'contain',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60, 
    alignItems: 'center',
  },
  recordBox: { 
    backgroundColor: '#add8e6', 
    padding: 20,         
    width: '95%',        
    borderRadius: 15,
    marginBottom: 15,
    position: 'relative',
  },
  recordText: {
    fontSize: 16,
    marginBottom: 3,
  },
  deleteBtn: { 
    position: 'absolute', 
    top: 15, 
    right: 20,
  },
});
