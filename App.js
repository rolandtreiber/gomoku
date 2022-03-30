import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from "react";
import {BottomBar} from "./components/bottom-bar";
import {GameArea} from "./components/game-area";
import styled from "styled-components"
import {Alert, ImageBackground} from "react-native";
import BackgroundImage1 from "./assets/images/bg1.jpg"
import BackgroundImage2 from "./assets/images/bg2.jpg"
import BackgroundImage3 from "./assets/images/bg3.jpg"
import BackgroundImage4 from "./assets/images/bg4.jpg"
import BackgroundImage5 from "./assets/images/bg5.jpg"
import BackgroundImage6 from "./assets/images/bg6.jpg"
import BackgroundImage7 from "./assets/images/bg7.jpg"
import BackgroundImage8 from "./assets/images/bg8.jpg"
import BackgroundImage9 from "./assets/images/bg9.jpg"
import BackgroundImage10 from "./assets/images/bg10.jpg"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.ImageBackground`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  width: 100%;
`

export default function App() {
  const [backgroundImage, setBackgroundImage] = useState(BackgroundImage1)
  const [restart, setRestart] = useState(false)
  const [loading, setLoading] = useState(false)
  const [won, setWon] = useState(0)
  const [lost, setLost] = useState(0)

  const endGame = (result) => {
    if (result === true) {
      setWon(won + 1)
      updateStatistics(won + 1, lost)
      alert('You won!')
    } else {
      setLost(lost + 1)
      updateStatistics(won, lost + 1)
      alert('You lost!')
    }
  }

  const clear = () => {
    updateStatistics(0, 0).then(() => {
      setWon(0)
      setLost(0)
    })
  }

  const updateStatistics = async (won, lost) => {
    if (won !== null && lost !== null) {
      try {
        await AsyncStorage.setItem('@gomoku_settings', JSON.stringify({
          won: won,
          lost: lost
        }))
      } catch (e) {
        // saving error
      }
    }
  };

  const loadStatistics = async () => {
    try {
      const value = await AsyncStorage.getItem('@gomoku_settings')
      if (value !== null) {
        const settings = JSON.parse(value)
        settings.won && setWon(settings.won)
        settings.lost && setLost(settings.lost)
      } else {
        updateStatistics(won, lost)
      }
    } catch (e) {
      // error reading value
    }
  };

  const createGameEndAlert = (title, message) =>
  {
    console.log('alert called')
    Alert.alert(title, message, [
      { text: 'OK', onPress: () => {
          setRestart(!restart)
        }
      },
    ]);
  }

  useEffect(() => {
    loadStatistics()
  }, [])

  useEffect(() => {
    const images = [BackgroundImage1, BackgroundImage2, BackgroundImage3, BackgroundImage4, BackgroundImage5, BackgroundImage6, BackgroundImage7, BackgroundImage8, BackgroundImage9, BackgroundImage10]
    setBackgroundImage(images[Math.floor(Math.random() * (images.length))])
  }, [restart])

  return (
    <Container source={backgroundImage}>
      <GameArea setLoading={setLoading}
                loading={loading}
                restart={restart}
                setRestart={() => {
                  setRestart(!restart)
                }}
                end={endGame}/>
      <BottomBar
        won={won}
        lost={lost}
        clear={clear}
        setRestart={() => {
          setLoading(true)
          setRestart(!restart)
        }}/>
    </Container>
  );
}
