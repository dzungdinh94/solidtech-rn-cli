import { SolidtechRNToolbox, SolidtechRNProjectConfig } from '../types'

export default async function attachSolidtechRN(toolbox: SolidtechRNToolbox, projectConfig: SolidtechRNProjectConfig) {
  const { solidtechRN, filesystem } = toolbox

  // save solidtechRN config
  solidtechRN.setSolidtechRNConfig(projectConfig)

  // the plugins folder
  filesystem.write('solidtechRN/plugins/.gitkeep', '')
}
