import { useEffect, useState } from 'react';
import './App.css';
import ResultNotFound from './ResultNotFound.png';

function App() {
  return (
    <div className="App" style={{ marginTop: '5%'}}>
      <h2>Github Profile Finder</h2>
      <Demo />  
    </div>
  );
}

function Demo(){

  const [inputValue, UpdateInputValue] = useState("");

  const [search, updatesearch] = useState("");

  return (
    <div>
      <div>
        <input type='text' onChange={(event) => UpdateInputValue(event.target.value)} style={{ height: '25px' }}></input>
        <button onClick={() => {updatesearch(inputValue)}} style={{ height: '30px' }} disabled={inputValue !== ''? false : true}>Search</button>
      </div>
      <div>
        <Profile search={search}></Profile>
      </div>
    </div>
  )
}

function Profile({search}){

  //// We will fetch Github Profile here

  const [profile, updateprofile] = useState({});

  useEffect(() => {

    if (search !== '')
    {
      const fetchProfile = async () => {
        const result = await fetch('https://api.github.com/users/' + search);
        const resultJson = await result.json();
  
        console.log(resultJson);

        updateprofile(resultJson);

      }
  
      fetchProfile();
    }    
  }, [search])

  return(
    <div style={{padding: '20px'}}>
      <img src={profile.avatar_url ? profile.avatar_url : ResultNotFound} alt='Github profile'  height='300px' width='300px'></img>
      <p>{profile.name}</p>
    </div>
  );
}

export default App;

//// https://api.github.com/users/nihalbarick
