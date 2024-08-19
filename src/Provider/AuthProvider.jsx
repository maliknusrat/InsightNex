/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import app from './../firebase/firebase.config';
export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();


  //createUser
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }


  //signIn
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  const logOut = () =>{
    setLoading(true)
    return signOut(auth);
  }

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      const userEmail =currentUser?.email || user?.email ;
      const loggedUser = {email: userEmail}
        setUser(currentUser);
        console.log('current user',currentUser);
        setLoading(false);
    })
    return () => {
        return unsubscribe();
    }
  }, [])
  
    const authInfo = {
      createUser,
      signIn,
      user,
      logOut,
      loading,
      loginWithGoogle,
    }
    return (
        <AuthContext.Provider value={authInfo}>
          {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;