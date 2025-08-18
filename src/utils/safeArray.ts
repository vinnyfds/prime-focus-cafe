/**
 * Safe array utility to prevent runtime errors when calling .map() on non-array values
 */

export function safeArray<T = unknown>(value: unknown): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }
  
  // Handle objects with .items property (common API pattern)
  if (value && typeof value === 'object' && 'items' in value && Array.isArray((value as any).items)) {
    return (value as any).items as T[];
  }
  
  // Handle null/undefined
  if (value == null) {
    return [];
  }
  
  // Handle other falsy values
  if (!value) {
    return [];
  }
  
  // Handle array-like objects (NodeList, HTMLCollection, etc.)
  if (typeof value === 'object' && 'length' in value && typeof (value as any).length === 'number') {
    try {
      return Array.from(value as any) as T[];
    } catch {
      return [];
    }
  }
  
  // Default fallback
  return [];
}

/**
 * Safe array with type guard
 */
export function safeArrayWithGuard<T>(
  value: unknown, 
  guard: (item: unknown) => item is T
): T[] {
  const array = safeArray(value);
  return array.filter(guard);
}

/**
 * Safe array with default value
 */
export function safeArrayWithDefault<T>(value: unknown, defaultValue: T[]): T[] {
  const array = safeArray<T>(value);
  return array.length > 0 ? array : defaultValue;
}
