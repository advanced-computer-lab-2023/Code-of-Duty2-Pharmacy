import { FC } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

interface DeletionModalProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  title: string;
  description: string;
  secondaryButtonText?: string;
  primaryButtonText?: string;
}

const DeletionModal: FC<DeletionModalProps> = ({
  open,
  handleClose,
  handleDelete,
  title,
  description,
  secondaryButtonText = "Cancel",
  primaryButtonText = "Delete"
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
    </DialogContent>
    <DialogActions sx={{ pt: 2, pr: 4, pb: 3 }}>
      <Button onClick={handleClose} sx={{ color: "black" }}>
        {secondaryButtonText}
      </Button>
      <Button onClick={handleDelete} color="error" variant="contained" autoFocus>
        {primaryButtonText}
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeletionModal;
