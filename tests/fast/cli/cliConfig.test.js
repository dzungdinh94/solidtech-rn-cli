const mockery = require('mockery')
const MockGluegunBuilder = require('./_mockGluegunBuilder')
const path = require('path')

let mockGluegunBuilder = new MockGluegunBuilder()

// turn on mocking
mockery.enable({ warnOnUnregistered: false })

// mock the header & gluegun
const noop = () => {}
mockery.registerMock('../brand/header', () => true)
mockery.registerMock('gluegun', {
  build: () => mockGluegunBuilder,
  printCommands: context => true,
  print: { info: noop, debug: noop, colors: { magenta: noop } },
})

// our cli
const cli = require('../../../src/cli/cli')

test('SolidtechRN', async () => {
  mockGluegunBuilder.onCreateRuntime(builderProps => {
    // we expect our CLI to be configured like this
    expect(builderProps).toEqual({
      brand: 'SolidtechRN',
      loadAlls: [
        {
          dir: `${process.cwd()}/SolidtechRN/plugins`,
          opts: {},
        },
        {
          dir: `${process.cwd()}/node_modules`,
          opts: { hidden: true, matching: 'SolidtechRN-*' },
        },
        {
          dir: `${process.cwd()}/node_modules`,
          opts: { hidden: true, matching: 'gluegun-*' },
        },
      ],
      loadDefault: `${process.cwd()}${path.sep}src${path.sep}cli/..`,
      tokens: {
        commandAlias: 'cliAlias',
        commandDescription: 'cliDescription',
        commandHidden: 'cliHidden',
        commandName: 'cliCommand',
        extensionName: 'contextExtension',
      },
    })

    // minimal thing that won't make it crash.
    return {
      run: () => ({}),
    }
  })

  // run the with nothing
  await cli.run([null, null, ''])
})
