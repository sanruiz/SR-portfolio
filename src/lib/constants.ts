export const BASE_URL = process.env.URL_PROD as string;
export const CCDS_API_COMPLEMENT = process.env.NEXT_PUBLIC_CCDS_API_COMPLEMENT;
export const CCDS_API_URL = process.env.CCDS_API_URL;
export const isProduction = process.env.DEPLOY_ENVIRONMENT === "production";
export const LOCATOR_API_KEY = process.env.LOCATOR_API_KEY ?? "";
export const LOCATOR_API_URL = process.env.LOCATOR_API_URL ?? "";
export const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_URL_PROD as string;
export const SITE_NAME = "Oasis Senior Advisors";
export const WP_API_URL = process.env.WORDPRESS_API_URL ?? "";
