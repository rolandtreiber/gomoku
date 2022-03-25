import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from "react";
import {BottomBar} from "./components/bottom-bar";
import {GameArea} from "./components/game-area";
import styled from "styled-components"
import {ImageBackground} from "react-native";
import BackgroundImage1 from "./assets/images/bg1.jpg"
import BackgroundImage2 from "./assets/images/bg2.jpeg"
import BackgroundImage3 from "./assets/images/bg3.jpg"
import BackgroundImage4 from "./assets/images/bg4.jpeg"
import BackgroundImage5 from "./assets/images/bg5.jpeg"
import BackgroundImage6 from "./assets/images/bg6.jpeg"
import BackgroundImage7 from "./assets/images/bg7.jpeg"
import BackgroundImage8 from "./assets/images/bg8.jpeg"
import BackgroundImage9 from "./assets/images/bg9.jpeg"
import BackgroundImage10 from "./assets/images/bg10.jpeg"

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
      setWon(won+1)
    } else {
      setLost(lost+1)
    }
  }

  const clear = () => {
    setWon(0)
    setLost(0)
    updateStatistics(won, lost)
  }

  const updateStatistics = async (won, lost) => {

  };

  const loadStatistics = async () => {
  };

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
                  setLoading(true)
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
