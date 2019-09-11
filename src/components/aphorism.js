import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import notes from '../notes.json';
import { toggleBookmarkItem, isBookmarked } from '../bookmarks';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles(theme => ({
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

export default ({ text, updateBookmarked }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  useEffect(() => {
    setBookmarked(isBookmarked(text));
  }, []);

  return (
    <Card className={classes.card}>
      <CardContent>{text}</CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton>
          <CommentIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setBookmarked(toggleBookmarkItem(text));
            updateBookmarked();
          }}
        >
          {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
        {notes[text] && (
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
      </CardActions>
      {notes[text] && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="caption">{notes[text]}</Typography>
          </CardContent>
        </Collapse>
      )}
    </Card>
  );
};
