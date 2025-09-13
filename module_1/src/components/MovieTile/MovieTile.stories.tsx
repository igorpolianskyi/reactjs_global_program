import type { Meta, StoryObj } from '@storybook/react-vite';
import { SAMPLE_MOVIE_PULP_FICTION } from '../../constants/constants';

import MovieTile from './MovieTile';


const meta: Meta<typeof MovieTile> = {
  title: 'Components/MovieTile',
  component: MovieTile,
  argTypes: {
    onClick: { action: 'clicked' },
    onEdit: { action: 'edit clicked' },
    onDelete: { action: 'delete clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof MovieTile>;

export const Default: Story = {
  args: {
    movie: SAMPLE_MOVIE_PULP_FICTION,
  },
};

export const NoGenres: Story = {
  args: {
    movie: {
      ...SAMPLE_MOVIE_PULP_FICTION,
      genres: [],
    },
  },
};

export const SingleGenre: Story = {
  args: {
    movie: {
      ...SAMPLE_MOVIE_PULP_FICTION,
      genres: ['Drama'],
    },
  },
};

export const MultipleGenres: Story = {
  args: {
    movie: {
      ...SAMPLE_MOVIE_PULP_FICTION,
      genres: ['Action', 'Adventure', 'Thriller'],
    },
  },
};