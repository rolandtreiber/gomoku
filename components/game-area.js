import React from "react";
import {View, Text} from "react-native"
import styled from "styled-components"

const Container = styled.View`
  flex: 1;
  display: flex;
  height: 100px;
  flex-direction: row;
`

export const GameArea = () => {
  return <Container>
    <Text style={{color: "red"}}>Game area</Text>
  </Container>
}