/**
 * Returns the full path of all occurrences of a given property in an object.
 *
 * @param obj the object to be traversed
 * @param key the property to be found
 */
export function getFullKeyPaths(
  obj: Record<string, unknown>,
  key: string,
): string[] {
  const paths: string[] = [];

  /**
   * Recursive helper function to traverse the object.
   *
   * @param currentObj the current object or value being traversed
   * @param currentPath the current path being constructed
   */
  function traverse(currentObj: unknown, currentPath: string) {
    if (
      currentObj &&
      typeof currentObj === 'object' &&
      !Array.isArray(currentObj)
    ) {
      for (const [prop, value] of Object.entries(currentObj)) {
        const newPath = currentPath ? `${currentPath}.${prop}` : prop;

        // Check if the current property matches the key
        if (prop === key) {
          paths.push(newPath);
        }

        // Recurse into the value
        traverse(value, newPath);
      }
    }
  }

  // Start the traversal
  traverse(obj, '');

  return paths;
}
