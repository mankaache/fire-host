/* eslint-disable react/no-unknown-property */
import styler from "./authStyles.module.css";
import { auth , googleProvider} from "../firebase/Config";
import { createUserWithEmailAndPassword, signInWithPopup , signOut} from "firebase/auth";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  console.log('auth details', auth?.currentUser?.photoURL)
const GoogleSignIn = async (e) => {
  e.preventDefault()
  try{
    await signInWithPopup(auth,googleProvider)
      console.log('success')
  }catch (error){
    console.log('error', error)
  }
}

const SignIn = async (e) => {
  e.preventDefault()
  try{
    await createUserWithEmailAndPassword(auth, email, password)
      console.log('success')
  }catch (error){
    console.log('error', error)
  }
}
const Logout = async (e) => {
  e.preventDefault()
  try{
    await signOut(auth)
      console.log('success')
  }catch (error){
    console.log('error', error)
  }
}


  return (
    <div className={styler.pager}>
      <div className={styler.container}>
        <div className={styler.content}>
          <i
            styler='background-image: url("https://static.cdninstagram.com/rsrc.php/v3/yS/r/ajlEU-wEDyo.png"); background-position: 0px -52px; background-size: auto; width: 175px; height: 51px; background-repeat: no-repeat; display: inline-block;'
            role="img"
            className=""
            aria-label="Instagram"
            data-visualcompletion="css-img"
          ></i>
          <form className={styler.content__form}>
            <div className={styler.content__inputs}>
              <label>
                <input required="" type="email" onChange={(e)=>setEmail(e.target.value)}/>
                <span> email</span>
              </label>
              <label>
                <input required="" type="password"  onChange={(e)=>setPassword(e.target.value)}/>
                <span>Password</span>
              </label>
            </div>
            <button onClick={SignIn}>Log In</button>
          </form>
          <div className={styler.content__text}>
            <span></span>
            <span>OR</span>
            <span></span>
          </div>
          <div className={styler.content__buttons}>
            <button onClick={GoogleSignIn}>
              <span>Log in with Google</span>
            </button>
            <button onClick={Logout}>LogOut</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
