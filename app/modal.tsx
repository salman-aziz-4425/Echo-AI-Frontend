
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import LottieView from 'lottie-react-native';

type Response = {
  question: string;
  uri: string;
};

export default function Modal() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(true);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const recordingRef = useRef<Audio.Recording | null>(null); 
  const animationRef = useRef<LottieView | null>(null);
  let timerId:any;

  const questions = [
    "What's your name?",
    "How are you feeling today?",
  ];

  useEffect(() => {
    askQuestion(questions[currentQuestionIndex]);
  return ()=>{
    cleanupRecording()
    Speech.stop()
    console.log(timerId)
    if(timerId){
      clearTimeout(timerId);
    }
  }
  }, [currentQuestionIndex]);

  async function getAudioPermission() {
    const { status } = await Audio.requestPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status !== 'granted') {
      Alert.alert('Permission is required to record audio');
    }
  }


  const cleanupRecording = async () => {
    if (recordingRef.current) {
      try {
        await recordingRef.current.stopAndUnloadAsync();
        recordingRef.current = null;
      } catch (error) {
        console.error('Failed to cleanup recording', error);
      }
    }
  };

  const checkLoudness=async (recording:Audio.Recording)=>{
      const {metering,isRecording}:any=await recording.getStatusAsync();
      if(timerId){
        clearTimeout(timerId);
      }
      if(isRecording && metering && metering<=-28){
      await stopRecording();
      }
      else if(isRecording){
        console.log("Recording still going on");
        timerId=setTimeout(()=>checkLoudness(recording),2000)
      }
      else{
        console.log("Recording stopped or something went wrong");
      }
  }

  async function startRecording() {
    try {
      if (!hasPermission) {
        await getAudioPermission();
      }
      


      await cleanupRecording();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording:Audio.Recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,{isMeteringEnabled: true});
      await recording.startAsync();
      recordingRef.current = recording;

      console.log('Recording started');
      setIsListening(true); 

      setTimeout(()=>checkLoudness(recording),2000)

  
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }


  async function stopRecording() {
    console.log("Recording stopping");
    try {
      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });

        const uri = recordingRef.current.getURI();
        console.log('Recording stopped and stored at', uri);


        if (uri) {
          setResponses(prevResponses => [
            ...prevResponses,
            { question: questions[currentQuestionIndex], uri },
          ]);
        }

    
        recordingRef.current = null;
        setIsListening(false); 

        setTimeout(() => {
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          } else {
            Speech.speak("Thank you for answering all my questions!");
            setIsSpeaking(false); 
          }
        }, 2000); 
      }
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  }

  const askQuestion = (question: string) => {
    setIsSpeaking(true);
    if (animationRef.current) {
      animationRef.current.play();
    }
    Speech.speak(question, {
      onDone: () => {
        console.log('AI finished speaking');
        startRecording();
      },
    });
  };


  useEffect(() => {
    if (isListening && !isSpeaking) {
      setTimeout(async () => {
        await stopRecording();
      }, 5000); 
    }
    return ()=>{
      Speech.stop()
      console.log(timerId)
      if(timerId){
        clearTimeout(timerId);
      }
    }
  }, [isListening, isSpeaking]);

  return (
    <View style={styles.container}>
      {(isSpeaking || isListening) && (
        <LottieView
          ref={animationRef}
          source={require('./../assets/speaking-animation.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      )}
      <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>

      <FlatList
        data={responses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.responseContainer}>
            <Text style={styles.responseText}>Question: {item.question}</Text>
            <TouchableOpacity onPress={() => playRecording(item.uri)}>
              <Text style={styles.playButton}>Play Response</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => {
        setCurrentQuestionIndex(0);
        setIsSpeaking(true);
        setResponses([]);
      }
      }>
        <Text>Want to start Again</Text>
        </TouchableOpacity>

    </View>
  );
}

async function playRecording(uri: string) {
  try {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  } catch (error) {
    console.error('Error playing recording', error);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', // Light background color
    padding: 20,
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Dark text color for better readability
    marginVertical: 20,
    textAlign: 'center',
  },
  responseContainer: {
    backgroundColor: '#ffffff', // White background for list items
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    width: '100%',
  },
  responseText: {
    fontSize: 16,
    color: '#333', // Dark text color
  },
  playButton: {
    fontSize: 16,
    color: '#007bff', // Primary button color
    marginTop: 5,
    textAlign: 'center',
  },
});
