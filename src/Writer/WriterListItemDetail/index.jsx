import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Container from '../../Shared/Container';

import { GET_WRITER } from '../queries';
import Loading from '../../Shared/components/Loading';
import ErrorMessage from '../../Error';
import BookContainer from '../../Book';
import CreateBook from '../../Book/CreateBook';
import WriterListItemDetail from './WriterListItemDetail';

const WriterListItemDetailContainer = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_WRITER, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="app-content_small-header">
        <WriterListItemDetail
          writer={data.writer}
        />
        <br />
        <BookContainer
          writerId={data.writer.id}
        />
        <Button onClick={handleOpen}>Aggiungi nuovo libro</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Container>
            <CreateBook writerId={data.writer.id} />
          </Container>
        </Modal>
      </div>
    </div>
  );
};

export default WriterListItemDetailContainer;
