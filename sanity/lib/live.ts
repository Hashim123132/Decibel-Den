import { defineLive } from "next-sanity";
import { client } from './client';

// Setup live Sanity fetching (requires <SanityLive /> in layout)
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: '2025-07-09' // ✅ valid ISO date format
  })
});
