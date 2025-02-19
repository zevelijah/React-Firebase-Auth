import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>  
      <link rel="stylesheet" href="code/React-Firebase-Auth/cssStlyheets/dasboard.css" />
      <div id="header">
        <div id="title">
          <h1 id="title-content">Flash Cards Galore (pre-alpha: 0.0.2)</h1> 
        </div>
        <Card id="prof" style={{ width: "60vw" }, {float: "right"}}>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong> {currentUser.email}
            <Link to="/deck/new" className="btn btn-primary w-100 mt-3">
              Make Deck
            </Link>
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
          </Card.Body>
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </Card>
      </div>
      <div id='other-stuff'>
        <Link to='/public-decks' className="btn btn-primary w-100 mt-3" style={{width: "50vw"}, {float: "left"}}>
          Public Decks
        </Link>
        <Link to='/your-decks' className="btn btn-primary w-100 mt-3" style={{width: "50vw"}, {float: "left"}}>
          Your Decks
        </Link>
        <Link to='/help' className="btn btn-primary w-100 mt-3" style={{width: "50vw"}, {float: "left"}}>
          Help
        </Link>
      </div>
    </>
  )
}