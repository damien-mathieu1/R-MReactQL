import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "@apollo/client";
import { getAllCharacters } from "./qgl/Query";
import React from "react";
import { useState, useRef, useEffect } from 'react'
import autoAnimate from '@formkit/auto-animate'
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(getAllCharacters, {
    variables: { page },
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    });

  useEffect(() => {
    // Update the document title using the browser API
      }, [page]);

  return (
    <div className="App">
      <header className="App-header">
           <section class="wrapper">
              <div class="top">Rickypedia</div>
              <div class="bottom" aria-hidden="true">Rickypedia</div>
            </section>
        {loading ? (
          <img src={logo} className="App-logo" alt="logo" />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          
          <div className="container">
            {data.characters.results.map((character) => {
              return (
                  <Affichage character={character}></Affichage>    
              );
            })}
            <div className="footer">
              <p>Made with ❤️ by MATHIEU Damien © 2023</p>
              <p>{page===1 ? null : <i class="fa fa-angle-left" onClick={ () => {
                setPage(page-1);
              }} ></i>}  {page}/{data.characters.info.pages}  {page===data.characters.info.pages ? null : <i class="fa fa-angle-right" onClick={()=>{
                setPage(page+1);
              }}></i>}</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

function CharacterInfo(props) {
    if (props.character.gender === "Female") {
      return <p className="textInfo">{props.character.name} is a {props.character.gender.toLowerCase()} and is a member of the {props.character.species.toLowerCase()} species. She is currently {props.character.status.toLowerCase()}. {props.character.name} comes from {props.character.location.name}. </p>; 
    }
    else{
      return <p className="textInfo">{props.character.name} is a {props.character.gender.toLowerCase()} and is a member of the {props.character.species.toLowerCase()} species. He is currently {props.character.status.toLowerCase()}. {props.character.name} comes from {props.character.location.name}. </p>;
    }
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
        <p className="nomCharacter">{this.character.name}</p>
      </div>
    );
  }
}

function Affichage(props){
  const [show, setShow] = useState(false)
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
    Aos.init({duration: 1200});
  }, [parent])

  const reveal = () => setShow(!show)

    return (
      <div ref={parent} onClick={reveal} className="containerCharacterBox" data-aos={props.character.id%2===0 ? "fade-up" : "fade-up"}>
        <CharacterBox character={props.character}/>
        { show && <CharacterInfo character={props.character}></CharacterInfo> }
      </div>      
    )
  
}

export default App;
