import { useDraggable } from '@dnd-kit/core';
import { FormElement } from './FormElements';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const SidebarBtnElement = ({ formElement }: { formElement: FormElement }) => {
  const {
    designerBtnElement: { label, icon: Icon },
    type,
  } = formElement;
  const draggable = useDraggable({
    id: `designer-btn-${type}`,
    data: {
      type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      variant={'outline'}
      className={cn(
        'flex flex-col gap-2 h-[120px] w-[120px] cursor-grab',
        draggable.isDragging && 'ring-2 ring-primary'
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className='h-8 w-8 text-primary cursor-grab' />
      <p className='text-xs'>{label}</p>
    </Button>
  );
};

export default SidebarBtnElement;

export const SidebarBtnElementDragOverlay = ({
  formElement,
}: {
  formElement: FormElement;
}) => {
  const {
    designerBtnElement: { label, icon: Icon },
  } = formElement;
  return (
    <Button
      variant={'outline'}
      className='flex flex-col gap-2 h-[120px] w-[120px] cursor-grab'
    >
      <Icon className='h-8 w-8 text-primary cursor-grab' />
      <p className='text-xs'>{label}</p>
    </Button>
  );
};

