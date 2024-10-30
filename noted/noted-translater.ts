import OldNote from '../../types/oldNote.type.js';

const formQuestionTypesMapping: Record<string, string> = {
  radiobuttons: 'Multiple choice',
  select: 'Dropdown',
  checkboxbuttons: 'Checkboxes',
  date: 'Date',
};

function getMappedType(item: any): string {
  if (item.type && formQuestionTypesMapping[item.type]) {
    return formQuestionTypesMapping[item.type];
  } else if (item.enum) {
    if (
      item.enum.length === 2 &&
      item.enum.includes('Yes') &&
      item.enum.includes('No')
    ) {
      return 'Yes/No';
    } else {
      return 'Dropdown';
    }
  }
  return 'Paragraph';
}

export function translateNotedForm(formJson: any): OldNote[] {
  const formData = formJson?.content;
  const jsonSchema = formJson?.form?.json?.schema;
  const layout = formJson?.form?.json?.form;

  if (!jsonSchema || !layout) {
    return [];
  }

  function processLayoutItems(layoutItems: any[], dataKeyPrefix: string = ''): OldNote[] {
    const sections: any[] = [];

    for (const item of layoutItems) {
      const { type, title, items, key } = item;

      if (type === 'fieldsetcollapse' || type === 'fieldset') {
        const sectionTitle = title || '';
        const subSections = processLayoutItems(items || [], dataKeyPrefix);
        sections.push({
          title: sectionTitle,
          questions: subSections.flatMap(section => section.questions),
        });
      } else if (type === 'array') {
        const arrayKey = dataKeyPrefix ? `${dataKeyPrefix}.${key}` : key;
        const arrayFormData = getFormDataByKey(formData, arrayKey);

        if (Array.isArray(arrayFormData)) {
          for (let i = 0; i < arrayFormData.length; i++) {
            const arrayItemKeyPrefix = `${arrayKey}[${i}]`;
            const subSections = processLayoutItems(items || [], arrayItemKeyPrefix);

            sections.push({
              title: title || '',
              questions: subSections.flatMap(section => section.questions),
            });
          }
        }
      } else if (key) {
        const fullKey = dataKeyPrefix ? `${dataKeyPrefix}.${key}` : key;
        const question = processQuestion(item, fullKey);
        sections.push({
          title: '',
          questions: [question],
        });
      }
    }

    return sections;
  }

  function processQuestion(item: any, fullKey: string): OldNote {
    const { title } = item;
    const value = getFormDataByKey(formData, fullKey);
    const questionType = getMappedType(item);

    const question: any = {
      type: questionType,
      title: title || '',
      answerText: value,
      expand: true,
      required: false
    };

    if (
      questionType === 'Multiple choice' ||
      questionType === 'Dropdown' ||
      questionType === 'Checkboxes'
    ) {
      let choices = [];
      if (item.titleMap) {
        choices = item.titleMap.map((option: any) => option.name || option.value);
      } else {
        const schemaProperty = getSchemaPropertyByKey(jsonSchema, fullKey);
        if (schemaProperty && schemaProperty.enum) {
          choices = schemaProperty.enum;
        }
      }
      question.choices = choices;

      if (questionType === 'Multiple choice') {
        question.selectedOptions = choices.indexOf(value);
        question.required = item.required || false;
        question.checkboxes = choices.map((choice: string) => ({
          value: choice,
          label: choice,
          customChoice: false,
          checked: choice === value,
        }));
      } else if (questionType === 'Dropdown') {
        question.selectedOptions = choices.indexOf(value);
        question.required = item.required || false;
        question.checkboxes = [];
      } else if (questionType === 'Checkboxes') {
        question.selectedOptions = choices.reduce(
          (acc: number[], choice: string, index: number) => {
            if (Array.isArray(value) && value.includes(choice)) {
              acc.push(index);
            }
            return acc;
          },
          []
        );
        question.required = item.required || false;
        question.checkboxes = choices.map((choice: string) => ({
          value: choice,
          label: choice,
          customChoice: false,
          checked: Array.isArray(value) && value.includes(choice),
        }));
      }
    } else if (questionType === 'Yes/No') {
      question.choices = ['Yes', 'No'];
      question.selectedOptions = value === 'Yes' ? 0 : 1;
      question.required = item.required || false;
      question.checkboxes = [
        {
          value: 'Yes',
          label: 'Yes',
          customChoice: false,
          checked: value === 'Yes',
        },
        {
          value: 'No',
          label: 'No',
          customChoice: false,
          checked: value === 'No',
        },
      ];
    } else {
      question.default = value;
    }

    return question;
  }

  function getFormDataByKey(data: any, key: string): any {
    const pathSegments = key.split('.');
    let current = data;
    for (let segment of pathSegments) {
      const arrayMatch = segment.match(/(\w+)\[(\d+)\]/);
      if (arrayMatch) {
        const arrayName = arrayMatch[1];
        const index = parseInt(arrayMatch[2], 10);
        if (current[arrayName] && Array.isArray(current[arrayName])) {
          current = current[arrayName][index];
        } else {
          return null;
        }
      } else {
        if (current && current.hasOwnProperty(segment)) {
          current = current[segment];
        } else {
          return null;
        }
      }
    }
    return current;
  }

  function getSchemaPropertyByKey(schema: any, key: string): any {
    const pathSegments = key.split('.');
    let current = schema;
    for (let segment of pathSegments) {
      const arrayMatch = segment.match(/(\w+)\[(\d+)\]/);
      if (arrayMatch) {
        const arrayName = arrayMatch[1];
        if (current.properties && current.properties[arrayName]) {
          current = current.properties[arrayName];
          if (current.type === 'array' && current.items) {
            current = current.items;
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        if (current.properties && current.properties[segment]) {
          current = current.properties[segment];
        } else {
          return null;
        }
      }
    }
    return current;
  }

  return processLayoutItems(layout);
}

export function transformFormToOldNote(form: OldNote[]): OldNote[] {
  return form.map(section => {
    const newSection = {
      title: section.title,
      answers: section.questions?.map(question => {
        const { answerText, selectedOptions, ...rest } = question;
        let newQuestion = { ...rest };

        // Rename 'answerText' to 'answer' if it exists
        if (answerText !== undefined) {
          newQuestion.answer = answerText;
        }

        // For 'Checkboxes' type, transform 'selectedOptions' to 'selectedChoices'
        if (question.type === 'Checkboxes' && selectedOptions) {
          const selectedChoices: any[] = [];
          selectedOptions.forEach((index: number) => {
            if (question.choices?.[index]) {
              selectedChoices.push(question.choices[index]);
            }
          });
          newQuestion.selectedChoices = selectedChoices;
        }

        return newQuestion;
      }) ?? [],
    };
    return newSection;
  });
}
