import { render, screen } from '@testing-library/react';
import Loader from '../Loader';
import { expect, describe, it } from 'vitest';

describe('Loader should be rendered', () => {
  it('should return 11km with args 11234', () => {
    render(<Loader />);
    const loadingString = screen.getByText('Loading...');

    expect(loadingString).toBeInTheDocument();
  });
});
