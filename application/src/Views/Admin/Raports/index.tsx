import React, { Children, useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Collapse, createStyles, Grid, IconButton, Link, List, ListItem, ListItemText, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from '@material-ui/core';
import { QuestionFormState, setQuestionnaireReport, setQuestionnaireReportSummary, setQuestions } from '../../../Store/Questions/questionsSlice';
import { RootState } from '../../../Store/rootReducer';
import MaterialTable from 'material-table';
import { ICustomerAnswer, IQuestion, IReport } from '../../../Interfaces/interface';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Description from '@material-ui/icons/Description';
import { Navigation } from '../Components/Navigation';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  toolBar: {
    backgroundColor: '#12345'
  }
});

const useStyles = makeStyles((theme : Theme) => 
  createStyles({
    toolBar:
    {
      height: '2rem',
      backgroundColor: '#dadada'
    }
  })
)


// A row for the table.
function Row(props: { row: IReport }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>

        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">123</TableCell>
        <TableCell align="right">{row.customerId}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowDownIcon></KeyboardArrowDownIcon> : <KeyboardArrowUpIcon></KeyboardArrowUpIcon>}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Vastaukset
              </Typography>
              <Table size="small" aria-label="purchases" style={{marginBottom: '2rem'}}>
                <TableHead>
                  <TableRow>
                    <TableCell>Kysymyksen teksti</TableCell>
                    <TableCell>Kysymyksen vastaus</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.customerAnswerDTOs.map((answer) => (
                    <TableRow key={answer.questionGuid}>
                      {/* <TableCell>{answer.questionGuid}</TableCell> */}
                      <TableCell component="th" scope="row">
                        {answer.questionText}
                      </TableCell>
                      <TableCell>
                        {(answer.multiSelectionContent?.length) ? ("Valinnainen vastaus: " + answer.content) : answer.content}
                        {answer.multiSelectionContent?.map(selection => 
                          <li style={{listStyle: "none"}}>
                            {selection.isSelected ? <i className="material-icons"> check</i> : <i className="material-icons">clear</i>} 
                            {selection.optionText} 
                          </li>)
                        }
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Main component.
export const Reports = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const questionState = useSelector((state: RootState) => state.questionReducer);
  const params: { [paramName: string]: string | number | boolean | undefined  } = useParams();
  const [getHeaders, setHeaders] = useState([{ title: "string", field: "string" }]);
  const [getTableData, setTableData] = useState([{id: 0, customer: 0, answers: []}]);

  useEffect(() => {
    if (params.id) {
      fetchQuestionData(params.id as string);
      getQuestionnaireFormReport(params.id);
      getQuestionnaireFormReportSummaries(params.id);
    }
  }, [params])

  useEffect(() => {
    adaptData();
  }, [questionState.questionnaireReport])

  useEffect(() => {
    generateChart();
  }, [questionState.questionnaireReportSummary])

  const generateChart = () => {
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
  }

  const getQuestionnaireFormReport = (formId: any) => {
    axios({
      method: 'GET',
      url: "https://localhost:44385/questionnaireForm/reports/" + formId
    }).then(res => {
      console.log(res.data);
      dispatch(setQuestionnaireReport(res.data));
    })
  }

  const getQuestionnaireFormReportSummaries = (formId: any) => {
    axios({
      method: 'GET',
      url: "https://localhost:44385/questionnaireForm/reports/summaries/" + formId
    }).then(res => {
      console.log(res.data);
      dispatch(setQuestionnaireReportSummary(res.data));
    })
  }

  const fetchQuestionData = (formId : string) => {
    axios({
      method: 'GET',
      url: "https://localhost:44385/questions/" + formId
    }).then(res => {
      if(res.data.questions) dispatch(setQuestions(res.data.questions as IQuestion[]))
    })
  }

  const adaptData = () => {
    setHeaders(getColumns());
    console.log(getTableData);
    questionState.questionnaireReport?.map(report => 
      setTableData(
        [...getTableData,
           {
             id: report.id, 
            customer: report.customerId,
             answers: []
          }
            ]));
    console.log(getTableData);
  }

  function push(fromArray, toArray) {
    for(let i = 0, len = fromArray.length; i < len; i++) {
           toArray.push(fromArray[i]);
    }
     return toArray;
}

  function getColumns() {

    var columns5 = [{title: 'Id', field: 'id'}, {title: 'Vastaaja', field: 'customer'}, {title: "Vastaukset", field: 'answers'}];

    /*var jee = questionState.questions.map(question => ({
        title: question.questionText,
        field: question.questionId
    })
    );
    var ret = push(jee,columns5);
*/
   // console.log(ret);
    return columns5;
  };

    return (
      <div>
          <Navigation></Navigation>
        
          <Box  style={{width: '80%', margin: 'auto'}}>
            <Box className={classes.toolBar}>
              <Button><Description></Description>Lataa .csv</Button>
              <Link>Tilastot</Link>
            </Box>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell>Vastaus ID</TableCell>
                    <TableCell align="right">Vastauksen pvm</TableCell>
                    <TableCell align="right">Vastaajan tiedot</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questionState.questionnaireReport?.map((row) =>
                  (
                    <Row key={row.id} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        {/* <Line
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
        /> */}
      </div>
    );
  }





