import * as FileSystem from 'expo-file-system';

const API_URL = 'http://192.168.18.3:5000/BowlSoundAnalyzer'; 

export default async function BowlSoundAnalyzer(fileUri, fileName) {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: fileName || 'audio.wav',
      type: 'audio/wav',
    });

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`後端錯誤: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('BowlSoundAnalyzer 錯誤:', err);
    throw err;
  }
}
