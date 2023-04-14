import logo from './logo.svg';
import './App.css';
import { useQuery } from '@apollo/client';
import { getAllCharacters } from "./qgl/Query";

function App() {
  const { loading, error, data } = useQuery(getAllCharacters);
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <img src={logo} className="App-logo" alt="logo" />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            {data.characters.results.map((character) => {
              return ( 
                <div className='character-box'>
                  <div className='character-logo' style={{backgroundImage: `url(${character.image})`}}></div>
                  <p>
                  {character.name}  
                  </p>
                </div>
              );
            })}            
          </div>
        )}
      </header>
    </div>
  );  
}

export default App;
