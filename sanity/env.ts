export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const apiVersion =
  process.env.SANITY_API_VERSION || '2025-07-09'

 export const token = process.env.SANITY_API_TOKEN

  function assertValue<T>(v: T | undefined, errorMessage: string): T {
      console.log('👉 assertValue got:', errorMessage, '=', v);

  if (v === undefined || v === '') {
    throw new Error(errorMessage)
  }
  return v
}
