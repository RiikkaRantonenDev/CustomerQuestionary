import React from 'react';
import { useForm } from "react-hook-form";

type QuestionForm = {
    type: QuestionTypes;
    question: string;
    additionalAnswer: boolean;
}

enum QuestionTypes {
    text,
    checkbox,
    radio
}

export const QuestionForm = () => {
    const {register} = useForm<QuestionForm>();

    return(
        <form>
            <label htmlFor="question">Kysymys</label>
            <input name="question" type="input"></input>
        </form>
    )
}