import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component.jsx';
import SearchBox from './components/search-bar/search-box.component.jsx';



const App = () => {

  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users) => setMonsters(users));
  }, []);


  useEffect(() => {

    const newFilteredMonsters = monsters.filter( (monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);


  const onSearchChange = (event) => {   
      const searchFieldString = event.target.value.toLocaleLowerCase(); 
      setSearchField(searchFieldString);
  };

  


  return (
    <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>

        <SearchBox 
          className='monsters-search-box'
          onChangeHandler={onSearchChange} 
          placeholder='search monsters' />

        <CardList monsters={filteredMonsters} />
   
      </div>
  );
};


export default App;
