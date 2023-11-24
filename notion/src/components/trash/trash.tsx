import CustomDialogTrigger from "../global/custom-dialog-trigger";
import TrashRestore from "./trash-restore";

interface TrashProps {
  children: React.ReactNode;
}

const Trash = ({ children }: TrashProps) => {
  return (
    <CustomDialogTrigger header="Trash" content={<TrashRestore />}>
      {children}
    </CustomDialogTrigger>
  );
};

export default Trash;
