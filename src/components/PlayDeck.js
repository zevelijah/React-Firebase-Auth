import React, { useState, useEffect } from "react"
import { database } from "../firebase"
import { Link, useParams } from "react-router-dom"
import { Button } from "react-bootstrap"
export default function PlayDeck() {  
  const [currentDeck, setCurrentDeck] = useState({currentIndex: 0, metadata:{}, cards: {}, cardList: [], showAnswer: false})
  const { id } = useParams();

  var deckId = id
  var deckRef = database.ref('decks/' + deckId);
  useEffect(() => {
    deckRef.on('value', snapshot => {
      let d = snapshot.val()
      d.showAnswer = false
      if (d.metadata === undefined) {
        d.metadata = {}
      }
      if (d.cards === undefined) {
        d.cards = {}
      }
      if (d.cardList === undefined) {
        d.cardList = []
      }
      Object.keys(d.cards).map((key, index) => 
        d.cardList.push(d.cards[key])
      );
      if (d.cardList.length > 0) {
        d.currentIndex = 0
      }
      setCurrentDeck(d)
    });
    }, [])  
  function getCurrentQuestion() {    
    if (currentDeck.cardList && currentDeck.cardList.length > currentDeck.currentIndex) {
      return currentDeck.cardList[currentDeck.currentIndex].question
    }
    return (
      <>
       no new cards
       <Link to={location => `/deck/edit/${deckId}`} className="btn btn-primary">Back to deck page</Link>
      </>
    )
  }
  function nextQuestion() {
    if (currentDeck.cardList && currentDeck.cardList.length > currentDeck.currentIndex) {
      let current = {}
      current.currentIndex = currentDeck.currentIndex + 1
      current.cardList = currentDeck.cardList
      current.metadata = currentDeck.metadata
      current.cards = currentDeck.cards
      current.showAnswer = false
      setCurrentDeck(current)
    }
  }
  function previousQuestion() {
    if (currentDeck.cardList && currentDeck.currentIndex > 0) {
      let current = {}
      current.currentIndex = currentDeck.currentIndex - 1
      current.cardList = currentDeck.cardList
      current.metadata = currentDeck.metadata
      current.cards = currentDeck.cards
      current.showAnswer = false
      setCurrentDeck(current)
    }
  }
  function showIt() {
    let currentNow = {}
    currentNow.currentIndex = currentDeck.currentIndex 
    currentNow.cardList = currentDeck.cardList
    currentNow.metadata = currentDeck.metadata
    currentNow.cards = currentDeck.cards
    currentNow.showAnswer = true
    setCurrentDeck(currentNow)
    console.log(currentNow.showAnswer)
    console.log(currentDeck.cardList[currentDeck.currentIndex].question)
    if (currentDeck.cardList && currentDeck.cardList.length > currentDeck.currentIndex && currentDeck.showAnswer === true){
      return currentDeck.cardList[currentDeck.currentIndex].answer
    }
    return "sssdfdfgsjdlgsrgvhserld"
    
  }
  return (
    <>
      <h3>play {currentDeck.metadata.name}</h3>
      {getCurrentQuestion(currentDeck.currentIndex)}
      <br/>
      <Button onClick={previousQuestion}>Previous</Button>
      <br />
      <Button onClick={nextQuestion}>Next</Button>
      <br />
      <Button onClick={showIt}>Show Answer</Button>
    </>
  )
}