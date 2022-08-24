import { database } from "../firebase"
import React, { useState, useEffect} from "react"
import { Link } from "react-router-dom"

export default function PublicLibrary() {
  const [currentList, setCurrentList] = useState({deckList:{}})
  
  var allRef = database.ref('decks/')
  
  useEffect(() => {
    console.log("useEffect")
    allRef.on('value', snapshot => {
      console.log("on")
      let d = snapshot.val()
      for (const thing in d){
        if (d[thing].metadata.public !== 'on' || d[thing].metadata.public === undefined){
          delete d[thing]
        }
      }
      setCurrentList(d)
      console.log(currentList)
    });
    }, [])  
    function deckList(props){
      const listItems = Object.keys(props.decks).map((key, index) => 
       <tr><td>{props.decks[key].metadata.name}</td><td><Link to={location => `/deck/edit/${key}`} className="btn btn-primary w-100 mt-3">Deck Page</Link></td></tr> 
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
      <deckList decks={currentList}></deckList>
    </>
  )
}