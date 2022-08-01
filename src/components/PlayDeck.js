import React, { useState, useEffect } from "react"
import { database } from "../firebase"
import { Link, useParams } from "react-router-dom"
import { Button } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"

export default function PlayDeck() {  
  const [currentDeck, setCurrentDeck] = useState({currentIndex: 0, metadata:{}, cards: {}, cardList: [], showAnswer: false, changedIndex: false})
  const { currentUser } = useAuth()
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
  function getCurrentQuestionAnswer() {    
    if (currentDeck.cardList && currentDeck.cardList.length > currentDeck.currentIndex) {
      if (currentDeck.showAnswer) {
        return currentDeck.cardList[currentDeck.currentIndex].answer
      }
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
      current.changedIndex = true
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
      current.changedIndex = true
      setCurrentDeck(current)
    }
  }
  function showIt() {
    let currentNow = {}
    currentNow.currentIndex = currentDeck.currentIndex 
    currentNow.cardList = currentDeck.cardList
    currentNow.metadata = currentDeck.metadata
    currentNow.cards = currentDeck.cards
    currentNow.showAnswer = !currentDeck.showAnswer
    setCurrentDeck(currentNow)
    if (currentNow.cardList && currentNow.cardList.length > currentNow.currentIndex){
      return currentNow.cardList[currentNow.currentIndex].answer
    }
    return "sssdfdfgsjdlgsrgvhserld"    
  }
  function thirdButton(){
    var display = currentDeck.showAnswer ? "Show Question" : "Show Answer"
    return display
  }
  if (currentDeck.changedIndex === false) {
    if (currentDeck.public !== "on") {
      if (currentUser.databaseRecord.admin !== "true") {
        if (currentUser.uid !== currentDeck.uid) {
          return (<><h1>Cannot prove your right to be here</h1></>)
        }
      } 
    }
  }
/*This code breaks Play deck: figure out why, fix that, then merge back to master*/
  return (
    <>
      <h3>play {currentDeck.metadata.name}</h3>
      {getCurrentQuestionAnswer(currentDeck.currentIndex)}
      <br/>
      <Button onClick={previousQuestion}>Previous</Button>
      <br />
      <Button onClick={nextQuestion}>Next</Button>
      <br />
      <Button onClick={showIt}>{thirdButton()}</Button>
      <br />
      <Link to={location => `/deck/edit/${deckId}`} className="btn btn-primary">Back to deck page</Link>
    </>
  )
}