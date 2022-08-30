import { database } from "../firebase"
import React, { useState, useEffect} from "react"
import { Link } from "react-router-dom"

export default function PublicLibrary() {
  const [currentList, setCurrentList] = useState({})
  
  var allRef = database.ref('decks')
  
  useEffect(() => {
    console.log("useEffect")
    allRef.on('value', snapshot => {
      console.log("on")
      let d = snapshot.val()
      // for (const thing in d){
      //   if (d[thing].metadata.public === undefined || d[thing].metadata.public === 'on'){
      //     delete d[thing]
      //   }
      // }
      setCurrentList(d)
      console.log(currentList)
    });
    }, [])  
    function DeckList(props){
      const listItems = Object.keys(props.deckList).map((key, index) => 
       <tr><td>{props.deckList[key].metadata.name}</td><td><Link to={location => `/deck/edit/${key}`} className="btn btn-primary w-100 mt-3">Deck Page</Link></td></tr> 
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