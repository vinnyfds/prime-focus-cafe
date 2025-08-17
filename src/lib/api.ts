
import { toArray } from './safe';

// Safe API wrapper that prevents .map crashes
export async function safeApiCall<T>(endpoint: string): Promise<T[]> {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      console.warn(`API call failed: ${endpoint}`, response.status);
      return [];
    }
    const data = await response.json();
    return toArray<T>(data);
  } catch (error) {
    console.error(`API call error: ${endpoint}`, error);
    return [];
  }
}

// Example usage for scientific refs
export async function getScientificRefs() {
  return safeApiCall<any>('/api/scientific-refs');
}
