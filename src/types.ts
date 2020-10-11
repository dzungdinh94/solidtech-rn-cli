import { GluegunToolbox, GluegunCommand } from 'gluegun'

export type SolidtechRNTools = {
  ignitePluginPath: Function
  setIgnitePluginPath: Function
  useYarn: boolean
  loadIgniteConfig: Function
  saveIgniteConfig: Function
  setIgniteConfig: Function
  removeIgniteConfig: Function
  findIgnitePlugins: Function
  addModule: Function
  addAndroidPermission: Function
  removeModule: Function
  copyBatch: Function
  addPluginComponentExample: Function
  removePluginComponentExample: Function
  addPluginScreenExamples: Function
  removePluginScreenExamples: Function
  removeAndroidPermission: Function
  setDebugConfig: Function
  removeDebugConfig: Function
  patchInFile: Function
  log: Function
  pluginOverrides: string[]
  boilerplateName: () => string | void
  boilerplateVersion: () => string | void
  patching: {
    insertInFile
    replaceInFile
    isInFile
  }
}

export type ReactNativeTools = {
  install(opts: {
    name?: string
    version?: string
    template?: string
    skipJest?: boolean
    useNpm?: boolean
  }): Promise<SolidtechRNRNInstallResult>
}

export interface SolidtechRNToolbox extends GluegunToolbox {
  ignite: SolidtechRNTools
  reactNative: ReactNativeTools
}

export interface SolidtechRNPlugin {
  name: string
  directory: string
  commands: GluegunCommand<SolidtechRNToolbox>[]
}

export type SolidtechRNConfig = {
  generators?: string[]
}

export type SolidtechRNDetectInstall = {
  moduleName: string
  type: 'directory' | 'npm' | 'git'
  directory?: string
  override?: boolean
  version?: string
  error?: string
  url?: string
}

export type SolidtechRNNPMPackageParts = {
  name: string
  scoped: boolean
  version?: string
}

export type SolidtechRNPatchInFileOptions = {
  before?: string
  after?: string
  replace?: string
  insert?: string
  delete?: string
  force?: boolean
}

export type SolidtechRNRNInstallResult = {
  exitCode: number
  version: string
  template: string
}

export type SolidtechRNPluginScreenFile = {
  screen: string
  ancillary: string[]
  title?: string
}

export type SolidtechRNCopyJob = {
  target: string
  template: string
}

export type SolidtechRNProjectConfig = {
  createdWith?: string
  boilerplate?: string
  boilerplateVersion?: string
  examples?: string[]
}
