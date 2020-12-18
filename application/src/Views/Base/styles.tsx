import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
    },
    MuiFormControl:
    {
        root: {
                //margin: "1rem",
                minWidth: "15rem",
        }
    },
    MuiSelect: {
        root: {
            minWidth: "5rem"
        }
    }
  }})