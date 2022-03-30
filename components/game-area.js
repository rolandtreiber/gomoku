import React, {useEffect, useRef, useState} from "react";
import {ScrollView, TouchableOpacity} from "react-native"
import styled from "styled-components"
import X from "../assets/x.png"
import O from "../assets/o.png"
import OEnd from "../assets/o-end.png"
import XEnd from "../assets/x-end.png"
import patternsData from "../data/patterns.json"

const Container = styled.View`
  flex: 1;
  display: flex;
  height: 100px;
  padding: 20px;
`

const GamePlayContainer = styled.View`
  margin: 20px;
  flex: 1;
  flex-direction: column;
`

const Box = styled.View`
  border: 1px solid rgba(255,255,255, 0.6);
  width: 35px;
  height: 35px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.4);
`

const GamePlayRowContainer = styled.View`
  flex-direction: row;
`

const Mark = styled.Image`
  width: 25px;
  resize-mode: contain;
`

const LoadingScreen = styled.Text`
  color: white;
  top:50%;
  flex: 1;
`

const patternTypes = {
  horizontal: 0,
  vertical: 1,
  diagonalDown: 2,
  diagonalUp: 3
}

export const GameArea = ({restart, setRestart, loading, setLoading, end}) => {
  const [boardData, setBoardData] = useState([])
  const refScrollView1 = useRef('scrollView1');
  const refScrollView2 = useRef('scrollView2');
  const [initialLoad, setInitialLoad] = useState(true)
  const [turn, setTurn] = useState(false)
  const [boardWidth, setBoardWidth] = useState(20)
  const [boardHeight, setBoardHeight] = useState(30)
  const [ended, setEnded] = useState(false)

  const resetBoard = (width, height) => {
    let boardData = [];
    for (let i = 0;i < height; i++) {
      let rowData = [];
      for (let j = 0;j < width; j++) {
        rowData.push(null)
      }
      boardData.push(rowData)
    }
    autosScrollX()
    autosScrollY()
    setEnded(false)
    return boardData
  }

  const autosScrollX = () => {
    let horizontalScroll = 200;
    let VerticalScroll = 200;
    refScrollView1.current.scrollTo({x: horizontalScroll, y: VerticalScroll, animated: true});
  }

  const autosScrollY = () => {
    let horizontalScroll = 200;
    let VerticalScroll = 200;
    refScrollView2.current.scrollTo({x: horizontalScroll, y: VerticalScroll, animated: true});
  }

  useEffect(() => {
    setInitialLoad(true)
    setLoading(true)
    setBoardData(resetBoard(boardWidth, boardHeight))
    setLoading(false)
  }, [restart])

  useEffect(() => {
    if (initialLoad) {
      autosScrollX()
      autosScrollY()
    }
  }, [loading, boardData])

  const setMark = (coordX, coordY, value) => {
    if (boardData[coordY][coordX] === null && ended === false) {
      let copy = [...boardData]
      copy[coordY][coordX] = value
      setBoardData([...copy])
      setInitialLoad(false)
      setTurn(true)
    }
  }

  const computerPlacesMark = () => {
    updateBoardByPattern(scanBoard())
    setTurn(false)
  }

  const matchPatterns = (y, x) => {
    let result = [];
    const selection1 = x < boardWidth - 4 ? {
      starting_coordinates : {
        y: y,
        x: x
      },
      coordinates: [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
        [y, x + 4]
      ],
      type: patternTypes.horizontal,
      items: [boardData[y][x], boardData[y][x + 1], boardData[y][x + 2], boardData[y][x + 3], boardData[y][x + 4]]
    } : null
    const selection2 = y < boardHeight - 4 ? {
      starting_coordinates : {
        y: y,
        x: x
      },
      coordinates: [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
        [y + 4, x]
      ],
      type: patternTypes.vertical,
      items: [boardData[y][x], boardData[y + 1][x], boardData[y + 2][x], boardData[y + 3][x], boardData[y + 4][x]]
    } : null
    const selection3 = (y < boardHeight - 4 && x < boardWidth - 4) ? {
      starting_coordinates : {
        y: y,
        x: x
      },
      coordinates: [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
        [y + 4, x + 4]
      ],
      type: patternTypes.diagonalDown,
      items: [boardData[y][x], boardData[y + 1][x + 1], boardData[y + 2][x + 2], boardData[y + 3][x + 3], boardData[y + 4][x + 4]]
    } : null
    const selection4 = y > 4 ? {
      starting_coordinates : {
        y: y,
        x: x
      },
      coordinates: [
        [y, x],
        [y - 1, x + 1],
        [y - 2, x + 2],
        [y - 3, x + 3],
        [y - 4, x + 4]
      ],
      type: patternTypes.diagonalUp,
      items: [boardData[y][x], boardData[y - 1][x + 1], boardData[y - 2][x + 2], boardData[y - 3][x + 3], boardData[y - 4][x + 4]]
    } : null;
    const emptyValue = [null, null, null, null, null]
    const wonState = [true, true, true, true, true]
    const lostState = [false, false, false, false, false]

    if ((selection1 && JSON.stringify(selection1.items) === JSON.stringify(wonState))
    || (selection2 && JSON.stringify(selection2.items) === JSON.stringify(wonState))
    || (selection3 && JSON.stringify(selection3.items) === JSON.stringify(wonState))
    || (selection4 && JSON.stringify(selection4.items) === JSON.stringify(wonState))) {
      end(true)
      setEnded(true)
    }

    if ((selection1 && JSON.stringify(selection1.items) === JSON.stringify(lostState))
      || (selection2 && JSON.stringify(selection2.items) === JSON.stringify(lostState))
      || (selection3 && JSON.stringify(selection3.items) === JSON.stringify(lostState))
      || (selection4 && JSON.stringify(selection4.items) === JSON.stringify(lostState))) {
      end(false)
      setEnded(true)
    }

    if (selection1 && JSON.stringify(selection1.items) !== JSON.stringify(emptyValue)) {
      result.push(selection1)
    }
    if (selection2 && JSON.stringify(selection2.items) !== JSON.stringify(emptyValue)) {
      result.push(selection2)
    }
    if (selection3 && JSON.stringify(selection3.items) !== JSON.stringify(emptyValue)) {
      result.push(selection3)
    }
    if (selection4 && JSON.stringify(selection4.items) !== JSON.stringify(emptyValue)) {
      result.push(selection4)
    }
    return result
  }

  const updateBoardByPattern = (stepData) => {
    const updateOptions = stepData.data.to;
    const updateOption = ([...updateOptions[Math.floor(Math.random() * (updateOptions.length))]])
    stepData.direction === 2 && updateOption.reverse()
    let boardCopy = [...boardData]
    stepData.coordinates.forEach((coords, index) => {
      boardCopy[coords[0]][coords[1]] = stepData.direction === 1 ? updateOption[index] : updateOption[index]
    })
    setBoardData([...boardCopy])
    scanBoard()
  }

  const scanBoard = () => {
    let result = []
    for (let i = 0; i < boardHeight; i++) {
      for (let j = 0; j < boardWidth; j++) {
        const patterns = matchPatterns(i, j)
        if (patterns.length !== 0) {
          patterns.forEach(matchedPattern => {
            patternsData.forEach((p, priority) => {
              const items = [...p.from];
              const reversedItems = [...p.from].reverse();
              if (JSON.stringify(items) === JSON.stringify(matchedPattern.items)) {
                let copy = {...matchedPattern}
                copy.priority = patternsData.length - priority
                copy.direction = 1
                copy.data = p
                result.push({...copy})
              }
              if (JSON.stringify(reversedItems) === JSON.stringify(matchedPattern.items)) {
                let copyReverse = {...matchedPattern}
                copyReverse.priority = patternsData.length - priority
                copyReverse.direction = 2
                copyReverse.data = p
                result.push({...copyReverse})
              }
              return null
            })
          })
        }
      }
    }
    return result.sort((a, b) => {
      return (a.priority < b.priority) ? 1 : -1
    })[0]
  }

  useEffect(() => {
    boardData.length > 0 && turn === true && computerPlacesMark()
  }, [turn])

  return <Container>
    <ScrollView showsVerticalScrollIndicator={false}
                ref={refScrollView2}>
    <ScrollView directionalLockEnabled={false}
                horizontal={true}
                ref={refScrollView1}>
      {!loading && <GamePlayContainer>
        {boardData.map((rowData, indexY) => (
          <GamePlayRowContainer key={"row-"+indexY}>
            {rowData.map((field, indexX) => <TouchableOpacity onPress={() => setMark(indexX, indexY, true)} key={"field-"+indexX+'-'+indexY}>
              <Box>
                {boardData[indexY][indexX] !== null && <Mark source={boardData[indexY][indexX] === true ? ended ? XEnd : X : ended ? OEnd : O}/>}
              </Box>
            </TouchableOpacity>)}
          </GamePlayRowContainer>
        ))}
      </GamePlayContainer>}
      {loading && <LoadingScreen>Loading...</LoadingScreen>}
    </ScrollView>
    </ScrollView>
  </Container>
}