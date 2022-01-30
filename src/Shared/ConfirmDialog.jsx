import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import PropTypes from 'prop-types';

const ConfirmDialog = (props) => {
  const {
    title,
    children,
    open,
    setOpen,
    onConfirm,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
        >
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  children: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

ConfirmDialog.defaultProps = {
  title: '',
};

export default ConfirmDialog;
