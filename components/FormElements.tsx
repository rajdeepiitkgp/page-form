import { ElementType, FC } from 'react';
import { TextFieldFormElement } from './fields/TextField';

export type ElementsType = 'TextField';
export type SubmitFunction = (key: string, value: string) => void;
export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerBtnElement: {
    icon: ElementType;
    label: string;
  };
  designerComponent: FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInValid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: FC<{
    elementInstance: FormElementInstance;
  }>;
  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};

