/**
 * Ensures the given string starts with 'SolidtechRN-'.
 */
export default (value: string): string => {
  const path = require('path')
  // If a path, ignore, it's fine
  if (value.includes(path.sep)) return value

  return /^SolidtechRN-/.test(value) ? value : 'SolidtechRN-' + value
}
