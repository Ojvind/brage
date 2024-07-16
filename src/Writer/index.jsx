import React from 'react';
import { Query } from 'react-apollo';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import Container from '../Shared/Container';
import WriterList from './WriterList';
import CreateWriter from './CreateWriter';

import { GET_WRITERS } from './queries';

import Loading from '../Shared/Loading';
import ErrorMessage from '../Error';

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
              <h1>Scrittori e Scrittrici</h1>
              <Button onClick={handleOpen}>Crea nuovo scrittore</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Container>
                  <CreateWriter />
                </Container>
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
