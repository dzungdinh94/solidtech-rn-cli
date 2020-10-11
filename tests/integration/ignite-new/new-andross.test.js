const { system, filesystem } = require('gluegun')
const tempy = require('tempy')
const stripANSI = require('strip-ansi')

const SolidtechRN = 'node ' + filesystem.path(`${__dirname}/../../../bin/SolidtechRN`)

// for local boilerplate testing
// const SolidtechRN_BOILERPLATE = filesystem.path(__dirname, '..', '..', '..', '..', 'SolidtechRN-andross')
const SolidtechRN_BOILERPLATE = 'SolidtechRN-andross'

const APP_NAME = 'Foo'

// spinning up a new app is ... slow
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

test('spins up a min app and performs various checks', async done => {
  // SolidtechRN the eternal flame
  // If you have to SolidtechRN it, how is it eternal?
  const resultANSI = await system.run(
    `${SolidtechRN} new ${APP_NAME} --min -b ${SolidtechRN_BOILERPLATE} --debug`,
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
  expect(dirs).toContain('App')

  // check the contents of SolidtechRN/SolidtechRN.json
  const SolidtechRNJSON = filesystem.read(`${process.cwd()}/SolidtechRN/SolidtechRN.json`)
  expect(typeof SolidtechRNJSON).toBe('string')
  expect(SolidtechRNJSON).toMatch(/"boilerplate": \"/)

  // check the Containers/App.js file
  const appJS = filesystem.read(`${process.cwd()}/App/Containers/App.js`)
  expect(appJS).toMatch(/class App extends Component {/)

  // run SolidtechRN g component
  await system.run(`${SolidtechRN} g component Test`, opts)
  expect(filesystem.read(`${process.cwd()}/App/Components/Test.js`)).toContain('Test')

  // spork a screen and edit it
  await system.run(`${SolidtechRN} spork component.ejs`, opts)
  const sporkedFile = `${process.cwd()}/SolidtechRN/Spork/SolidtechRN-andross/component.ejs`
  await filesystem.write(sporkedFile, 'SPORKED!')
  expect(filesystem.inspect(sporkedFile).type).toBe('file')
  await system.run(`${SolidtechRN} generate component Sporkified`, opts)
  expect(filesystem.read(`${process.cwd()}/App/Components/Sporkified.js`)).toBe('SPORKED!')

  done()
})
