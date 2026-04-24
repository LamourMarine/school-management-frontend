import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import type { AuthContextType } from '../../context/AuthContext';
import Navbar from './Navbar';

// On déclare un type d'args personnalisé
interface NavbarArgs {
  authContext: AuthContextType;
}

const meta: Meta<NavbarArgs> = {
  title: 'Layout/Navbar',
  component: Navbar,
  decorators: [
    (Story, context) => (
      <MemoryRouter>
        <AuthContext.Provider value={context.args.authContext}>
          <Story />
        </AuthContext.Provider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<NavbarArgs>;

export const TeacherView: Story = {
  args: {
    authContext: {
      user: { username: 'prof.dupont', email: 'dupont@school.fr', role: 'TEACHER' },
      token: 'fake-token',
      isAuthenticated: true,
      isLoading: false,
      login: async () => {},
      register: async () => {},
      logout: () => {},
    },
  },
};

export const AdminView: Story = {
  args: {
    authContext: {
      user: { username: 'admin', email: 'admin@school.fr', role: 'ADMIN' },
      token: 'fake-token',
      isAuthenticated: true,
      isLoading: false,
      login: async () => {},
      register: async () => {},
      logout: () => {},
    },
  },
};