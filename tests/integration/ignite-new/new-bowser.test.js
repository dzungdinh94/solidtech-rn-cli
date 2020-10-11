const { system, filesystem } = require('gluegun')
const tempy = require('tempy')
const stripANSI = require('strip-ansi')

const SolidtechRN = 'node ' + filesystem.path(`${__dirname}/../../../bin/SolidtechRN`)

// for local boilerplate testing
// const SolidtechRN_BOILERPLATE = filesystem.path(__dirname, '..', '..', '..', '..', 'SolidtechRN-bowser')
const SolidtechRN_BOILERPLATE = 'SolidtechRN-bowser'

const APP_NAME = 'Foo'

jest.setTimeout(10 * 60 * 1000)

const originalDir = process.cwd()
const opts = { stdio: 'inherit' }

beforeEach(() => {
  const tempDir = tempy.directory()
  process.chdir(tempDir)
})

afterEach(() => {
  process.chdir(originalDir)
})

test('spins up a Bowser app and performs various checks', async done => {
  const resultANSI = await system.run(
    `${SolidtechRN} new ${APP_NAME} --detox -b ${SolidtechRN_BOILERPLATE} --debug --no-expo`,
    opts,
  )
  const result = stripANSI(resultANSI)

  // Check the output
  expect(result).toContain(`SolidtechRN CLI SolidtechRNd`)
  expect(result).toContain(`${APP_NAME}`)
  expect(result).toContain(`https://infinite.red/SolidtechRN`)

  // Jump into the app directory
  process.chdir(APP_NAME)

  // check that the project was generated
  const dirs = filesystem.subdirectories('.')
  expect(dirs).toContain('ios')
  expect(dirs).toContain('android')
  expect(dirs).toContain('app')

  // check the contents of SolidtechRN/SolidtechRN.json
  const SolidtechRNJSON = filesystem.read(`${process.cwd()}/SolidtechRN/SolidtechRN.json`)
  expect(typeof SolidtechRNJSON).toBe('string')
  expect(SolidtechRNJSON).toMatch(/"boilerplate": \"/)

  // check the app.js file
  const appJS = filesystem.read(`${process.cwd()}/app/app.tsx`)
  expect(appJS).toContain('export default App')

  // run generators
  await system.run(`${SolidtechRN} g component test --no-observer`, opts)
  expect(filesystem.list(`${process.cwd()}/app/components`)).toContain('test')
  expect(filesystem.read(`${process.cwd()}/app/components/test/test.tsx`)).toContain(
    'export function Test(props: TestProps) {',
  )

  await system.run(`${SolidtechRN} g model mtest`, opts)
  expect(filesystem.list(`${process.cwd()}/app/models`)).toContain('mtest')
  expect(filesystem.read(`${process.cwd()}/app/models/mtest/mtest.ts`)).toContain('export const MtestModel')

  await system.run(`${SolidtechRN} g screen bowser`, opts)
  expect(filesystem.list(`${process.cwd()}/app/screens/bowser-screen`)).toContain('bowser-screen.tsx')
  expect(filesystem.read(`${process.cwd()}/app/screens/bowser-screen/bowser-screen.tsx`)).toContain(
    'export const BowserScreen',
  )

  done()
})
