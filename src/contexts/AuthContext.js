import React, { useContext, useState, useEffect } from "react"
import { auth, database } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function loginWithGoogle() {
    return auth.signInWithGoogle
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function updateUsername(username) {
    currentUser.databaseRecord.username = username   
    updateUsernameUid(currentUser.uid, username)
  }

  function updateUsernameUid(uid, username) {
    database.ref('users/' + uid + '/username').set(username)
    database.ref('users/' + uid + '/admin').set(false)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user && !user.databaseRecord) {
        user.databaseRecord = {}
      }
      setCurrentUser(user)
      if (user) {
        let userMetadataRef = database.ref("users/" + user.uid + "/");
        userMetadataRef.once('value').then(snapshot => {
          user.databaseRecord = snapshot.val()
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateUsername,
    updateUsernameUid,
    loginWithGoogle
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}