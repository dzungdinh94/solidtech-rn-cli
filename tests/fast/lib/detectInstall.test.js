const filesystem = require('fs-jetpack')
const detectInstall = require('../../../src/lib/detect-install').default
const path = require('path')
const sep = path.sep

test('detects npm modules', async () => {
  const actual = detectInstall('something', { filesystem })
  const expected = { moduleName: 'SolidtechRN-something', type: 'npm', version: undefined }
  expect(actual).toEqual(expected)
})

test("won't double prefix", async () => {
  const actual = detectInstall('SolidtechRN-something', { filesystem })
  const expected = { moduleName: 'SolidtechRN-something', type: 'npm', version: undefined }
  expect(actual).toEqual(expected)
})

test('removes @ version', async () => {
  const actual = detectInstall('SolidtechRN-something@">=2.0.0"', { filesystem })
  const expected = { moduleName: 'SolidtechRN-something', type: 'npm', version: '">=2.0.0"' }
  expect(actual).toEqual(expected)
})

test('detects plugins from a full path', async () => {
  const moduleName = 'SolidtechRN-valid-plugin'
  const directory = path.resolve(`${__dirname}${sep}..${sep}fixtures${sep}${moduleName}`)
  const actual = detectInstall(directory, { filesystem })
  const expected = { type: 'directory', moduleName, directory }
  expect(actual).toEqual(expected)
})

test('detects plugins from a relative path', async () => {
  const moduleName = 'SolidtechRN-valid-plugin'
  const directory = `.${sep}tests${sep}fast${sep}fixtures${sep}${moduleName}`
  const actual = detectInstall(directory, { filesystem })
  expect(actual.type).toEqual('directory')
  expect(actual.moduleName).toEqual(moduleName)
  expect(actual.directory).toContain(`${process.cwd()}${sep}tests${sep}fast${sep}fixtures${sep}${moduleName}`)
})

test('detects invalid plugin names', async () => {
  const moduleName = 'SolidtechRN-invalid-plugin'
  const actual = detectInstall(moduleName, { filesystem })
  const expected = { type: 'npm', moduleName, version: undefined }
  expect(actual).toEqual(expected)
})

test(`throws if plugin path doesn't exist`, async () => {
  const moduleName = '/SolidtechRN-invalid-plugin'
  expect(() => detectInstall(moduleName, { filesystem })).toThrow(
    `Couldn't find package at /SolidtechRN-invalid-plugin/package.json. Check path and try again.`,
  )
})

describe('Git Source', () => {
  test('detects https git source', async () => {
    const actual = detectInstall('https://github.com/solidtechvn/SolidtechRN.git', { filesystem })
    const expectd = {
      moduleName: 'SolidtechRN',
      type: 'git',
      url: 'https://github.com/solidtechvn/SolidtechRN.git',
    }

    expect(actual).toEqual(expectd)
  })

  test('detects & parse ssh git source', async () => {
    const actual = detectInstall('git@github.com:solidtechvn/SolidtechRN.git', { filesystem })
    const expectd = {
      moduleName: 'SolidtechRN',
      type: 'git',
      url: 'ssh://git@github.com:solidtechvn/SolidtechRN.git',
    }

    expect(actual).toEqual(expectd)
  })
})
