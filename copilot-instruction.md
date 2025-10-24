# Next.js + WordPress CF7 Form Architecture Guide

## Overview
This document explains the architectural pattern for implementing flexible, reusable forms in Next.js applications that integrate with WordPress Contact Form 7. The architecture supports dynamic field configurations, robust error handling, and can be adapted to any form requirements while maintaining a consistent integration with CF7.

## Stack Specifications
- **Frontend**: Next.js 13+ with TypeScript
- **Backend**: WordPress with Contact Form 7 plugin
- **Styling**: Tailwind CSS (recommended)
- **API**: WordPress REST API (CF7 endpoints)

## Architecture Philosophy
- **Configuration-driven**: Forms are defined by configuration objects, not hardcoded JSX
- **CF7-optimized**: Built specifically for WordPress Contact Form 7 integration
- **Type-safe**: Full TypeScript support with CF7-specific types
- **Reusable**: Single component handles any CF7 form structure
- **Extensible**: Easy to add new field types and validation rules

## Architecture Components

## Architecture Components

### 1. CF7-Specific Type System
Optimized type definitions for WordPress Contact Form 7 integration:

```typescript
// CF7 field configuration - matches WordPress field naming conventions
export interface CF7FieldConfig {
  name: string;                    // CF7 field name (your-name, your-email, etc.)
  label: string;                   // Display label
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
  placeholder?: string;
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    customValidator?: (value: any) => string | null;
  };
  options?: Array<{ value: string; label: string }>; // For select/radio fields
  rows?: number;                   // For textarea fields
  defaultValue?: any;
  className?: string;
  accept?: string;                 // For file fields
}

// CF7 form configuration
export interface CF7FormConfig {
  formId: string;                  // CF7 form ID
  unitTag?: string;                // CF7 unit tag (optional, auto-generated)
  fields: CF7FieldConfig[];
  submitButton?: {
    text: string;
    loadingText?: string;
    className?: string;
  };
  layout?: 'single-column' | 'two-column' | 'grid';
  validation?: 'on-blur' | 'on-change' | 'on-submit';
}

// CF7-specific form state
export type CF7FormState = Record<string, any> & {
  _wpcf7_unit_tag?: string;        // CF7 requires this field
};

// CF7 API response types (matches WordPress CF7 response structure)
export interface CF7InvalidField {
  field: string;
  message: string;
  idref: string | null;
  error_id: string;
}

export interface CF7Response {
  status: 'validation_failed' | 'spam' | 'aborted' | 'mail_sent' | 'mail_failed';
  message: string;
  posted_data_hash?: string;
  invalid_fields?: CF7InvalidField[];
  captcha?: string[];
}

// Normalized response for our application
export interface FormResponse {
  success: boolean;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
  data?: any;
}
```

### 2. WordPress CF7 Integration Layer
Optimized specifically for WordPress Contact Form 7 API:

```typescript
// CF7 API configuration
export interface CF7Config {
  wpSiteUrl: string;               // WordPress site URL
  formId: string;                  // CF7 form ID
  unitTag?: string;                // Optional unit tag override
}

// CF7-specific submission function
export async function submitToCF7(
  data: CF7FormState, 
  config: CF7Config
): Promise<FormResponse> {
  const endpoint = `${config.wpSiteUrl}/wp-json/contact-form-7/v1/contact-forms/${config.formId}/feedback`;
  
  // Create FormData with CF7-specific field name transformations
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    // Handle CF7 field name conventions
    let fieldName = key;
    
    // Transform common field names to CF7 format
    if (key === 'name') fieldName = 'your-name';
    if (key === 'email') fieldName = 'your-email';
    if (key === 'subject') fieldName = 'your-subject';
    if (key === 'message') fieldName = 'your-message';
    if (key === 'phone') fieldName = 'your-phone';
    
    // Keep underscored fields as-is (like _wpcf7_unit_tag)
    if (key.startsWith('_')) fieldName = key;
    
    // Handle file uploads
    if (value instanceof FileList) {
      Array.from(value).forEach(file => formData.append(fieldName, file));
    } else {
      formData.append(fieldName, String(value));
    }
  });
  
  // Add unit tag if provided
  if (config.unitTag) {
    formData.append('_wpcf7_unit_tag', config.unitTag);
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    const result: CF7Response = await response.json();

    // Transform CF7 response to normalized format
    return {
      success: result.status === 'mail_sent',
      message: result.message,
      errors: result.invalid_fields?.map(field => ({
        field: field.field,
        message: field.message
      })) || []
    };

  } catch (error) {
    console.error('CF7 submission error:', error);
    return { 
      success: false, 
      message: 'Network error occurred. Please try again.' 
    };
  }
}

// Helper function to generate CF7 config
export function createCF7Config(wpSiteUrl: string, formId: string, unitTag?: string): CF7Config {
  return { wpSiteUrl, formId, unitTag };
}

// Predefined CF7 field configurations for common forms
export const cf7FieldTemplates = {
  contact: [
    { name: 'name', label: 'Name', type: 'text' as const, required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'subject', label: 'Subject', type: 'text' as const, required: true },
    { name: 'message', label: 'Message', type: 'textarea' as const, required: true, rows: 5 }
  ],
  
  newsletter: [
    { name: 'email', label: 'Email Address', type: 'email' as const, required: true },
    { name: 'name', label: 'First Name', type: 'text' as const }
  ],
  
  quote: [
    { name: 'name', label: 'Company Name', type: 'text' as const, required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'phone', label: 'Phone', type: 'tel' as const },
    { name: 'project-type', label: 'Project Type', type: 'select' as const, 
      options: [
        { value: 'website', label: 'Website Development' },
        { value: 'app', label: 'Mobile App' },
        { value: 'consulting', label: 'Consulting' }
      ]
    },
    { name: 'budget', label: 'Budget Range', type: 'select' as const,
      options: [
        { value: '5k-10k', label: '$5,000 - $10,000' },
        { value: '10k-25k', label: '$10,000 - $25,000' },
        { value: '25k+', label: '$25,000+' }
      ]
    },
    { name: 'message', label: 'Project Details', type: 'textarea' as const, rows: 6 }
  ]
}
```

### 3. CF7 Form Component Architecture
Optimized component specifically for WordPress Contact Form 7:

```tsx
// Component props interface
interface CF7FormProps {
  config: CF7FormConfig;           // Field definitions and CF7 settings
  wpSiteUrl: string;               // WordPress site URL
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  className?: string;
}

// CF7-optimized form component
export function CF7Form({ config, wpSiteUrl, onSuccess, onError }: CF7FormProps) {
  // 1. STATE MANAGEMENT
  const [formState, setFormState] = useState<CF7FormState>(() => {
    const initialState: CF7FormState = {};
    config.fields.forEach(field => {
      initialState[field.name] = field.defaultValue || '';
    });
    // Add CF7 unit tag if provided
    if (config.unitTag) {
      initialState._wpcf7_unit_tag = config.unitTag;
    }
    return initialState;
  });
  
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');

  // 2. FORM HANDLERS
  const handleFieldChange = (name: string, value: any) => {
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear field error on change
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    
    // Clear submit message on change
    if (submitMessage) setSubmitMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const validationErrors: Record<string, string> = {};
    config.fields.forEach(field => {
      const value = formState[field.name];
      
      // Required field validation
      if (field.required && (!value || String(value).trim() === '')) {
        validationErrors[field.name] = `${field.label} is required`;
        return;
      }
      
      // Type-specific validation
      if (value && field.validation) {
        if (field.validation.minLength && String(value).length < field.validation.minLength) {
          validationErrors[field.name] = `${field.label} must be at least ${field.validation.minLength} characters`;
        }
        if (field.validation.maxLength && String(value).length > field.validation.maxLength) {
          validationErrors[field.name] = `${field.label} must be no more than ${field.validation.maxLength} characters`;
        }
        if (field.validation.pattern && !field.validation.pattern.test(String(value))) {
          validationErrors[field.name] = `${field.label} format is invalid`;
        }
        if (field.validation.customValidator) {
          const customError = field.validation.customValidator(value);
          if (customError) {
            validationErrors[field.name] = customError;
          }
        }
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    // Submit to CF7
    setIsSubmitting(true);
    setFieldErrors({});
    
    try {
      const cf7Config = createCF7Config(wpSiteUrl, config.formId, config.unitTag);
      const result = await submitToCF7(formState, cf7Config);
      
      if (result.success) {
        setSubmitMessage(result.message || 'Thank you! Your message has been sent.');
        onSuccess?.(result.data);
        
        // Reset form
        const resetState: CF7FormState = {};
        config.fields.forEach(field => {
          resetState[field.name] = field.defaultValue || '';
        });
        if (config.unitTag) {
          resetState._wpcf7_unit_tag = config.unitTag;
        }
        setFormState(resetState);
      } else {
        setSubmitMessage(result.message || 'An error occurred. Please try again.');
        onError?.(result.message || '');
        
        // Map server errors to fields
        if (result.errors) {
          const serverErrors: Record<string, string> = {};
          result.errors.forEach(error => {
            serverErrors[error.field] = error.message;
          });
          setFieldErrors(serverErrors);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. DYNAMIC FIELD RENDERING
  const renderField = (field: CF7FieldConfig) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      value: formState[field.name] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => 
        handleFieldChange(field.name, e.target.value),
      className: `w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
        fieldErrors[field.name] ? 'border-red-500' : 'border-gray-300'
      } ${field.className || ''}`,
      placeholder: field.placeholder,
      required: field.required
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={field.rows || 4}
          />
        );
      
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select an option</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'file':
        return (
          <input
            {...commonProps}
            type="file"
            accept={field.accept}
            onChange={(e) => handleFieldChange(field.name, e.target.files)}
            className={`w-full mt-1 px-4 py-2 border rounded-lg ${
              fieldErrors[field.name] ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        );
      
      default:
        return <input {...commonProps} type={field.type} />;
    }
  };

  // 4. LAYOUT RENDERING
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {config.fields.map(field => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          {renderField(field)}
          {fieldErrors[field.name] && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors[field.name]}</p>
          )}
        </div>
      ))}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-6 rounded-lg shadow-md transition duration-300 ${
          isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-indigo-500 hover:bg-indigo-600'
        } text-white ${config.submitButton?.className || ''}`}
      >
        {isSubmitting 
          ? (config.submitButton?.loadingText || 'Sending...') 
          : (config.submitButton?.text || 'Submit')
        }
      </button>
      
      {submitMessage && (
        <p className={`text-center mt-4 ${
          submitMessage.includes('Thank you') ? 'text-green-500' : 'text-red-500'
        }`}>
          {submitMessage}
        </p>
      )}
    </form>
  );
}

## Implementation Pattern for Your Stack

### How to Use This CF7 Architecture

1. **Define Your Form Configuration**
```tsx
// Contact form for client projects
const contactFormConfig: CF7FormConfig = {
  formId: "123",  // Your CF7 form ID
  fields: cf7FieldTemplates.contact,  // Use predefined template
  submitButton: { text: 'Send Message', loadingText: 'Sending...' }
};

// Custom quote request form
const quoteFormConfig: CF7FormConfig = {
  formId: "456",
  fields: cf7FieldTemplates.quote,
  submitButton: { text: 'Request Quote', loadingText: 'Submitting...' }
};

// Newsletter signup
const newsletterConfig: CF7FormConfig = {
  formId: "789",
  fields: cf7FieldTemplates.newsletter,
  submitButton: { text: 'Subscribe', loadingText: 'Subscribing...' }
};
```

2. **Implement the Form in Your Component**
```tsx
// pages/contact.tsx or app/contact/page.tsx
export default function ContactPage() {
  return (
    <section className="max-w-2xl mx-auto py-20">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      
      <CF7Form 
        config={contactFormConfig}
        wpSiteUrl="https://your-wp-site.com"
        onSuccess={(data) => {
          // Track successful submission
          gtag('event', 'form_submit', { form_name: 'contact' });
        }}
        onError={(error) => {
          // Handle errors, maybe show toast notification
          console.error('Form submission failed:', error);
        }}
      />
    </section>
  );
}

// components/NewsletterSignup.tsx  
export function NewsletterSignup() {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
      <CF7Form 
        config={newsletterConfig}
        wpSiteUrl={process.env.NEXT_PUBLIC_WP_URL!}
        onSuccess={() => {
          // Maybe redirect or show thank you message
        }}
      />
    </div>
  );
}
```

3. **Environment Configuration**
```env
# .env.local
NEXT_PUBLIC_WP_URL=https://your-wordpress-site.com
```
```

## Key Architectural Benefits for Next.js + CF7

### ✅ **CF7-Optimized**
- **Perfect CF7 Integration**: Built specifically for WordPress Contact Form 7 API
- **Field Name Mapping**: Automatic transformation of common field names to CF7 format
- **CF7 Response Handling**: Proper parsing of CF7 status codes and error messages
- **Unit Tag Support**: Handles CF7 unit tags for form identification

### ✅ **Flexibility Within CF7**
- **Any CF7 Form**: Works with any Contact Form 7 configuration
- **Dynamic Field Types**: Supports all CF7 field types (text, email, select, file, etc.)
- **Custom Validation**: Add client-side validation on top of CF7 server validation
- **Multiple Forms**: Easy to manage multiple CF7 forms in one application

### ✅ **Developer Experience**
- **Type Safety**: Full TypeScript support with CF7-specific types
- **Reusable Templates**: Predefined field configurations for common forms
- **Environment Variables**: Easy configuration for different environments
- **Error Handling**: Comprehensive error mapping from CF7 responses

### ✅ **Production Ready**
- **Performance**: Optimized for Next.js with proper state management
- **SEO Friendly**: Works with Next.js SSR/SSG
- **Accessibility**: Proper form labels, validation, and ARIA attributes
- **Mobile Optimized**: Responsive design with Tailwind CSS

## WordPress CF7 Setup Guide

### 1. Install and Configure CF7
```php
// In your WordPress site, install Contact Form 7 plugin
// Create forms with these recommended field names:

// Contact Form
[text* your-name placeholder "Your Name"]
[email* your-email placeholder "Your Email"]  
[text your-subject placeholder "Subject"]
[textarea* your-message rows:5 placeholder "Your Message"]

// Quote Request Form  
[text* your-name placeholder "Company Name"]
[email* your-email placeholder "Email Address"]
[tel your-phone placeholder "Phone Number"]
[select project-type "Website Development" "Mobile App" "Consulting"]
[select budget "5k-10k" "10k-25k" "25k+"]
[textarea* your-message rows:6 placeholder "Project Details"]
```

### 2. Get Form IDs and Configuration
```php
// In WordPress Admin > Contact > Contact Forms
// Note the ID number for each form (e.g., "123")
// The shortcode will show: [contact-form-7 id="123" title="Contact form 1"]
```

### 3. Enable REST API (if needed)
```php
// CF7 REST API is enabled by default
// Endpoint format: /wp-json/contact-form-7/v1/contact-forms/{id}/feedback
// Make sure your WordPress site allows CORS for your Next.js domain
```

## Extension Points for CF7 Forms

### Adding New Field Types
```tsx
// Extend the CF7 field type union
type CF7FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file' | 'date' | 'number';

// Add rendering logic in the CF7Form component
case 'date':
  return (
    <input
      {...commonProps}
      type="date"
      className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-indigo-500"
    />
  );

case 'number':
  return (
    <input
      {...commonProps}
      type="number"
      min={field.min}
      max={field.max}
      step={field.step}
    />
  );

case 'checkbox':
  return (
    <div className="space-y-2">
      {field.options?.map(option => (
        <label key={option.value} className="flex items-center">
          <input
            type="checkbox"
            name={field.name}
            value={option.value}
            onChange={(e) => {
              const currentValues = (formState[field.name] as string[]) || [];
              const newValues = e.target.checked
                ? [...currentValues, option.value]
                : currentValues.filter(v => v !== option.value);
              handleFieldChange(field.name, newValues);
            }}
            className="mr-2"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
```

### Creating Custom Field Templates
```tsx
// Add new form templates for your common use cases
export const cf7FieldTemplates = {
  // ...existing templates...
  
  // Job application form
  jobApplication: [
    { name: 'name', label: 'Full Name', type: 'text' as const, required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'phone', label: 'Phone', type: 'tel' as const, required: true },
    { name: 'position', label: 'Position Applied For', type: 'select' as const,
      options: [
        { value: 'frontend', label: 'Frontend Developer' },
        { value: 'backend', label: 'Backend Developer' },
        { value: 'fullstack', label: 'Full Stack Developer' }
      ]
    },
    { name: 'resume', label: 'Resume', type: 'file' as const, accept: '.pdf,.doc,.docx' },
    { name: 'cover-letter', label: 'Cover Letter', type: 'textarea' as const, rows: 6 }
  ],
  
  // Event registration
  eventRegistration: [
    { name: 'name', label: 'Full Name', type: 'text' as const, required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'company', label: 'Company', type: 'text' as const },
    { name: 'dietary-restrictions', label: 'Dietary Restrictions', type: 'textarea' as const, rows: 3 },
    { name: 'sessions', label: 'Sessions of Interest', type: 'checkbox' as const,
      options: [
        { value: 'keynote', label: 'Keynote Session' },
        { value: 'workshop-a', label: 'Workshop A' },
        { value: 'workshop-b', label: 'Workshop B' }
      ]
    }
  ]
};
```

### Advanced CF7 Validation
```tsx
// Custom validation for specific business rules
const advancedValidation: CF7FieldConfig = {
  name: 'email',
  label: 'Business Email',
  type: 'email',
  required: true,
  validation: {
    customValidator: (value: string) => {
      // Only allow business emails (no gmail, yahoo, etc.)
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      const domain = value.split('@')[1]?.toLowerCase();
      
      if (personalDomains.includes(domain)) {
        return 'Please use a business email address';
      }
      
      return null;
    }
  }
};

// Phone number validation
const phoneValidation: CF7FieldConfig = {
  name: 'phone',
  label: 'Phone Number',
  type: 'tel',
  validation: {
    pattern: /^\(\d{3}\) \d{3}-\d{4}$/,
    customValidator: (value: string) => {
      if (value && !/^\(\d{3}\) \d{3}-\d{4}$/.test(value)) {
        return 'Please enter phone number in format: (123) 456-7890';
      }
      return null;
    }
  }
};
```

### Environment-Specific Configuration
```tsx
// utils/cf7Config.ts
export function getCF7Config() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    wpSiteUrl: isProduction 
      ? 'https://your-production-wp-site.com'
      : 'https://your-staging-wp-site.com',
    
    formIds: {
      contact: isProduction ? '123' : '456',
      newsletter: isProduction ? '124' : '457',
      quote: isProduction ? '125' : '458'
    }
  };
}

// Usage in components
export default function ContactPage() {
  const { wpSiteUrl, formIds } = getCF7Config();
  
  const contactFormConfig: CF7FormConfig = {
    formId: formIds.contact,
    fields: cf7FieldTemplates.contact,
    submitButton: { text: 'Send Message', loadingText: 'Sending...' }
  };

  return (
    <CF7Form 
      config={contactFormConfig}
      wpSiteUrl={wpSiteUrl}
      onSuccess={(data) => {
        // Environment-specific tracking
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', { form_name: 'contact' });
        }
      }}
    />
  );
}
```

## Implementation Checklist for Next.js + CF7

### 🏗️ **WordPress Setup**
- [ ] Install Contact Form 7 plugin on WordPress site
- [ ] Create CF7 forms with proper field names (your-name, your-email, etc.)
- [ ] Note form IDs from WordPress admin
- [ ] Test CF7 forms work in WordPress
- [ ] Ensure WordPress allows CORS for your Next.js domain

### 🎯 **Next.js Implementation**
- [ ] Set up TypeScript interfaces for CF7 integration
- [ ] Create CF7Form component with proper field rendering
- [ ] Implement CF7-specific API submission function
- [ ] Add environment variables for WordPress URL
- [ ] Create form configurations for each CF7 form

### 🎨 **Styling & UX**
- [ ] Apply Tailwind CSS classes for consistent styling
- [ ] Implement responsive design for mobile devices
- [ ] Add loading states and proper button feedback
- [ ] Style error messages and success notifications
- [ ] Ensure accessibility with proper labels and ARIA attributes

### 🧪 **Testing & Validation**
- [ ] Test form submission with valid data
- [ ] Test client-side validation with invalid data
- [ ] Test CF7 server-side validation and error mapping
- [ ] Test file upload functionality (if using file fields)
- [ ] Test on different devices and browsers

### 🚀 **Production Deployment**
- [ ] Set up environment-specific WordPress URLs
- [ ] Configure different form IDs for staging/production
- [ ] Set up analytics tracking for form submissions
- [ ] Test CORS configuration in production
- [ ] Monitor form submission success rates

---

**This architecture is specifically optimized for your Next.js + WordPress CF7 stack, providing a robust, type-safe, and reusable foundation for all your form needs.**
