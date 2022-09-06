import { database } from "../firebase"
import React, { useState, useEffect} from "react"
import { Link } from "react-router-dom"

export default function PublicLibrary() {
  const [currentList, setCurrentList] = useState({})
  
  var allRef = database.ref('decks/public-decks')
  
  useEffect(() => {
    allRef.on('value', snapshot => {
      let d = snapshot.val()
      setCurrentList(d)
      console.log(currentList)
    });
  }, [])  
  function DeckList(props){
    const listItems = Object.keys(props.deckList).map((key, index) => 
      <tr><td>{props.deckList[key].name}</td><td><Link to={location => `/deck/edit/${props.deckList[key].realId}`} className="btn btn-primary w-100 mt-3">Deck Page</Link></td><td>By: {props.deckList[key].author}</td></tr> 
    )
  return(
    <table>
      <tbody>
      {listItems}
      </tbody>
    </table>      
    );
    }
  return(
    <>
      <DeckList deckList={currentList}></DeckList>
    </>
  )
}