import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// Mock Next.js image
jest.mock('next/image', () => {
  return function MockedImage(props) {
    // Remove Next.js specific props that don't exist on regular img elements
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { priority, ...imgProps } = props
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...imgProps} alt={props.alt || ''} />
  }
})
