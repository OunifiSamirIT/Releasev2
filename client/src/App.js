import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Card from "./pages/Card";
import Details from "./pages/Details";
import Info from "./pages/InfoRelease";
import InfoDetails from "./pages/infodetails";
///////////////
import Navbar from "./components/Navbar";
import Homeee from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Switch } from "react-router";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import Protectedroute from "./ProtectedRoute";
import { Fragment, useEffect, useState } from "react";
import Build from "./components/Build";
import UploadFile from "./components/UploadFile";
import HomeeeRE from "./pages/Home";
import Fileapk from "./pages/fileapk";
import Qr from "./pages/QRCODE"
function App() {
  const [auth, setauth] = useState(false);
  const [auth1, setauth1] = useState(true);
  const isLoggedIn = async () => {
    try {
      const res = await fetch("/auth", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 200) {
        setauth(true);
        setauth1(false);
      }
      if (res.status === 401) {
        setauth(false);
        setauth1(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
      
      <Fragment>
        <BrowserRouter>
      <Navbar auth={auth1}/>
      <Switch>
      <Route exact path="/" component={Homeee} />
        <Route exact path="/upload" component={Fileapk} />

        <Route exact path="/about" component={About} />
        <Route exact path="/service" component={Services} />
        <Route exact path="/contact" component={Contact} />
        <Protectedroute exact path="/login" component={Login} auth={auth1}/>
        <Protectedroute exact path="/register" component={Register} auth={auth1}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Protectedroute exact path="/dashboard" component={Dashboard} auth={auth}/>
        <Protectedroute exact path="/Release" component={HomeeeRE} auth={auth}/>
        <Protectedroute exact path="/logout" component={Logout} auth={auth}/>
        <Protectedroute exact path="/build" component={Build} auth={auth}/>
        <Protectedroute exact path="/uploadFile" component={UploadFile} auth={auth}/>
        <Protectedroute exact path="/:id" component={Details} auth={auth}/>
        <Protectedroute exact path="/info/:id" component={Info} auth={auth}/>
        <Protectedroute exact path="/qrcode/:id" component={Qr} auth={auth}/>
        <Protectedroute exact path="/Android/:id" component={InfoDetails} auth={auth}/>

        {/* <Protectedroute exact path="/card" component={Card} /> */}
        
        <Route exact path="/card" component={Card} />
      </Switch>
      <Footer/></BrowserRouter>
      </Fragment>
  );
}

export default App;
