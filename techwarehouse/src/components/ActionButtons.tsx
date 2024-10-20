// src/components/ActionButtons.tsx
import { IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons = ({ onEdit, onDelete }: ActionButtonsProps) => {
  return (
    <>
      <IconButton
        aria-label="Editar"
        icon={<EditIcon />}
        mr={2}
        colorScheme="yellow"
        onClick={onEdit}
      />
      <IconButton
        aria-label="Eliminar"
        icon={<DeleteIcon />}
        colorScheme="red"
        onClick={onDelete}
      />
    </>
  );
};

export default ActionButtons;
