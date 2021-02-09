import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Component Imports
import Header from "./components/navigation/Header";
import Footer from "./components/Footer";
// Screen Imports
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CreateGameScreen from "./screens/CreateGameScreen";
import UpdateGameScreen from "./screens/UpdateGameScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import GameScreen from "./screens/GameScreen";

function App() {
  return (
    <Router>
      <Header />
      <Route path='/login' component={LoginScreen} />
      <Route path='/register' component={RegisterScreen} />
      <Route path='/newgame' component={CreateGameScreen} />
      <Route path='/games/:id' component={GameScreen} exact />
      <Route path='/games/:id/edit' component={UpdateGameScreen} />
      <Route path='/games' component={HomeScreen} exact />
      <Route path='/myprofile' component={UserProfileScreen} />
      <Route path='/' component={HomeScreen} exact />
      <Footer />
    </Router>
  );
}

export default App;
