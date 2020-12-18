import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IAnswerOption, IForm, IQuestion, QuestionType } from '../../Interfaces/interface';

export interface QuestionFormState {
    // lisää tähän kaikki steitit joita tämä store tarjoaa, nämä käyttävät interfaceja tyyppeinä
    questions: IQuestion[];
    addQuestionComponent: IQuestion;
    isNewQuestion: boolean;
    refreshAddQuestionComponent: boolean;
    addFormComponent: IForm;
    forms: IForm[];
    activeForm: IForm;
    answers?: IQuestion[];
    editAnswerOption?: IAnswerOption;
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
        orderId: 0,
        multiSelectionMax: 0,
        multiSelectionMin: 0,
        required: false
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
    activeForm: {questionnaireFormId: "00000000-0000-0000-0000-000000000000", questionnaireName: ""},
    //editAnswerOption: {id: "", state: false, text: ""}
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
        removeAnswerOption(state, action: PayloadAction<string>){
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
                orderId: 0,
                multiSelectionMax: 0,
                multiSelectionMin: 0,
                required: false
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
        },
        setEditAnswerOption(state, action: PayloadAction<IAnswerOption>){
            console.log(action.payload);
            state.editAnswerOption = action.payload;
        },
        setAnswer(state, action: PayloadAction<{value: any; id:string, answerId:string }>){
            console.log(action.payload.answerId);
            let question = state.questions.find(question => question.questionId == action.payload.id);
            if(question) {
                question.answerOptions[action.payload.answerId].state = action.payload.value;
            }
        },
        setUpdateAnswerOption(state, action: PayloadAction<IAnswerOption>){
            let answerOption = state.addQuestionComponent.answerOptions.findIndex(option => option.id == action.payload.id);
            if(answerOption != null) {
                state.addQuestionComponent.answerOptions[answerOption].text = action.payload.text
            };
        },
        removeAnswerOptions(state, action: PayloadAction<number>){
            state.addQuestionComponent.answerOptions = [];
        },
        setWildCard(state, action: PayloadAction<{id: string, value: boolean}>)
        {
            
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
    setActiveForm,
    setAnswer,
    setEditAnswerOption,
    setUpdateAnswerOption,
    removeAnswerOptions
} = Questions.actions;

export default Questions.reducer;