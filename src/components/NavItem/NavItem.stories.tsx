import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import NavItem from './NavItem';

const meta: Meta<typeof NavItem> = {
  title: 'Components/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/students']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavItem>;

export const Active: Story = {
  args: {
    label: 'Students',
    path: '/students',
  },
};

export const Inactive: Story = {
  args: {
    label: 'Courses',
    path: '/courses',
  },
};