import { render, screen } from '@testing-library/react'

// Simple test to verify Jest setup
describe('Jest Setup', () => {
  it('should work with basic test', () => {
    render(<div data-testid="test">Hello Test</div>)
    expect(screen.getByTestId('test')).toBeInTheDocument()
  })
})
