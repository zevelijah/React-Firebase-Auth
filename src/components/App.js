import React from "react"
import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import DeckEdit from "./DeckEdit"
import DeckNew from "./DeckNew"
import Help from "./Help"
import PlayDeck from "./PlayDeck"
import PrivateLibrary from "./PrivateLibrary"
import PublicLibrary from "./PublicLibrary"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/help" component={Help} />
          <Route path="/deck/new" component={DeckNew} />
          <Route path="/deck/edit/:id" component={DeckEdit} />
          <Route path = "/deck/play/:id" component={PlayDeck}/>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <PrivateRoute path="/your-decks" component={PrivateLibrary} />
          <Route path="/public-decks" component={PublicLibrary} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
