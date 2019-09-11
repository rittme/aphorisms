import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { makeStyles } from '@material-ui/core/styles';

import ProcrustesImg from '../greek.jpg';
import data from '../data.json';

const useStyles = makeStyles(theme => ({
  header: {
    flexGrow: 1
  },
  logo: {
    width: 300,
    height: 375,
    background: `url(${ProcrustesImg})`,
    backgroundSize: 'contain',
    textAlign: 'center',
    padding: '83px 10px',
    boxSizing: 'border-box',
    color: '#ffffff',
    textShadow: '0px 0px 3px rgba(0,0,0,0.9)',
    borderRadius: 0
  },
  logoTitle: {
    fontSize: 42,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  logoSubtitle: {
    borderTop: '1px solid #ffffff',
    boxShadow: '0px -1px 0px rgba(0,0,0,0.4)',
    textShadow: '0px 0px 2px rgba(0,0,0,1)',
    paddingTop: 20
  },
  menuButton: {
    marginRight: '20px'
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 300,
    textTransform: 'capitalize'
  }
}));

export default ({ setCategory }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Paper className={classes.logo}>
        <Typography className={classes.logoTitle}>
          The bed of Procrustes
        </Typography>
        <Typography className={classes.logoSubtitle}>
          Philosophical and practical Aphorisms
        </Typography>
      </Paper>
      <List>
        <ListItem button onClick={() => setCategory('Bookmarked')}>
          <BookmarkIcon />
          <ListItemText primary="Bookmarked" />
        </ListItem>
        <ListItem button onClick={() => setCategory('')}>
          <ListItemText primary="All" />
        </ListItem>
        <Divider />
        {Object.keys(data).map(text => (
          <ListItem button key={text} onClick={() => setCategory(text)}>
            <ListItemText primary={text.toLowerCase()} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Procrustes
          </Typography>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {sideList()}
      </SwipeableDrawer>
    </>
  );
};
