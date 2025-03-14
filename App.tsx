import React, {useState, useEffect} from 'react';
import {NativeModules, StyleSheet, Text, View} from 'react-native';

function App(): React.JSX.Element {
  const {PowerModule} = NativeModules;
  const [timeLeft, setTimeLeft] = useState(10);
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  useEffect(() => {
    let timer = null;

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsShuttingDown(true);
      handlePress();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handlePress = () => {
    console.log('Turning off...');
    PowerModule.shutdown();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>The projector will be turned off at:</Text>
      {isShuttingDown ? (
        <Text style={styles.timerText}>Turning off...</Text>
      ) : (
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    color: 'white',
  },
  timerText: {
    fontSize: 72,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 40,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
