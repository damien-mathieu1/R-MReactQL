import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "@apollo/client";
import { getAllCharacters } from "./qgl/Query";
import React from "react";
import { useState, useRef, useEffect } from 'react'
import autoAnimate from '@formkit/auto-animate'

function App() {
  const { loading, error, data } = useQuery(getAllCharacters);

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <img src={logo} className="App-logo" alt="logo" />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="container">
            <section class="wrapper">
              <div class="top">Rickypedia</div>
              <div class="bottom" aria-hidden="true">Rickypedia</div>
            </section>
            {data.characters.results.map((character) => {
              return (
                    <Affichage character={character}></Affichage>                    
              );
            })}
          </div>
        )}
      </header>
    </div>
  );
}

function CharacterInfo(props) {
    return <p className="textInfo">{props.character.name} is a {props.character.gender.toLowerCase()} and is a member of the {props.character.species.toLowerCase()} species. He is currently {props.character.status.toLowerCase()}. {props.character.name} comes from {props.character.location.name}. </p>;
}

class CharacterBox extends React.Component {  
  constructor(props) {
    super(props);
    this.character = this.props.character;
  }

  render() {
    return (
      <div className="character-box">
        <div
          className="character-logo"
          style={{ backgroundImage: `url(${this.character.image})` }}
        ></div>
        <p>{this.character.name}</p>
      </div>
    );
  }
}

function Affichage(props){
  const [show, setShow] = useState(false)
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const reveal = () => setShow(!show)

    return (
      <div ref={parent} onClick={reveal} className="containerCharacterBox">
        <CharacterBox character={props.character}/>
        { show && <CharacterInfo character={props.character}></CharacterInfo> }
        
      </div>
    )
  
}

export default App;
