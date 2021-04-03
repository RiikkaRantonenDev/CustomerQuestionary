import { Box, createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Store/rootReducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);



export const Charts = () => {
    const classes = useStyles();
    const questionState = useSelector((state: RootState) => state.questionReducer);

    const getReportForData = (questionGuid : number) => {
        axios({
            method: 'POST',
            url: "https://project.sprantonen.com/reports/" + questionState.activeForm.questionnaireFormId,
            data: questionGuid
          }).then(res => {
    
          });
    } 

    const createMenuItems = () => {
        return (
            questionState.questions.map(question =>
                <MenuItem>{question.questionText}</MenuItem>
            )
        )
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        getReportForData(event.target.value as number);
      };

    return
    (
        <Box>
             <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={1}
                onChange={handleChange}
                >
                    {createMenuItems()}
                </Select>
            </FormControl>
        </Box>
    )
}