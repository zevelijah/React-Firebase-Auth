import { database } from "../firebase"
import React, { useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function PublicLibrary() {
  const { currentUser } = useAuth()
  const [currentList, setCurrentList] = useState({decksWrapper:{}})
  
  var allRef = database.ref('decks/')
  console.log("this is a different branch")
  useEffect(() => {
    console.log("useEffect")
    allRef.on('value', snapshot => {
      console.log("on")
      let d = snapshot.val()
      for (const thing in d){
        if (currentUser.uid !== d.decksWrapper[thing].uid){
          delete d.decksWrapper[thing]
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