import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IForm, IQuestion, QuestionType } from '../../Interfaces/interface';

export interface QuestionFormState {
    // lisää tähän kaikki steitit joita tämä store tarjoaa, nämä käyttävät interfaceja tyyppeinä
    questions: IQuestion[];
    addQuestionComponent: IQuestion;
    isNewQuestion: boolean;
    refreshAddQuestionComponent: boolean;
    addFormComponent: IForm;
    forms: IForm[];
    activeForm: IForm;
}

const initialState: QuestionFormState = {
    // lisää tähän kaikki steitin initiaalit.
    questions: [],
    addQuestionComponent: {
        questionId: "00000000-0000-0000-0000-000000000000",
        questionText: "",
        questionType: QuestionType.textField,
        answerOptions: [],
        hasAdditionalOption: false,
        orderId: 0
    },
    isNewQuestion: false,
    refreshAddQuestionComponent: false,
    addFormComponent: {
        questionnaireFormId: "00000000-0000-0000-0000-000000000000",
        questionnaireName: "",
       // creationDate: new Date(),
        questionnaireDescription: "",
       // editDate: new Date()
},
    forms: [],
    activeForm: {questionnaireFormId: "00000000-0000-0000-0000-000000000000", questionnaireName: ""}
}

const Questions = createSlice({
    name:'Questions',
    initialState,
    reducers: {
        // tähän tulee reduserit joilla voidaan mutatoida ja hakea steitin arvoja.
        // esim:
/*         setTest(state, action: PayloadAction<Test>) 
        {
            const payload = action.payload;
            const entries = Object.entries(payload);
            
            for (const [key, value] of entries)
            {
                state.test.arvo[key] = value;
            }
        }, */
        setQuestions(state, action: PayloadAction<IQuestion[]>) 
        {
            const payload = action.payload;
            state.questions = payload;
        },
        setForms(state, action: PayloadAction<IForm[]>)
        {
            const payload = action.payload;
            state.forms = payload
        },
        setAddQuestionComponentProperty(state, action: PayloadAction<{ key: string; value: any }>){
            state.addQuestionComponent[action.payload.key] = action.payload.value;
        } ,
        setAddQuestionComponent(state, action: PayloadAction<IQuestion>){
            state.addQuestionComponent = action.payload;
        },
        removeAnswerOption(state, action: PayloadAction<number>){
            const removed = state.addQuestionComponent.answerOptions.filter(item => item.id !== action.payload);
            state.addQuestionComponent.answerOptions = removed;
        },
        setIsNewQuestion(state, action: PayloadAction<boolean>){
            state.isNewQuestion = action.payload;
        },
        clearForm(state) {
            state.addQuestionComponent =
            {
                questionId: "00000000-0000-0000-0000-000000000000",
                questionText: "",
                questionType: QuestionType.textField,
                answerOptions: [],
                hasAdditionalOption: false,
                orderId: 0
            }
        },
        refreshAddQuestionComponent(state, action: PayloadAction<boolean>){
            state.refreshAddQuestionComponent = action.payload;
        },
        setQuestionnaireFormProperty(state, action: PayloadAction<{ key: string; value: any }>) {
            state.addFormComponent[action.payload.key] = action.payload.value
        },
        setAddQuestionnaireForm(state, action: PayloadAction<IForm>){
            state.addFormComponent = action.payload;
        },
        setActiveForm(state, action: PayloadAction<IForm>){
            state.activeForm = action.payload;
        }
    }
});

export const {
    // tähän kaikki exportatut steitit sitten
    setQuestions,
    setForms,
    setAddQuestionComponentProperty,
    removeAnswerOption,
    setIsNewQuestion,
    setAddQuestionComponent,
    clearForm,
    refreshAddQuestionComponent,
    setQuestionnaireFormProperty,
    setAddQuestionnaireForm,
    setActiveForm
} = Questions.actions;

export default Questions.reducer;