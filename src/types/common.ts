export interface FetchWPAPIResponse<T> {
  data: T;
}

export interface PostsWPData {
  posts: {
    edges: {
      node: {
        id: string;
        title: string;
        content: string;
        excerpt: string;
        slug: string;
        featuredImage: {
          node: {
            link: string;
            sourceUrl: string;
          };
        };
        categories: {
          nodes: {
            name: string;
            slug: string;
          }[];
        };
        tags: {
          nodes: {
            name: string;
            link: string;
            slug: string;
          }[];
        };
      };
    }[];
  };
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  tags: {
    nodes: {
      name: string;
      link: string;
      slug: string;
    }[];
  };
  slug: string;
  featuredImage: {
    node: {
      link: string;
      sourceUrl: string;
    };
  };
}


{
  /* contact form */
}
export interface FormState {
  your_name: string;
  your_email: string;
  your_subject: string;
  your_message: string;
  _wpcf7_unit_tag: string;
}

// Interface for invalid fields from the API response
export interface InvalidField {
  field: string;
  message: string;
  idref: string | null;
  error_id: string;
}

// Interface for the response from submitContactForm
export interface ContactFormResponse {
  success: boolean;
  message?: string;
  invalid_fields?: InvalidField[];
}