const attach = require('../../../src/extensions/SolidtechRN')
const path = require('path')
const jetpack = require('fs-jetpack')

test('has the right interface', () => {
  expect(typeof attach).toBe('function')

  const toolbox = {
    print: {},
    parameters: {
      options: {},
    },
    system: {
      which: () => true,
    },
    filesystem: {
      separator: path.sep,
      ...jetpack,
    },
  }

  attach(toolbox)
  const extension = toolbox.SolidtechRN

  expect(typeof extension.SolidtechRNPluginPath).toBe('function')
  expect(typeof extension.setSolidtechRNPluginPath).toBe('function')
  expect(typeof extension.useYarn).toBe('boolean')
  expect(typeof extension.findSolidtechRNPlugins).toBe('function')
  expect(typeof extension.addModule).toBe('function')
  expect(typeof extension.removeModule).toBe('function')
  expect(typeof extension.copyBatch).toBe('function')
  expect(typeof extension.addPluginComponentExample).toBe('function')
  expect(typeof extension.addPluginScreenExamples).toBe('function')
  expect(typeof extension.removePluginComponentExample).toBe('function')
  expect(typeof extension.removePluginScreenExamples).toBe('function')
  expect(typeof extension.loadSolidtechRNConfig).toBe('function')
  expect(typeof extension.saveSolidtechRNConfig).toBe('function')
  expect(typeof extension.setSolidtechRNConfig).toBe('function')
  expect(typeof extension.removeSolidtechRNConfig).toBe('function')
  expect(typeof extension.setDebugConfig).toBe('function')
  expect(typeof extension.removeDebugConfig).toBe('function')
  expect(typeof extension.patchInFile).toBe('function')
  expect(typeof extension.log).toBe('function')
})
