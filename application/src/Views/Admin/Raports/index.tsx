import React from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Paper } from '@material-ui/core';
import { setQuestionnaireReport } from '../../../Store/Questions/questionsSlice';
import { RootState } from '../../../Store/rootReducer';

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

export const Reports = () => {
  const dispatch = useDispatch();
  const questionState = useSelector((state: RootState) => state.questionReducer);
  const params: { [paramName: string]: string | number | boolean | undefined  } = useParams();

  const getQuestionnaireFormReport = (id: any) => {
    axios({
      method: 'GET',
      url: "https://localhost:44385/questionnaireForm/reports/" + id
    }).then(res => {
      console.log(res.data);
      dispatch(setQuestionnaireReport(res.data));
    })
  }

    return (
      <div>
          <Button onClick={() => getQuestionnaireFormReport(params.id)}>Hae</Button>
          {questionState.questionnaireReport?.map((report) => 
          <Paper>
          <Grid container>
              <Grid item style={{padding: "1rem"}}>ID: {report.id}</Grid>
              <Grid item style={{padding: "1rem"}}>Asiakas ID: {report.customerId}</Grid>
              <Grid item style={{padding: "1rem"}}>Vastaukset: {report.customerAnswerDTOs?.map((answer) => 
              <Grid item><span style={{fontWeight: "bold"}}>{answer.questionText}</span>: {answer.content}</Grid>)}</Grid>
          </Grid>
          </Paper>)}
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
