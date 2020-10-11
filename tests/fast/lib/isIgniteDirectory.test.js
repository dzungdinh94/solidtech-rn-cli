const isSolidtechRNDirectory = require('../../../src/lib/is-SolidtechRN-directory').default

test('bad inputs', () => {
  expect(isSolidtechRNDirectory()).toBe(false)
  expect(isSolidtechRNDirectory(null)).toBe(false)
  expect(isSolidtechRNDirectory(1)).toBe(false)
  expect(isSolidtechRNDirectory([])).toBe(false)
  expect(isSolidtechRNDirectory({})).toBe(false)
  expect(isSolidtechRNDirectory(true)).toBe(false)
})

test('missing directory', () => {
  expect(isSolidtechRNDirectory('omgnothing')).toBe(false)
})

// test('invalid folder structure', () => {
//   mockFs({
//     'missingfile': { 'SolidtechRN': {} },
//     'blank': { 'SolidtechRN': { 'SolidtechRN.json': '' } },
//     'string': { 'SolidtechRN': { 'SolidtechRN.json': 'x' } },
//     'empty': { 'SolidtechRN': { 'SolidtechRN.json': '' } },
//     'array': { 'SolidtechRN': { 'SolidtechRN.json': [] } },
//     'number': { 'SolidtechRN': { 'SolidtechRN.json': 4 } }
//   })
//   expect(isSolidtechRNDirectory('missingfile')).toBe(false)
//   expect(isSolidtechRNDirectory('blank')).toBe(false)
//   expect(isSolidtechRNDirectory('string')).toBe(false)
//   expect(isSolidtechRNDirectory('empty')).toBe(false)
//   expect(isSolidtechRNDirectory('array')).toBe(false)
//   expect(isSolidtechRNDirectory('number')).toBe(false)
// })
