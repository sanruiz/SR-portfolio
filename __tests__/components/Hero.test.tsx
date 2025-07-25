import { render, screen } from '@testing-library/react'
import Hero from '@/components/hero'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockedImage({ priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) {
    // Remove priority prop as it's not a valid HTML img attribute
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = priority
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ''} />
  }
})

describe('Hero Component', () => {
  it('renders the hero section with correct content', () => {
    render(<Hero />)
    
    // Check if the main heading is present
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/Hi, I'm/)).toBeInTheDocument()
    expect(screen.getByText(/Santiago Ramirez/)).toBeInTheDocument()
    expect(screen.getByText(/Senior Web Developer/)).toBeInTheDocument()
  })

  it('displays the description text', () => {
    render(<Hero />)
    
    expect(screen.getByText(/Specializing in modern web technologies/)).toBeInTheDocument()
    expect(screen.getByText(/Next.js and GraphQL/)).toBeInTheDocument()
  })

  it('renders call-to-action buttons with correct links', () => {
    render(<Hero />)
    
    const portfolioButton = screen.getByRole('link', { name: /view portfolio/i })
    const contactButton = screen.getByRole('link', { name: /contact me/i })
    
    expect(portfolioButton).toBeInTheDocument()
    expect(portfolioButton).toHaveAttribute('href', '#portfolio')
    
    expect(contactButton).toBeInTheDocument()
    expect(contactButton).toHaveAttribute('href', '#footer')
  })

  it('renders the profile image with correct attributes', () => {
    render(<Hero />)
    
    const image = screen.getByAltText('Developer Graphic')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/SantiagoR-web.png')
    expect(image).toHaveAttribute('width', '400')
    expect(image).toHaveAttribute('height', '400')
  })

  it('has the correct CSS classes for styling', () => {
    render(<Hero />)
    
    const section = screen.getByText(/Hi, I'm/i).closest('section')
    expect(section).toHaveClass('bg-gradient-to-r', 'from-gray-900', 'via-gray-800', 'to-gray-900')
  })
})
