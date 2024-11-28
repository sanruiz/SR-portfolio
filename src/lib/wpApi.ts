import type { FetchWPAPIResponse, PostsWPData, Post } from "@/types/common";
import { WP_API_URL } from "@/lib/constants";
import type { ContactFormResponse } from "@/types/common";
/**
 * Sends a query to the WP API
 *
 * @param query : string
 * @param variables : Record<string, unknown>
 * @returns json.data: any
 *
 */
export const fetchWPAPI = async <T>(
  query: string,
  { variables }: { variables?: Record<string, unknown> } = {}
): Promise<T | null> => {
  const headers = { "Content-Type": "application/json" };

  try {
    const response = await fetch(WP_API_URL, {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const json: FetchWPAPIResponse<T> = await response.json();
    if (!response.ok) {
      const errorData = {
        status: response.status,
        message: `WP Network response was not ok: ${response.statusText}`,
        url: response.url,
      };
      console.log(errorData);
      return null;
    }

    return json.data;
  } catch (error) {
    console.log("An error occurred:", error);
    return null;
  }
};

export const GET_POSTS_QUERY = `
  query GetPosts {
    posts {
      edges {
        node {
          id
          title
          content
          excerpt
          slug
          featuredImage {
            node {
              link
              sourceUrl
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          tags {
            nodes {
              name
              link
              slug
            }
          }
        }
      }
    }
  }
`;

export async function getPostsWP(): Promise<Post[] | null> {
  const data = await fetchWPAPI<PostsWPData>(GET_POSTS_QUERY);

  if (!data || !data.posts) {
    console.error("Failed to fetch posts from WP-API");
    return null;
  }

  // Map the edges to extract node data
  return data.posts.edges.map((edge) => edge.node);
}

export const GET_PROJECT_BY_SLUG = `
  query GetProjectBySlug($id: ID!) {
  post(id: $id, idType: SLUG) {
    id
    title(format: RENDERED)
    content(format: RENDERED)
    excerpt
    featuredImage {
      node {
        link
        sourceUrl
      }
    }
    categories {
      nodes {
        name
      }
    }
    tags {
      nodes {
        name
      }
    }
  }
}
`;

export async function getProjectBySlug(slug: string) {
  const data = await fetchWPAPI<{ post: Post | null }>(GET_PROJECT_BY_SLUG, {
    variables: { id: slug },
  });

  if (!data || !data.post) {
    console.error("Failed to fetch project details");
    return null;
  }

  return data.post;
}

{
  /* REST API */
}

export const fetchRESTAPI = async <T>(
  endpoint: string,
  options: {
    method: string;
    headers?: Record<string, string>;
    body?: string;
  }
): Promise<T | null> => {
  try {
    const response = await fetch(endpoint, options);

    const json = await response.json();

    if (!response.ok) {
      const errorData = {
        status: response.status,
        message: `WP REST API response was not ok: ${response.statusText}`,
        url: response.url,
      };
      console.log(errorData);
      return null;
    }

    return json as T;
  } catch (error) {
    console.log("An error occurred during the REST API request:", error);
    return null;
  }
};

export async function submitContactForm(data: {
  your_name: string;
  your_email: string;
  your_subject: string;
  your_message: string;
  _wpcf7_unit_tag: string;
}): Promise<ContactFormResponse> {
  const endpoint =
    "https://wp.sanruiz.co/wp-json/contact-form-7/v1/contact-forms/76/feedback";

  // Create a FormData object to mimic the `--form` behavior in cURL
  const formData = new FormData();
  formData.append("your-name", data.your_name);
  formData.append("your-email", data.your_email);
  formData.append("your-subject", data.your_subject);
  formData.append("your-message", data.your_message);
  formData.append("_wpcf7_unit_tag", data._wpcf7_unit_tag);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData, // Send the FormData directly
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Submission failed.",
      };
    }

    if (result.status === "mail_sent") {
      return { success: true, message: result.message };
    } else {
      return {
        success: false,
        message: result.message,
        invalid_fields: result.invalid_fields || [],
      };
    }
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}