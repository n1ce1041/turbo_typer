import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import SuggestionsList from './SuggestionsList';

describe('SuggestionsList', () => {
  it('renders grouped suggestions correctly', () => {
    const suggestions = [
      { phrase: 'First phrase', group: 'Group A' },
      { phrase: 'Second phrase', group: 'Group A' },
      { phrase: 'Third phrase', group: 'Group B' },
    ];
    render(<SuggestionsList suggestions={suggestions} />);
    expect(screen.getByText('Group A')).toBeInTheDocument();
    expect(screen.getByText('Group B')).toBeInTheDocument();
    expect(screen.getByText('First phrase')).toBeInTheDocument();
    expect(screen.getByText('Second phrase')).toBeInTheDocument();
    expect(screen.getByText('Third phrase')).toBeInTheDocument();
  });

  it('renders uncategorized group when group is missing', () => {
    const suggestions = [
      { phrase: 'First phrase', group: '' },
      { phrase: 'Second phrase', group: 'Group A' },
    ];

    render(<SuggestionsList suggestions={suggestions} />);
    expect(screen.getByText('Uncategorized')).toBeInTheDocument();
    expect(screen.getByText('First phrase')).toBeInTheDocument();
    expect(screen.getByText('Second phrase')).toBeInTheDocument();
  });
});
