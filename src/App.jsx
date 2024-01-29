import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [data,setData] = useState({})
  const [query, setQuery] = useState('')
  const [repo,setRepo] = useState([])

  let handleChange = (e)=>{
    setQuery(e.target.value)
  }

  const fetchResult = async e =>{

    e.preventDefault();

    const profile = await fetch("https://api.github.com/users/"+query)
    const profileJson = await profile.json();
    
    const repo = await fetch(profileJson.repos_url);
    const repoJson = await repo.json(); 

    if(profileJson){
      setData(profileJson);
      setRepo(repoJson);
    }
    console.log(profileJson)
    
  }




  return (
    <>
      <div className="container">
        <h1>Search for the user!</h1>
        <input type="text" placeholder='username' value={query} onChange={handleChange} />
        <button onClick={fetchResult}>Search</button>
      </div>

      <div className="result-container">
        <h2>Results</h2>
        <p>Name: {data.login}</p>
        <p>Location: {data.location}</p>
        <p>Repositories: {data.public_repos}</p>
      </div>

    </>
  )
}

export default App
