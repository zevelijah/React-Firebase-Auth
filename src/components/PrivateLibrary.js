import { database } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import React from "react"

export default function PrivateLibrary() {
  var allRef = database.ref('decks/')  
  return(
    <>
      How do I move forward?
    </>
  )
}