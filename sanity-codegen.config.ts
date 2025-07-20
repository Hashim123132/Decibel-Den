  

export default {
  schemaPath: './sanity/schemaTypes/index.ts',      // adjust if your schema is elsewhere
  outputPath: './sanity.types.ts',
  dataset: 'production',              // or 'development'
  projectId: process.env.VITE_SANITY_PROJECT_ID || '',  // from sanity.config.ts or sanity.json
}

 