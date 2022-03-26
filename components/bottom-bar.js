import React from "react";
import {View, Text, Image, TouchableOpacity, Alert} from "react-native"
import styled from "styled-components"
import LogoImage from "../assets/logo.png"
import RefreshIcon from "../assets/refresh-icon.png"
import TrashIcon from "../assets/trash-icon.png"

const Container = styled.View`
  background-color: rgba(0, 0, 0, 0.70);
  height: 60px;
  display: flex;
  width: 100%;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Content = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Logo = styled.Image`
  width: 100px;
  display: flex;
  resize-mode: contain;
`

const RefreshButton = styled.Image`
  width: 25px;
  resize-mode: contain;
`

const StatisticsContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const Statistics = styled.Text`
  color: white;
  font-family: Arial;
  font-size: 16px;
  text-align: right;
  padding-left: 10px;
`

const ClearButton = styled.Image`
  height: 20px;
  width: 20px;
  margin-left: 10px;
  resize-mode: contain;
`

const Spacer = styled.View`
  flex:1;
`

export const BottomBar = ({setRestart, won, lost, clear}) => {
  const createTwoButtonAlertRestartGame = () =>
    Alert.alert('Restart game', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Restart', onPress: () => setRestart() },
    ]);

  const createTwoButtonAlertClearStatistics = () =>
    Alert.alert('Clear statistics', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Clear Statistics', onPress: () => clear() },
    ]);

  return <Container>
    <Content>
      <TouchableOpacity onPress={createTwoButtonAlertRestartGame}>
        <RefreshButton source={RefreshIcon}/>
      </TouchableOpacity>
      <StatisticsContainer>
        <Statistics>won: {won} lost: {lost}</Statistics>
        <TouchableOpacity onPress={createTwoButtonAlertClearStatistics}>
          <ClearButton source={TrashIcon}/>
        </TouchableOpacity>
        <Spacer/>
      </StatisticsContainer>
    </Content>
    <Logo source={LogoImage}/>
  </Container>
}