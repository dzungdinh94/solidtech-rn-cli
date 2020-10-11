const { system, filesystem } = require('gluegun')

const SolidtechRN = filesystem.path(`${__dirname}/../../../bin/SolidtechRN`)
const VERSION = filesystem.read('./package.json', 'json').version

test('SolidtechRN -v', async () => {
  const result = await system.spawn(`${SolidtechRN} -v`)
  expect(result.stdout.toString()).toContain(VERSION)
})

test('SolidtechRN --v', async () => {
  const result = await system.spawn(`${SolidtechRN} --v`)
  expect(result.stdout.toString()).toContain(VERSION)
})

test('SolidtechRN -version', async () => {
  const result = await system.spawn(`${SolidtechRN} -version`)
  expect(result.stdout.toString()).toContain(VERSION)
})

test('SolidtechRN --version', async () => {
  const result = await system.spawn(`${SolidtechRN} --version`)
  expect(result.stdout.toString()).toContain(VERSION)
})

test('SolidtechRN version', async () => {
  const result = await system.spawn(`${SolidtechRN} version`)
  expect(result.stdout.toString()).toContain(VERSION)
})
