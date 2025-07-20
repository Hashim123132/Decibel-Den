export const projectId = '59e2j473'

export const dataset = 'production'

export const apiVersion =
  process.env.SANITY_API_VERSION || '2025-07-09'

 export const token = process.env.SANITY_API_TOKEN

  function assertValue<T>(v: T | undefined, errorMessage: string): T {

  if (v === undefined || v === '') {
    throw new Error(errorMessage)
  }
  return v
}
