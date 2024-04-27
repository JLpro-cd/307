import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";


function MyApp() {
  const [characters, setCharacters] = useState([]);


  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then(data => setCharacters(data))  
      .catch((error) => { console.log(error); });
  }, [] );

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }
/*
  function updateList(person) { 
    postUser(person)
      .then(() => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      })
}
*/

function updateList(person) { 
  postUser(person)
      .then(response => {
          if (response.status === 201) {
              return response.json(); 
          } else {
              throw Error(`Failed to post, Err: ${response.status}`);
          }
      })
      .then(savedPerson => {
          setCharacters(prevCharacters => [...prevCharacters, savedPerson]);
      })
      .catch(error => {
          console.log('Err:', error);
      });
    }

    function removeOneCharacter(index) {
      const idx = characters[index];
      const promise = fetch(`Http://localhost:8000/users/${idx._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(response => {
      if (response.status === 204) {
        console.log('Successful deletion')
        const updated = characters.filter((character, i) => i !== index);
        setCharacters(updated);
      } else {
        console.log('Failed to delete');
        //setCharacters(characters); // rolling back i think
      }
    }).catch(error => {
      console.log('Err:', error);
      //setCharacters(characters);
    })
    }

  return (
    
    <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList} />
  </div>
);
}

export default MyApp;