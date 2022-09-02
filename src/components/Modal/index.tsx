import { ReactNode, ReactElement, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: "450px",
    minHeight: "250px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: ReactElement | ReactNode;
  onClose: () => void;
}

const Title = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export interface ModalBodyProps {
  children: ReactElement | ReactNode;
}

const ModalBody = ({ children }: ModalBodyProps) => (
  <DialogContent dividers>{children}</DialogContent>
);

interface ModalProps {
  children?: ReactElement | ReactNode;
  buttonText: string;
  title: string;
  confirmText?: string;
  onConfirm?: () => void;
  cancelText?: string;
  onCancel?: () => void;
}

const Modal = ({
  children,
  buttonText,
  title,
  confirmText = "Save Changes",
  onConfirm,
}: ModalProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {buttonText}
      </Button>
      <StyledDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Title id="customized-dialog-title" onClose={handleClose}>
          {title}
        </Title>
        <Box>{children}</Box>

        {onConfirm && (
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              {confirmText}
            </Button>
          </DialogActions>
        )}
      </StyledDialog>
    </div>
  );
};

Modal.Body = ModalBody;

export default Modal;
