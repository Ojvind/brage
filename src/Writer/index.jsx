import React from 'react';
import { Query } from 'react-apollo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import WriterList from './WriterList';
import CreateWriter from './CreateWriter';

import { GET_WRITERS } from './queries';

import Loading from '../Shared/Loading';
import ErrorMessage from '../Error';

const style = {
  position: 'absolute',
  top: '50%',
  left: '80%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  border: '2px solid red',
  boxShadow: 24,
  p: 4,
};

const WriterContainer = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Query query={GET_WRITERS} notifyOnNetworkStatusChange>
      {({
        loading, error, data, fetchMore,
      }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <ErrorMessage error={error} />;
        }
        return (
          <div className="app-content_small-header">
            <div>
              <Button onClick={handleOpen}>Create new Writer</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <CreateWriter />
                </Box>
              </Modal>
            </div>
            <div>
              <WriterList
                writers={data.writers}
                loading={loading}
                fetchMore={fetchMore}
              />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default WriterContainer;
