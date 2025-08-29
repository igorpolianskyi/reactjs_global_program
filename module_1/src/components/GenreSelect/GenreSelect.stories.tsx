import type { Meta, StoryObj } from '@storybook/react-vite';
import GenreSelect from './GenreSelect';
import { GENRES } from '../../constants/constants'; // <- імпорт твоєї константи

const meta: Meta<typeof GenreSelect> = {
  title: 'Components/GenreSelect',
  component: GenreSelect,
};

export default meta;
type Story = StoryObj<typeof GenreSelect>;

export const Default: Story = {
  args: {
    genres: GENRES,
    selectedGenre: GENRES[0],
    onSelect: (genre) => alert(`Selected: ${genre}`),
  },
};

export const WithSelectedGenre: Story = {
  args: {
    genres: GENRES,
    selectedGenre: 'COMEDY',
    onSelect: (genre) => alert(`Selected: ${genre}`),
  },
};