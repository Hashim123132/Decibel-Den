

import { createClient } from 'next-sanity'
//configured Sanity client for making queries.

import imageUrlBuilder from '@sanity/image-url'
//This is a utility that helps generate real image URLs from the image data

// type SanityImageSource = {
//   _type: 'image',
//   asset: {
//     _ref: string,
//     _type: 'reference'
//   }
// }


import { apiVersion, dataset, projectId, token } from '../../sanity/env'
//Creating the Sanity client

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,  // Set to false if statically generating pages, using ISR or tag-based revalidation
  token   
})


//builder.image(source) uses the image reference (like _ref: "image-abc123...") and turns it into a valid URL, like:
//https://cdn.sanity.io/images/yourProjectId/yourDataset/some-image-jpg

// The client gives context (project ID & dataset) so imageUrlBuilder knows where to fetch images from.
const builder = imageUrlBuilder(client);
//source must match the shape of sanityImagesource type
export const urlFor = (source: any) => builder.image(source);
