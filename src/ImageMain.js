import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
  card: {
    // padding: theme.spacing(2),
    width: "100%",
    maxWidth: 1000,
  }
  
}));

const Card = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.cardContainer}>
      <Paper className={classes.card} elevation={3}>
        {children}
      </Paper>
    </div>
  );
};

export default Card;
