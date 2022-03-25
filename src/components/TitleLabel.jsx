import React from "react";
import Typography from "@mui/material/Typography";
import { makeStyles, createStyles } from '@mui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
        fontSize:'34px',
        fontWeight:"bold",
        color: '#011228',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',

        paddingLeft:'90px',

        [theme.breakpoints.down('md')]: {
          fontSize:'3 5px',
          paddingLeft:'80px',
        },

    }
  }),
);

const TitleLabel = (props) => {
    
    const classes = useStyles();

  return (
    <>
      <Typography>
        <span className={classes.title}>{props.titleLabel}</span>
      </Typography>
    </>
  );
};

TitleLabel.propTypes = {
  titleLabel: PropTypes.string.isRequired
}

export default TitleLabel;
