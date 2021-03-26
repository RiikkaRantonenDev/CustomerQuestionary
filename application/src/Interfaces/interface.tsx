import React from 'react';

export interface ILoginResponse {
    result: boolean;
}

export interface IAnswerOption {
  id: string;
  text: string;
  state: boolean;
}

export interface IQuestion{
    questionId: string;
    questionText: string;
    questionType: QuestionType;
    answerOptions: IAnswerOption[];
    orderId: number;
    hasAdditionalOption: boolean; // muu, mikä?
    multiSelectionMin: number;
    multiSelectionMax: number;
    required: boolean;
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

export interface IReport {
  id: number;
  customerId: number;
  customerAnswerDTOs: ICustomerAnswer[];
}

export interface IReportSummary {
  responses: string[];
}

export interface ICustomerAnswer {
  questionGuid: string;
  questionText: string;
  multiSelectionContent?: ISelection[];
  content: string;
  selection?: any;
}

interface ISelection {
  selectionId: number;
  optionText: string;
  isSelected: boolean;
}
/*public class FormAnswer
{
    public ObjectId _id { get; set; }
    
    public List<Answer> answers { get; set; }
}

public class Answer
{
    public Guid questionId { get; set; }
    public List<string> content { get; set; }
}*/