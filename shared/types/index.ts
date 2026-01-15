/**
 * Shared TypeScript types for Turbo-Stack
 * 
 * api.d.ts is auto-generated from backend OpenAPI spec
 * Run `pnpm gen:types` at root to regenerate
 */

// Re-export API types
export type * from './api';

// Re-export dict types
export * from './dict';

// Convenience type aliases
import type { paths, components, operations } from './api';

/** All API paths */
export type ApiPaths = paths;

/** All API components/schemas */
export type ApiSchemas = components['schemas'];

/** All API operations */
export type ApiOperations = operations;
