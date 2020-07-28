import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store/rootReducer';


export default function Base() {
    const test = useSelector((state: RootState) => state.testReducer);
    const dispatch = useDispatch();

    return (
      <Button variant="contained" color="primary">
        Testi arvo {test.test.arvo}
      </Button>
    );
  }