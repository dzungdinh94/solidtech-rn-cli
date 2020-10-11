const { system, filesystem } = require('gluegun')

const SolidtechRN = filesystem.path(`${__dirname}/../../../bin/SolidtechRN`)

test('unknown command', async done => {
  const result = await system.spawn(`${SolidtechRN} OMGWTFBBQ`)
  expect(result.status).toBe(0)
  expect(result.stdout.toString()).toContain("SolidtechRN 'OMGWTFBBQ' is not a command")
  done()
})

test('unknown emoji command', async done => {
  const result = await system.spawn(`${SolidtechRN} 💩`)
  expect(result.status).toBe(0)
  expect(result.stdout.toString()).toContain("SolidtechRN '💩' is not a command")
  done()
})
