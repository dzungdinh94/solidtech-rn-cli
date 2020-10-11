const extension = require('../../../src/extensions/SolidtechRN/find-SolidtechRN-plugins').default
const path = require('path')

test('has the right interface', () => {
  expect(typeof extension).toBe('function')
  const toolbox = { filesystem: { separator: path.sep } }
  const findSolidtechRNPlugin = extension(toolbox)
  expect(typeof findSolidtechRNPlugin).toBe('function')
})

test('plugin-less', () => {
  const toolbox = {
    filesystem: { separator: path.sep },
    runtime: {
      plugins: [],
    },
  }
  const findSolidtechRNPlugin = extension(toolbox)
  expect(findSolidtechRNPlugin()).toEqual([])
})

test('skips non-SolidtechRN plugins', () => {
  const toolbox = {
    filesystem: { separator: path.sep },
    runtime: {
      plugins: [{ name: 'x', directory: 'y' }],
    },
  }
  const findSolidtechRNPlugin = extension(toolbox)
  expect(findSolidtechRNPlugin()).toEqual([])
})

test('finds SolidtechRN- prefixed plugins', () => {
  const toolbox = {
    filesystem: { separator: path.sep },
    runtime: {
      plugins: [{ name: 'SolidtechRN-foo', directory: 'y' }],
    },
  }
  const findSolidtechRNPlugin = extension(toolbox)
  expect(findSolidtechRNPlugin()).toEqual([{ name: 'SolidtechRN-foo', directory: 'y' }])
})

test('finds project plugins', () => {
  const dir = `${process.cwd()}${path.sep}SolidtechRN${path.sep}plugins${path.sep}y`
  const toolbox = {
    filesystem: { separator: path.sep },
    runtime: {
      plugins: [{ name: 'x', directory: dir }],
    },
  }
  const findSolidtechRNPlugin = extension(toolbox)
  expect(findSolidtechRNPlugin()).toEqual([{ name: 'x', directory: dir }])
})
