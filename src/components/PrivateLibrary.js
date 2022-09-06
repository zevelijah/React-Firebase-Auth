import { database } from "../firebase"
import React, { useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function PublicLibrary() {
  const { currentUser } = useAuth()
  const [currentList, setCurrentList] = useState({})
  
  var allRef = database.ref('users/' + currentUser.uid + '/creations')
  
  useEffect(() => {
    console.log("useEffect")
    allRef.on('value', snapshot => {
      console.log("on")
      let d = snapshot.val()
      setCurrentList(d)
      console.log(currentList)
    });
    }, [])  
    function DeckList(props){
      const listItems = Object.keys(props.deckList).map((key, index) => 
       <tr><td>{props.deckList[key].name}</td><td><Link to={location => `/deck/edit/${props.deckList[key].realId}`} className="btn btn-primary w-100 mt-3">Deck Page</Link></td></tr> 
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