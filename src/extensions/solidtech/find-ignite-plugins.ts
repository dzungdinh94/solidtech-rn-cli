import { SolidtechRNPlugin, SolidtechRNToolbox } from '../../types'

export default (toolbox: SolidtechRNToolbox) => {
  // gluegun stuff
  const { runtime, filesystem } = toolbox
  const sep = filesystem.separator

  // how to identify SolidtechRN plugins
  const SolidtechRNPrefixed = (p: SolidtechRNPlugin) => p.name.startsWith('SolidtechRN-') // propSatisfies(startsWith('SolidtechRN-'), 'name')
  const isInRightLocation = (s: string) => s.includes(`SolidtechRN${sep}plugins`) // contains(`SolidtechRN${sep}plugins`)
  const inProjectPlugins = (p: SolidtechRNPlugin) => isInRightLocation(p.directory) // propSatisfies(isInRightLocation, 'directory')
  const onlySolidtechRNPlugins = (plugins: SolidtechRNPlugin[]) =>
    plugins.filter(p => SolidtechRNPrefixed(p) || inProjectPlugins(p)) // filter(anyPass([SolidtechRNPrefixed, inProjectPlugins]))
  const getSolidtechRNPlugins = (plugins: SolidtechRNPlugin[]) =>
    onlySolidtechRNPlugins(plugins).sort((a, b) => (a.name < b.name ? -1 : 1)) // pipe(onlySolidtechRNPlugins, sortBy(prop('name'))

  /**
   * Finds the gluegun plugins that are also SolidtechRN plugins.  These are
   * plugins which have 1 of the following:
   *
   *   - the name starts with "SolidtechRN-"
   *   - the directory contains "SolidtechRN/plugins"
   *
   * @returns {Plugin[]} - an array of SolidtechRN plugins
   */
  return () => getSolidtechRNPlugins(runtime.plugins as SolidtechRNPlugin[])
}
