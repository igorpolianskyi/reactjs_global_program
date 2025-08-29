import type { Meta, StoryObj } from '@storybook/react-vite';
import SortControl, { type SortByOption } from './SortControl';

const meta: Meta<typeof SortControl> = {
  title: 'Components/SortControl',
  component: SortControl,
  argTypes: {
    onSortChange: { action: 'sort changed' },
  },
};

export default meta;

type Story = StoryObj<typeof SortControl>;

export const ReleaseDate: Story = {
  args: {
    value: 'RELEASE DATE' as SortByOption,
  },
};

export const Title: Story = {
  args: {
    value: 'TITLE' as SortByOption,
  },
};