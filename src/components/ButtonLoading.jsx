import React from 'react';
import Button from '@mui/material/Button';
import { makeStyles, createStyles } from "@mui/styles"
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) =>
  createStyles({
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
      blank :{
        opacity: 0
      }
  })
);

const ButtonLoading = (props) => {

    const classes = useStyles();

    return (
        <>
        <Button
        style={{backgroundColor:'#F26E09'}}
        size="large"
        fullWidth={props.fullWidth}
        type="submit"
        variant="contained"
        className={props.className}
        disabled={props.isLoading || props.disabled}
        onClick={props.onClick}
        >
            {props.label}
            {props.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </Button>
        </>
    )
}

ButtonLoading.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool,
    size: PropTypes.string
}

export default ButtonLoading
