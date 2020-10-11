const { system, filesystem } = require('gluegun')
const tempy = require('tempy')

const SolidtechRN = filesystem.path(`${__dirname}/../../../bin/SolidtechRN`)

jest.setTimeout(30 * 1000)

const originalDir = process.cwd()

beforeEach(() => {
  const tempDir = tempy.directory()
  process.chdir(tempDir)
})

afterEach(() => {
  process.chdir(originalDir)
})

test('requires a name', async done => {
  const result = await system.spawn(SolidtechRN + ' new')
  expect(result.stdout.toString()).toContain('SolidtechRN new <projectName>')
  expect(result.stdout.toString()).toContain('Project name is required')
  expect(result.status).toBe(5)
  done()
})

test(`doesn't allow kebab-case`, async done => {
  const result = await system.spawn(SolidtechRN + ' new chicken-kebab')
  expect(result.stdout.toString()).toContain('Please use camel case for your project name. Ex: ChickenKebab')
  expect(result.status).toBe(5)
  done()
})

test(`doesn't allow 'SolidtechRN'`, async done => {
  const result = await system.spawn(SolidtechRN + ' new SolidtechRN')
  expect(result.stdout.toString()).toContain(
    "Hey...that's my name! Please name your project something other than 'SolidtechRN'.",
  )
  expect(result.status).toBe(5)
  done()
})

test('numeric project name', async done => {
  const result = await system.spawn(SolidtechRN + ' new 123456')
  expect(result.status).toBe(5)
  expect(result.stdout.toString()).toContain('Please use at least one non-numeric')
  done()
})

test('project name starting with a number', async done => {
  const result = await system.spawn(SolidtechRN + ' new 1foo')
  expect(result.status).toBe(5)
  expect(result.stdout.toString()).toContain(
    'The project name can only contain alphanumeric characters and underscore, but must not begin with a number.',
  )
  done()
})
