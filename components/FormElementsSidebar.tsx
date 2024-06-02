import { FormElements } from './FormElements';
import SidebarBtnElement from './SidebarBtnElement';
import { Separator } from './ui/separator';

const FormElementsSidebar = () => {
  return (
    <>
      <p className='text-sm text-foreground/70'>Drag and drop elements</p>
      <Separator className='my-2' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 place-item-center'>
        <p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>
          Layout Elements
        </p>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubTitleField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />
        <SidebarBtnElement formElement={FormElements.SeperatorField} />
        <SidebarBtnElement formElement={FormElements.SpacerField} />
        <p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>
          Form Elements
        </p>
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.NumberField} />
        <SidebarBtnElement formElement={FormElements.TextAreaField} />
      </div>
    </>
  );
};

export default FormElementsSidebar;

