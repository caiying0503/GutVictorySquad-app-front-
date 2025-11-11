import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';

export default function HistoryScreen({ navigation }) {
  const [records, setRecords] = useState([
    { date: '2025/08/07 21:00', frequency: 2, duration: 0.5, pitch: 50, result: 'abnormal' },
    { date: '2025/08/07 14:21', frequency: 3, duration: 1.2, pitch: 250, result: 'normal' },
    { date: '2025/08/06 21:01', frequency: 4, duration: 1.2, pitch: 250, result: 'normal' },
    { date: '2025/08/06 14:31', frequency: 4, duration: 1.2, pitch: 250, result: 'normal' },
    { date: '2025/08/06 09:41', frequency: 2, duration: 1.2, pitch: 250, result: 'normal' },
    { date: '2025/08/05 08:29', frequency: 3, duration: 1.2, pitch: 250, result: 'normal' },
    { date: '2025/08/04 18:13', frequency: 2, duration: 1.2, pitch: 250, result: 'normal' },
    { date: '2025/08/04 09:15', frequency: 5, duration: 1.2, pitch: 250, result: 'normal' },
    { date: '2025/08/03 13:00', frequency: 3, duration: 1.2, pitch: 250, result: 'normal' },
    { date: '2025/08/02 18:30', frequency: 1, duration: 1.2, pitch: 250, result: 'normal' },
    { date: '2025/08/02 09:30', frequency: 4, duration: 1.2, pitch: 250, result: 'normal' },
    { date: '2025/08/01 20:00', frequency: 2, duration: 1.2, pitch: 250, result: 'normal' },
    { date: '2025/08/01 14:00', frequency: 3, duration: 1.2, pitch: 250, result: 'normal' },
    { date: '2025/08/01 09:00', frequency: 2, duration: 1.2, pitch: 250, result: 'normal' },
  ]);

  const [showChart, setShowChart] = useState(false);

  const handleDelete = (index) => {
    const newRecords = [...records];
    newRecords.splice(index, 1);
    setRecords(newRecords);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
          {/* Back arrow */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../assets/arrow.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          {/* Text beside arrow */}
          <Text style={styles.headerText}>
            Red：large bowel / Blue：small bowel
          </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {records.map((r, idx) => {
          const boxColor = idx % 2 === 0 ? '#D4E2FF' : '#FEDBD7'; // 小腸音藍色、大腸音紅色
          return (
            <View
              key={idx}
              style={[
                styles.recordBox,
                { backgroundColor: boxColor },
              ]}
            >
              <Text style={styles.recordText}>{r.date}</Text>
              <Text style={styles.recordText}>Frequency: {r.frequency} /min</Text>
              <Text style={styles.recordText}>Time duration: {r.duration} sec</Text>
              <Text style={styles.recordText}>Pitch: {r.pitch} Hz</Text>
              <Text style={styles.recordText}>Result: {r.result}</Text>
              <TouchableOpacity onPress={() => handleDelete(idx)} style={styles.deleteBtn}>
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>X</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {/* Line Chart Button */}
        <TouchableOpacity
          style={styles.chartBtn}
          onPress={() => setShowChart(true)}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>Line Chart</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal to show chart */}
      <Modal
        visible={showChart}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require('../assets/demo-LineChart.png')} // <-- 先放圖1作 Demo
              style={{ width: 300, height: 400, resizeMode: 'contain' }}
            />
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowChart(false)}
            >
              <Text style={{ color: '#fff', fontSize: 18 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex:1,
    paddingTop: 20, 
    backgroundColor: '#fff3cc', 
  },
  backBtn: {
    position: 'absolute',
    top: 5,
    left: 15,
    zIndex: 10,
  },
    headerRow: {
    flexDirection: 'row',     
    alignItems: 'center',  
    marginBottom:'15'   

  },
  backBtn: {
    // marginRight: 3,          
  },
  headerText: {
    fontSize: 16,
    marginTop: 45,
    color: '#333',
  },
  backIcon: {
    width: 80,
    height: 30,
    marginTop:50,
    resizeMode: 'contain',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 15, 
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
  chartBtn: {
    backgroundColor: '#f39c12',
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  modalContainer: {
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent:'center',
    alignItems:'center',
  },
  modalContent: {
    backgroundColor:'#fff',
    borderRadius: 15,
    padding:20,
    alignItems:'center',
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: '#e74c3c',
    padding:10,
    borderRadius:10,
  },

});
