import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchForm from './SearchForm';

const meta: Meta<typeof SearchForm> = {
  title: 'Components/SearchForm',
  component: SearchForm,
};

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const Default: Story = {
  args: {
    onSearch: (query) => alert(`Searching for: ${query}`),
  },
};

export const WithInitialQuery: Story = {
  args: {
    initialQuery: 'Inception',
    onSearch: (query) => alert(`Searching for: ${query}`),
  },
};
