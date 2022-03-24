import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from "react";
import { Text, View } from 'react-native';
import {BottomBar} from "./components/bottom-bar";
import {GameArea} from "./components/game-area";
import styled from "styled-components"
import {ImageBackground} from "react-native";
import BackgroundImage1 from "./assets/images/bg1.jpg"
import BackgroundImage2 from "./assets/images/bg2.jpeg"
import BackgroundImage3 from "./assets/images/bg3.jpg"

const Container = styled.ImageBackground`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`

export default function App() {
  const [backgroundImage, setBackgroundImage] = useState(BackgroundImage1)

  useEffect(() => {
    const images = [BackgroundImage1, BackgroundImage2, BackgroundImage3]
    setBackgroundImage(images[Math.floor(Math.random() * (images.length+1))])
  }, [])

  return (
    <Container source={backgroundImage}>
        <GameArea/>
        <BottomBar/>
    </Container>
  );
}
