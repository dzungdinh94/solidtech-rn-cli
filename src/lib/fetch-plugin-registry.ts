import { SolidtechRNToolbox } from '../types'

/**
 * Fetches plugin registry from Github
 *
 * @param {Object} toolbox The gluegun toolbox.
 */
export default async function(toolbox: SolidtechRNToolbox): Promise<any> {
  const api = toolbox.http.create({
    baseURL: 'https://raw.githubusercontent.com/solidtechvn/solidtechRN-plugins',
  })

  const { data } = await api.get('/master/registry.json')
  return data
}
