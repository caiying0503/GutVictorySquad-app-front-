export class BowlSoundAnalyzer {
  analyzeBuffer(channelData, sampleRate) {
    const windowSize = Math.floor(sampleRate * 0.05); // 50ms
    const threshold = 0.05;
    const minInterval = 0.2;

    let soundCount = 0;
    let lastSoundTime = 0;
    const soundIntervals = [];
    const soundAmplitudes = [];
    const soundHistory = [];

    for (let i = 0; i < channelData.length; i += windowSize) {
      const window = channelData.slice(i, i + windowSize);
      const rms = Math.sqrt(window.reduce((sum, x) => sum + x*x, 0)/window.length);
      const currentTime = i / sampleRate;

      if (rms > threshold && (currentTime - lastSoundTime) >= minInterval) {
        soundCount++;
        if (lastSoundTime > 0) {
          soundIntervals.push(currentTime - lastSoundTime);
          soundAmplitudes.push(rms*100);
        }
        lastSoundTime = currentTime;
        soundHistory.push({ time: currentTime*1000, count: 1 }); // 每個事件都算一次
      }
    }

    const totalDuration = channelData.length / sampleRate;
    const averageFrequency = soundCount / (totalDuration/60);
    const averageAmplitude = soundAmplitudes.length > 0 
      ? soundAmplitudes.reduce((a,b)=>a+b)/soundAmplitudes.length : 0;

    let condition = '';
    if (averageFrequency >= 3 && averageFrequency <= 30) condition='正常';
    else if (averageFrequency < 3 && averageFrequency>0) condition='異常（減弱）';
    else if (averageFrequency > 30) condition='異常（過度活躍）';
    else condition='異常（消失）';

    return { totalDuration, soundCount, averageFrequency, averageAmplitude, condition, soundHistory };
  }
}
