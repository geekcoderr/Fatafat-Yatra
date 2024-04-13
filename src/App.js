import { Routes, Route,} from "react-router-dom";
import { useState ,useEffect } from 'react';
import WebNav from "./components/navbar/WebNav";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Help from "./pages/Help";
import Landing from "./pages/Landing";
import Thanks from "./pages/Thanks";
import SignIn from './Authentication/SignIn';
import Register from './Authentication/Register';
import BookingList from "./components/booking/BookingList";
import Profile from "./components/booking/Profile"
import NotAvilable from './pages/NotAvilable';
import './assets/App.css'

function App() {
  
  let flag=true;
  const [authStatus,setAuthStatus]=useState(false);
  const [authentication, setAuthentication] = useState(authStatus);
  useEffect( () => {

      setAuthStatus(true);
      localStorage.setItem("isAuthenticated",authStatus);
      setAuthentication(authStatus);
      console.log('Local Storage is Set',authStatus);    
    
  },[authStatus]);


  return (
    <>
      <WebNav isAuthenticated={authentication}/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            authentication ? (
              <Home isAuthenticated={authentication} />
            ) : (
              <NotFound/>
            )
          }
        />
        <Route path="/Help" element={
          authentication ? (
            <Help isAuthenticated={authentication} />
          ) : (
            <NotFound/>
          )
        } />
        <Route
          path="/thanks"
          element={
            authentication ? (
              <Thanks  />
            ) : (
              <NotFound/>
            )
          }
        />
        <Route
          path="/BookingList"
          element={
            authentication ? (
              <BookingList  />
            ) : (
              <NotFound/>
            )
          }
        />
        <Route
          path="/profile"
          element={
            authentication ? (
              <Profile  />
            ) : (
              <NotFound/>
            )
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotAvilable />} />
      </Routes>
    </>
  );
}

export default App;