import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { VariableSizeList } from 'react-window';

import './App.css';
import data from './data.json';
import Header from './components/header';
import Aphorism from './components/aphorism';
import { getAllBookmarked } from './bookmarks';

const useStyles = makeStyles(theme => ({
  header: {
    flexGrow: 1
  },
  logo: {
    width: '250px'
  },
  menuButton: {
    marginRight: '20px'
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250,
    textTransform: 'capitalize'
  },
  fullList: {
    width: 'auto'
  },
  card: {
    margin: '26px 0',
    padding: '16px'
  },
  cardActions: {
    marginLeft: 'auto',
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}));

function App() {
  const [category, setCategory] = useState(
    window.localStorage.getItem('category') || Object.keys(data)[0]
  );
  const [bookmarked, setBookmarked] = useState([]);

  const categoryUpdate = cat => {
    window.localStorage.setItem('category', cat);
    setCategory(cat);
  };

  const updateBookmarked = () => {
    setBookmarked(getAllBookmarked());
  };

  useEffect(() => {
    updateBookmarked();
  }, [category]);

  const items = category === 'Bookmarked' ? bookmarked : data[category];

  let entries = items.map(text => (
    <Aphorism text={text} key={text} updateBookmarked={updateBookmarked} />
  ));

  return (
    <>
      <Header setCategory={setCategory} />
      <Typography variant="h2" align="center">
        {category}
      </Typography>
      <Container maxWidth="md">{entries}</Container>
    </>
  );
}

export default App;
