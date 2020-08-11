import React from 'react';
import { QuestionList } from './Components/questionList';
import { QuestionForm } from './Components/questionForm';

export const QuestionManager = () => 
{
   
    return(
        <>
        <QuestionList />
        <QuestionForm></QuestionForm>
        {/* Add new question */}
        {/* Edit/Delete/Deactivate? question */}
        </>
    )
}