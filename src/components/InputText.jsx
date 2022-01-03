import { useEffect, useState } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { Typography, TextField } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import PropTypes from "prop-types";

let theme = createTheme();
// eslint-disable-next-line
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) =>
  createStyles({
    TextField: {
      msUserSelect: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      
    },
    TextFieldCapitalize: {
      "& input": {
        textTransform: "capitalize",
      },
    },
    TextFieldCenter: {
      "& input":{
      textAlign:'center'
      },
    },
    InputAdornment: {
      color: "gray",
    },
    titleLabel: {
      color: "#999CA0",
      msUserSelect: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
    },
  })
);

const InputText = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(props.defaultValue);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onValueChange = (event) => {
    setValue(event.target.value);
    props.onChange(event);
  };

  return (
    <>
      <Typography className={classes.titleLabel} mt={2} mb={1} variant="h5">
        {props.label}
      </Typography>

      <TextField
        placeholder={props.placeHolder}
        hiddenLabel
        size="small"
        autoComplete="off"
        error={props.error}
        helperText={props.helperText}
        fullWidth={props.fullWidth}
        required={props.required}
        className={`
            ${classes.TextField}
            ${props.capitalize && classes.TextFieldCapitalize}
            ${props.textCenter && classes.TextFieldCenter}
            `}
        id={props.id}
        autoFocus={props.autoFocus}
        defaultValue={props.defaultValue}
        type={props.type}
        variant="outlined"
        onChange={(event) => onValueChange(event)}
        value={value}
        disabled={props.disabled}
        inputProps={{style: {fontSize:'20px'}}}
      />
    </>
  );
};

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
  capitalize: PropTypes.bool,
  textCenter: PropTypes.bool,
  required: PropTypes.bool,
};

InputText.defaultProps = {
  capitalize: false,
  textCenter: false
};

export default InputText;
