// MovieDetails.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import MovieDetails from './MovieDetails';
import { SAMPLE_MOVIE_PULP_FICTION } from '../../constants/constants';

const meta: Meta<typeof MovieDetails> = {
  title: 'Components/MovieDetails',
  component: MovieDetails,
};

export default meta;
type Story = StoryObj<typeof MovieDetails>;

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