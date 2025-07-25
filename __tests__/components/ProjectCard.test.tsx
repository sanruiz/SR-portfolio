import { render, screen } from '@testing-library/react'
import ProjectCard from '@/components/portfolio/project-card'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockedImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ''} />
  }
})

const mockProject = {
  title: 'Test Project',
  description: 'A test project description',
  technologies: ['React', 'TypeScript', 'Next.js'],
  imageUrl: '/images/test-project.jpg',
  projectUrl: 'test-project-slug',
  excerpt: 'This is a test excerpt for the project'
}

describe('ProjectCard Component', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard {...mockProject} />)
    
    // Check if the title is rendered
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    
    // Check if technologies are displayed
    expect(screen.getByText('React, TypeScript, Next.js')).toBeInTheDocument()
  })

  it('renders the project image with correct attributes', () => {
    render(<ProjectCard {...mockProject} />)
    
    const image = screen.getByAltText('Test Project Thumbnail')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/test-project.jpg')
    expect(image).toHaveAttribute('height', '192')
    expect(image).toHaveAttribute('width', '480')
  })

  it('renders correct links to project page', () => {
    render(<ProjectCard {...mockProject} />)
    
    const imageLink = screen.getByRole('link', { name: /test project thumbnail/i })
    const textLink = screen.getByRole('link', { name: /view project/i })
    
    expect(imageLink).toHaveAttribute('href', '/project/test-project-slug')
    expect(textLink).toHaveAttribute('href', '/project/test-project-slug')
  })

  it('has the correct CSS classes for styling', () => {
    render(<ProjectCard {...mockProject} />)
    
    const card = screen.getByText('Test Project').closest('div')?.parentElement
    expect(card).toHaveClass('bg-slate-800', 'rounded-lg', 'shadow-lg')
  })

  it('displays technologies as comma-separated string', () => {
    const projectWithManyTechs = {
      ...mockProject,
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Jest']
    }
    
    render(<ProjectCard {...projectWithManyTechs} />)
    
    expect(screen.getByText('React, TypeScript, Next.js, Tailwind CSS, Jest')).toBeInTheDocument()
  })
})
