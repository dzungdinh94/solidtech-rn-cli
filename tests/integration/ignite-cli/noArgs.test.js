const { system, filesystem } = require('gluegun')

const SolidtechRN = filesystem.path(`${__dirname}/../../../bin/SolidtechRN`)

test('with no arguments', async () => {
  const result = await system.spawn(`${SolidtechRN}`)
  expect(result.status).toBe(0)
  expect(result.stdout).toContain('https://infinite.red/SolidtechRN')
})
