import React, { useRef, useState, useEffect } from "react"
import { database } from "../firebase"
import { Link, useParams } from "react-router-dom"
import { Form, Button, Card, Alert, Container} from "react-bootstrap"
export default function PlayDeck() {  
  const [currentDeck, setCurrentDeck] = useState({metadata:{}, cards: {}, cardList: []})
  const { id } = useParams();
  var currentIndex = 0

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
      setCurrentDeck(d)
    });
    }, [])  
  function getCurrentQuestion() {
    if (currentDeck.cardList && currentDeck.cardList.length > currentIndex) {
      return currentDeck.cardList[currentIndex].question
    }
    return "no cards"
  }
  function nextQuestion() {
    if (currentDeck.cardList && currentDeck.cardList.length > currentIndex) {
      currentIndex = currentIndex + 1
    }
  }
  function previousQuestion() {
    if (currentDeck.cardList && currentIndex > 0) {
      currentIndex = currentIndex - 1
    }
  }
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }
  function LoadingButton() {
      const [isLoading, setLoading] = useState(false);
      useEffect(() => {
        if (isLoading) {
          simulateNetworkRequest().then(() => {
            setLoading(false);
          });
        }
      }, [isLoading]);
    const handleClick = () => setLoading(true);
    return (
      <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? 'Loading…' : 'Click to load'}
      </Button>
    )
  }
  return (
    <>
      <h3>play {currentDeck.metadata.name}</h3>
      {getCurrentQuestion()}
      <Button onClick={previousQuestion}>Previous</Button>
      <Button onClick={nextQuestion}>Next</Button> 
    </>
  )
}