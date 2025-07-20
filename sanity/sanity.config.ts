import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'

import { projectId, dataset, apiVersion } from '../sanity/env'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'


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