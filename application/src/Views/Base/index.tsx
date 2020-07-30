import React from 'react';
import { Button, Box, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store/rootReducer';
import axios from 'axios';
import {IForecast, setForecast} from '../../Store/forecast/forecastSlice';

export default function Base() {
    const forecast = useSelector((state: RootState) => state.forecastReducer);
    const dispatch = useDispatch();



    const getData = () => {
      axios({
        method: 'GET',
        url: "https://localhost:44385/weatherforecast"
      }).then(res => {
        const joo = res.data as IForecast[];
        dispatch(setForecast(joo));
      })
    }

    return (
      <Box>
      <Button variant="contained" color="primary" onClick={getData}>
        Testi arvo
      </Button>
      <TextField value={forecast.forecasts}>
        
      </TextField>
      </Box>
    );
  }