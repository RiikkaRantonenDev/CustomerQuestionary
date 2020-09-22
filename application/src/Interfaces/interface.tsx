import React from 'react';

export interface ILoginResponse {
    result: boolean;
}

interface IAnswerOption {
  id: number;
  text: string;
}

export interface IQuestion{
    questionId: string;
    questionText: string;
    questionType: QuestionType;
    answerOptions: IAnswerOption[];
    hasAdditionalOption: boolean; // muu, mikä?
  }


  export enum QuestionType {
    checkbox = 0,
    textField = 3,
    textBox = 4,
    radio = 1,
    dropdown = 2,
    scale = 5
}

export interface IForm {
  questionnaireFormId: string;
  questionnaireName: string;
  questionnaireDescription?: string;
  //creationDate?: Date;
 // editDate?: Date;
  questions?: IQuestion[];
}