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
