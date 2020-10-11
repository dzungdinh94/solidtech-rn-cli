import { SolidtechRNToolbox, SolidtechRNRNInstallResult } from '../types'
import attachSolidtechRN from './attach-solidtechRN'

export default async function(toolbox: SolidtechRNToolbox) {
  const { parameters, print, reactNative } = toolbox
  const name = parameters.first
  const spinner = print.spin(`skipping boilerplate`).succeed()

  // attempt to install React Native or die trying
  const rnInstall: SolidtechRNRNInstallResult = await reactNative.install({ name })
  if (rnInstall.exitCode > 0) process.exit(rnInstall.exitCode)

  await attachSolidtechRN(toolbox, { createdWith: 'empty', boilerplateVersion: '' })

  spinner.stop()

  // Wrap it up with our success message.
  print.info('')
  print.info('🍽 Time to get cooking!')
  print.info('')
  print.info('To run in iOS:')
  print.info(print.colors.yellow(`  cd ${name}`))
  print.info(print.colors.yellow('  npx react-native run-ios'))
  print.info('')
  print.info('To run in Android:')
  print.info(print.colors.yellow(`  cd ${name}`))
  print.info(print.colors.yellow('  npx react-native run-android'))
  print.info('')
  print.info('To see what ignite can do for you:')
  print.info(print.colors.yellow(`  cd ${name}`))
  print.info('')
}
