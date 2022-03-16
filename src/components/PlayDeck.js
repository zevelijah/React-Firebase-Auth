import React, { useRef, useState, useEffect } from "react"
import { database } from "../firebase"
import { Link, useParams } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Form, Button, Card, Alert, Container} from "react-bootstrap"
export default function PlayDeck() {  
  const [currentDeck, setCurrentDeck] = useState({currentIndex: 0, metadata:{}, cards: {}, cardList: []})
  const { id } = useParams();
  
  var deckId = id
  var deckRef = database.ref('decks/' + deckId);
  useEffect(() => {
    deckRef.on('value', snapshot => {
      let d = snapshot.val()
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
    return "no cards"
  }
  function nextQuestion() {
    if (currentDeck.cardList && currentDeck.cardList.length > currentDeck.currentIndex) {
      let current = {}
      current.currentIndex = currentDeck.currentIndex + 1
      current.cardList = currentDeck.cardList
      current.metadata = currentDeck.metadata
      current.cards = currentDeck.cards
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
      setCurrentDeck(current)
    }
  }
  // function simulateNetworkRequest() {
  //   return new Promise((resolve) => setTimeout(resolve, 2000));
  // }
  // function LoadingButton() {
  //     const [isLoading, setLoading] = useState(false);
  //     useEffect(() => {
  //       if (isLoading) {
  //         simulateNetworkRequest().then(() => {
  //           setLoading(false);
  //         });
  //       }
  //     }, [isLoading]);
  //   const handleClick = () => setLoading(true);
  //   return (
  //     <Button
  //     variant="primary"
  //     disabled={isLoading}
  //     onClick={!isLoading ? handleClick : null}
  //     >
  //       {isLoading ? 'Loading…' : 'Click to load'}
  //     </Button>
  //   )
  // }
  return (
    <>
      <h3>play {currentDeck.metadata.name}</h3>
      {getCurrentQuestion(currentDeck.currentIndex)}
      <br/>
      <Button onClick={previousQuestion} stlye={{padding: "50 vw"}}>Previous</Button>
      <Button onClick={nextQuestion}>Next</Button> 
    </>
  )
}