import { logRoles, render, screen } from '@testing-library/react';
import Loader from '../Loader';
import { expect, describe, it } from 'vitest';

describe('Loader should be rendered', () => {
  it('Loader should be rendered', () => {
    render(<Loader />);
    const loadingString = screen.getByText('Loading...');

    expect(loadingString).toBeInTheDocument();
  });
  it('should be rendered insider container', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toHaveClass(
      'min-h-screen flex items-center justify-center'
    );
    expect(container.firstChild?.firstChild).toHaveClass('animate-bounce');
  });
});
