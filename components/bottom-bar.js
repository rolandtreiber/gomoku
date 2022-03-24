import React from "react";
import {View, Text} from "react-native"
import styled from "styled-components"

const Container = styled.View`
  background-color: rgba(0,0,0,0.70);
  height: 60px;
  display: flex;
  width: 100%;
  padding: 10px;
`

export const BottomBar = () => {
  return <Container>
    <Text>Hello</Text>
  </Container>
}