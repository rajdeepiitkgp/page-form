'use client';
import { ElementsType, FormElement } from '../FormElements';
import { Label } from '../ui/label';
import { RiSeparator } from 'react-icons/ri';
import { Separator } from '../ui/separator';

const type: ElementsType = 'SeperatorField';

const DesignerComponent = () => (
  <div className='flex flex-col gap-2 w-full'>
    <Label className='text-muted-foreground'>Seperator Field</Label>
    <Separator />
  </div>
);

const PropertiesComponent = () => <p>No properties for this element</p>;
const FormComponent = () => <Separator />;

export const SeperatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: RiSeparator,
    label: 'Seperator Field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

