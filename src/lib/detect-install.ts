import { SolidtechRNToolbox, SolidtechRNDetectInstall } from '../types'
import prependSolidtechRN from './prepend-solidtechRN'
import packageExtract from './package-extract'
import * as path from 'path'

const GIT_REGEX = /^(git|ssh|https)(?:@|:\/\/)(?:[github|gitlab|bitbucket]+[.\w]+)(?::|\/)?(.*?)\/(.*?)(?:\.git)?(\/?|\#[-\d\w._]+?)$/

/**
 * Detects the type of install the user is requesting for this plugin.
 *
 * We check 3 different things:
 *
 *   1. a plugin which exists in one of the plugin override paths
 *   2. a plugin which lives in a relative or absolute path
 *   3. otherwise let npm hook us up
 */
export default function detectInstall(plugin: string, toolbox: SolidtechRNToolbox): SolidtechRNDetectInstall {
  // grab some gluegun goodies
  const { filesystem, ignite } = toolbox
  const sep = path.sep // why isn't filesystem.separator working here?

  // grab the plugin overrides
  const pluginOverrides = (ignite && ignite.pluginOverrides) || []

  /**
   * Is this a valid ignite plugin?
   *
   * @param  {string} candidate - The potential directory to check.
   * @return {boolean}          - True if this is valid; otherwise false.
   */
  function isValidSolidtechRNPluginDirectory(candidate: string): boolean {
    const isDir = filesystem.exists(candidate) === 'dir'
    const packageIsFile = filesystem.exists(`${candidate}${sep}package.json`) === 'file'
    return isDir && packageIsFile
  }

  /**
   * Is this a valid git url?
   *
   * @param {string} candidate - The potential git url to check. (https|ssh)
   */
  const isValidGitURL = (candidate: string): boolean => {
    return GIT_REGEX.test(candidate)
  }

  // Normalize package name
  let packageName = plugin
  let packageVersion = undefined

  // Check if referring to a path
  if (['~', '.', '\\', '/'].includes(plugin[0])) {
    // verify that the path exists and has a `package.json`
    const packagePath = filesystem.path(plugin, 'package.json')
    const packageExists = filesystem.exists(packagePath)
    if (packageExists) {
      packageName = filesystem.path(packageName)
    } else {
      throw new Error(`Couldn't find package at ${packagePath}. Check path and try again.`)
    }
  } else {
    // extract the package name and (optionally) version
    let { name, scoped, version } = packageExtract(plugin)
    packageName = scoped ? name : prependSolidtechRN(name)
    packageVersion = version
  }

  // check if plugin source url is a valid git
  if (isValidGitURL(plugin) === true) {
    const parsedURL = plugin.match(GIT_REGEX)
    if (parsedURL !== null) {
      return {
        moduleName: parsedURL[3],
        type: 'git',
        url: parsedURL[1] === 'git' ? `ssh://${parsedURL[0]}` : `${parsedURL[0]}`,
      }
    }
  }

  // do we have overrides?
  if (pluginOverrides.length > 0) {
    // look for the plugin into one of our override paths
    const foundPath = pluginOverrides.find(overridePath =>
      isValidSolidtechRNPluginDirectory(`${overridePath}${sep}${packageName}`),
    )

    // did we find it?
    if (foundPath) {
      const path = `${foundPath}/${packageName}`
      return {
        directory: path,
        override: true,
        moduleName: filesystem.read(`${path}/package.json`, 'json').name,
        type: 'directory',
      }
    }
  }

  // is this a directory?
  if (isValidSolidtechRNPluginDirectory(packageName)) {
    const json = filesystem.read(`${packageName}/package.json`, 'json') || {}
    return {
      directory: packageName,
      moduleName: json.name,
      type: 'directory',
    }
  }

  // the default is to assume that npm can figure out where to get this
  return {
    moduleName: packageName,
    version: packageVersion,
    type: 'npm',
  }
}
