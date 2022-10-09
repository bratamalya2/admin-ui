import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/searchBar';
import List from './components/list';
import Footer from './components/footer';
import dataUrl from './config/data';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// study useCallback and modularize code
// add responsiveness and styling

function App() {
  const [apiData, setApiData] = useState([]);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [allSelected, setAllSelected] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const modifyUser = ({ id, newUser }) => {
    let users = [...data];
    users = users.map(user => {
      if (user.id === id) {
        if (newUser.name !== user.name && newUser.name.length > 0) {
          user.name = newUser.name;
        }
        if (newUser.email !== user.email && newUser.email.length > 0) {
          user.email = newUser.email;
        }
        if (newUser.role !== user.role && newUser.role.length > 0) {
          user.role = newUser.role;
        }
      }
      return user;
    });
    setData(users);
  }

  const deleteUser = (id) => {
    let users = [...data];
    users = users.filter(user => user.id !== id);
    setData(users);
  }

  const deleteUsers = ([...ids]) => {
    let users = [...data];
    users = users.filter(user => {
      if(ids.includes(user.id)) {
        return false;
      }
      else {
        return true;
      }
    });
    setData(users);
    setSelectedIds([]);
    setAllSelected(false);
  }

  const filterUsers = useCallback(() => {
    let users = [...apiData];
    users = users.filter(user => user.name.includes(searchText) || user.email.includes(searchText) || user.role.includes(searchText));
    setData(users);
  }, [apiData, searchText]);

  useEffect(() => {
    async function getData() {
      let x = await (await fetch(dataUrl)).json();
      setApiData(x);
      setData(x);
    }
    getData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setPages(Math.ceil(data.length / 10));
      setCurrentPage(1);
    }
  }, [data]);

  useEffect(() => {
    if (searchText.length > 0) {
      filterUsers();
    }
    else {
      setData(apiData);
    }
  }, [searchText, apiData, filterUsers]);

  useEffect(() => {
    if(allSelected) {
      setAllSelected(curr => !curr);
      setSelectedIds([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="App">
      <SearchBar searchText={searchText} setSearchText={(text) => setSearchText(text)} />
      <List
        users={data}
        modifyUser={(id, newUser) => modifyUser(id, newUser)}
        deleteUser={(id) => deleteUser(id)}
        currentPage={currentPage}
        allSelected={allSelected}
        setAllSelected={setAllSelected}
        selectedIds={selectedIds}
        addCurrentId={(id) => {
          if(!selectedIds.includes(id)) {
            setSelectedIds(currIds => [...currIds, id]);
          }
        }}
        removeCurrentId={(id) => {
          if(selectedIds.includes(id)) {
            setSelectedIds(currIds => currIds.filter(currId => currId!==id));
          }
        }}
      />
      <Footer
        pages={pages}
        currentPage={currentPage}
        changeCurrentPage={(i) => setCurrentPage(i)}
        selectedIds={selectedIds}
        deleteUsers={() => deleteUsers(selectedIds)}
      />
    </div>
  );
}

export default App;
