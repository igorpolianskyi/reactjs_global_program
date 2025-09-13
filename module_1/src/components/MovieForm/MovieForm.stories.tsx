import React, { useState } from 'react';
import { Dialog } from '../Dialog/Dialog';
import MovieForm from './MovieForm';
import { SAMPLE_MOVIE_PULP_FICTION } from '../../constants/constants';
import styles from './MovieForm.module.css';


export default { title: 'Dialogs/Movie' };

export const AddMovie = () => {
  const [open, setOpen] = useState(true);
  return open ? (
    <Dialog title="ADD MOVIE" onClose={() => setOpen(false)}>
      <MovieForm onSubmit={(data) => console.log('Add Movie:', data)} />
    </Dialog>
  ) : null;
};

export const EditMovie = () => {
  const [open, setOpen] = useState(true);
  return open ? (
    <Dialog title="EDIT MOVIE" onClose={() => setOpen(false)}>
      <MovieForm
        initialMovie={SAMPLE_MOVIE_PULP_FICTION}
        onSubmit={(data) => console.log('Edit Movie:', data)}
      />
    </Dialog>
  ) : null;
};

export const DeleteMovie = () => {
  const [open, setOpen] = useState(true);
  return open ? (
    <Dialog title="DELETE MOVIE" onClose={() => setOpen(false)}>
      <p>Are you sure you want to delete this movie?</p>
      <div className={styles.actions}>
        <button
          className={styles.submit}
          onClick={() => {
            console.log('Confirm');
            setOpen(false);
          }}>
          Confirm
        </button>
      </div>
    </Dialog>
  ) : null;
};