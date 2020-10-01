import { Box, Breadcrumbs, Link } from '@material-ui/core';
import { RedoOutlined } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Store/rootReducer';

export const Navigation = (props: {currentPage?: string}) => {
    const FormsState = useSelector((state: RootState) => state.questionReducer);

  const getCurrentPageName = () => {
    let name;

    if (props.currentPage) {
      name = props.currentPage;
    }
    else {
      name = FormsState.activeForm.questionnaireName;
    }
    return(
      <span>{name}</span>
    )
  }

    return (
        <Box style={{margin: "1rem"}}>
        <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/form/management" >
          Lomakkeet
        </Link>
        {getCurrentPageName()}
      </Breadcrumbs>
      </Box>
    )
}