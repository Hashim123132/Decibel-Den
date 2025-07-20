import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'

import { projectId, dataset, apiVersion } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

// MOVE THE DEBUG LOGS HERE - BEFORE THE EXPORT
console.log('=== SANITY CONFIG DEBUG ===');
console.log('Raw env vars:');
console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('NEXT_PUBLIC_SANITY_DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log('NEXT_PUBLIC_SANITY_API_VERSION:', process.env.NEXT_PUBLIC_SANITY_API_VERSION);
console.log('Imported values:');
console.log('projectId:', projectId);
console.log('dataset:', dataset);
console.log('apiVersion:', apiVersion);
console.log('=== END DEBUG ===');

export default defineConfig({
  basePath: '/studio',
  projectId,     
  dataset,        
  apiVersion,   
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
})