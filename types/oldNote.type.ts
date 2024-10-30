interface OldNote {
    type?: string;
    title?: string;
    answer?: string;
    answers?: OldNote[];
    answerText?: string;
    questions?: OldNote[];
    expand?: boolean;
    default?: any;
    choices?: string[];
    required?: boolean;
    checkboxes?: any[];
    selectedOptions?: any[];
    selectedChoices?: any[];
  }
  
  export default OldNote;
  