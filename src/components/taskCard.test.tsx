import { describe, it, expect } from 'vitest'; // or 'jest'
import { render, screen } from '@testing-library/react';
import TaskCard from '@/components/taskCard';

describe('TaskCard', () => {
  const mockTask = {
    id: '1',
    title: 'Finish frontend',
    description: 'Polish the UI for task cards',
    dueDate: '2025-06-20T12:00:00Z',
    status: 'in_progress',
    assignedTo: 'Mehak',
  };

  it('renders task title and description', () => {
    render(<TaskCard task={mockTask} onEdit={function (): void {
        throw new Error('Function not implemented.');
    } } onDelete={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    expect(screen.getByText('Finish frontend')).toBeInTheDocument();
    expect(screen.getByText('Polish the UI for task cards')).toBeInTheDocument();
  });

  it('shows formatted due date', () => {
    render(<TaskCard task={mockTask} onEdit={function (): void {
        throw new Error('Function not implemented.');
    } } onDelete={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    expect(screen.getByText('Due: Jun 20, 2025')).toBeInTheDocument();
  });

  it('renders assigned user name', () => {
    render(<TaskCard task={mockTask} onEdit={function (): void {
        throw new Error('Function not implemented.');
    } } onDelete={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    expect(screen.getByText('Assigned to: Mehak')).toBeInTheDocument();
  });

  it('shows status with a tag or label', () => {
    render(<TaskCard task={mockTask} onEdit={function (): void {
        throw new Error('Function not implemented.');
    } } onDelete={function (): void {
        throw new Error('Function not implemented.');
    } } />);
    expect(screen.getByText(/in_progress/i)).toBeInTheDocument();
  });
});
