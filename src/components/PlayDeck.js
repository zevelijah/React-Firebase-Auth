import {currentDeck, deckQuestionRef, deckAnswerRef, id} from "./DeckEdit"
import React, { useRef, useState, useEffect } from "react"
import { database } from "../firebase"
import { Link, useParams } from "react-router-dom"

export default function PlayDeck() {
  const { id } = useParams();
  return (
    <div>
      <h1>Play Deck</h1>
      <p>Working on it</p>
    </div>
 );
}