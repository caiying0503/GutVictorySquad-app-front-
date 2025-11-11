import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { LineChart } from 'react-native-chart-kit';
import BowlSoundAnalyzer from '../services/BowlSoundAnalyzer';
import { Alert } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const MAX_POINTS = 300; // 頻譜圖最多顯示點數

export default function TestScreen({ navigation }) {
  const [frequency, setFrequency] = useState('--');
  const [duration, setDuration] = useState('--');
  const [pitch, setPitch] = useState('--');
  const [result, setResult] = useState('--');
  const [spectrumData, setSpectrumData] = useState({ freqs: [], spectrum: [] });
  const [waveform, setWaveform] = useState(null); 
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleUpload = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      });

      let file;
      if (res.canceled !== undefined) {
        if (res.canceled) return console.log('使用者取消選擇檔案');
        file = res.assets[0];
      } else {
        if (res.type !== 'success') return console.log('使用者取消選擇檔案');
        file = res;
      }

      console.log('已選擇檔案:', file.uri, file.name);
      setSelectedFileName(file.name);

      const analysis = await BowlSoundAnalyzer(file.uri, file.name);

      setFrequency(analysis.frequency ?? '--');
      setDuration(analysis.duration ?? '--');
      setPitch(analysis.pitch ? `${analysis.pitch} Hz` : '--');
      setResult(analysis.result ?? '--');

  // 偵測異常並跳出警示
    const abnormalKeywords = ['abnormal'];
    const resultText = (analysis.result ?? '').toLowerCase();

    // 未偵測到腸音警示
    if (resultText.includes('未偵測到腸音')) {
      Alert.alert(
        '❗ 未偵測到腸音',
        '系統未偵測到腸音，請確認錄音是否清晰，或重新測試一次。',
        [{ text: '了解', style: 'default' }]
      );
    }
    // 其他異常情況警示
    else if (abnormalKeywords.some(k => resultText.includes(k))) {
      Alert.alert(
        '⚠️ alert',
        'Abnormal bowel sounds detected. Recommend retest or further check.',
        [{ text: 'OK', style: 'default' }]
      );
    }
      
      setWaveform(analysis.waveform ?? null); // 🔹 接收 waveform base64

      // 頻譜處理
      const rawSpectrum = analysis.spectrum ?? [];
      const rawFreqs = analysis.freqs ?? [];

      if (rawSpectrum.length > 0) {
        const step = Math.ceil(rawSpectrum.length / MAX_POINTS);
        const sampledSpectrum = rawSpectrum
          .filter((_, i) => i % step === 0)
          .map(v => 10 * Math.log10(v + 1e-12));

        const sampledFreqs = rawFreqs.filter((_, i) => i % step === 0);

        setSpectrumData({ spectrum: sampledSpectrum, freqs: sampledFreqs });
      } else {
        setSpectrumData({ spectrum: [], freqs: [] });
      }

      console.log('分析結果:', analysis);
    } catch (err) {
      console.error('檔案選擇或分析錯誤:', err);
    }
  };

  const handleReset = () => {
    setFrequency('--');
    setDuration('--');
    setPitch('--');
    setResult('--');
    setSpectrumData({ freqs: [], spectrum: [] });
    setWaveform(null);
    setSelectedFileName('');
  };

  const isAbnormal =
    result.includes('absent') ||
    result.includes('hypoactive') ||
    result.includes('high pitch') ||
    result.includes('low pitch');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bowel Sound Monitoring</Text>

      {/* 基本資訊 */}
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text>Frequency</Text>
          <Text>{frequency} /min</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>Time duration</Text>
          <Text>{duration} sec</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>Pitch</Text>
          <Text>{pitch}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>Result</Text>
          <Text style={{ color: isAbnormal ? 'red' : 'black' }}>{result}</Text>
        </View>
      </View>

      {/*聲音波形圖 */}
      <View style={styles.waveform}>
        {waveform ? (
          <Image
            source={{ uri: `data:image/png;base64,${waveform}` }}
            style={{ width: screenWidth - 40, height: 200, resizeMode: 'contain' }}
          />
        ) : (
          <Text>Waveform (placeholder)</Text>
        )}
      </View>

      {/* 頻譜圖 */}
      {/* <View style={styles.spectrum}>
        {spectrumData.spectrum.length > 0 ? (
          <LineChart
            data={{
              labels: spectrumData.freqs.length > 0
                ? spectrumData.freqs.map((f, i) => i % 50 === 0 ? f.toFixed(0) : "")
                : [],
              datasets: [{ data: spectrumData.spectrum }],
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              style: { borderRadius: 10 },
            }}
            withDots={false}
            withInnerLines={false}
            withOuterLines={false}
          />
        ) : (
          <Text>Spectrum diagram (placeholder)</Text>
        )}
      </View> */}

      {/* 按鈕區 */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'blue' }]} onPress={handleUpload}>
          <Text style={styles.buttonText}>UPLOAD</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={handleReset}>
          <Text style={styles.buttonText}>RESET</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: 'gray' }]} onPress={() => navigation.navigate('History')}>
          <Text style={styles.buttonText}>HISTORY</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff3cc', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', marginTop: 60 },
  fileName: { fontSize: 16, marginBottom: 10, color: '#333' },
  infoContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
  infoBox: { width: '48%', height: '56%', padding: 15, backgroundColor: '#add8e6', marginBottom: 10, borderRadius: 10, alignItems: 'center' },
  waveform: { height: 200, backgroundColor: '#fff', marginTop: 40, marginBottom: 20, justifyContent: 'center', alignItems: 'center', width: '100%', borderRadius: 10 },
  spectrum: { height: 250, backgroundColor: '#fff', marginBottom: 20, justifyContent: 'center', alignItems: 'center', width: '105%', borderRadius: 10 },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 20 },
  button: { flex: 1, paddingVertical: 15, marginHorizontal: 5, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
