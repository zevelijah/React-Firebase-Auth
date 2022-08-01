import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { database } from "../firebase"

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
          <h1 id="title-content">Flash Cards Galore<br/>(Localhost alpha)</h1> 
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
    </>
  )
}