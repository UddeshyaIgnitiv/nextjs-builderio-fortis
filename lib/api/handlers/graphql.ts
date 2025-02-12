import { fetcher, getAdditionalHeader, getUserClaimsFromRequest } from '../util'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function graphQLHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query, variables } = req.body

    const headers = getAdditionalHeader(req)

    const userClaims = await getUserClaimsFromRequest(req, res)
    const response = await fetcher({ query, variables }, { userClaims, headers })
    if (response?.errors) {
      throw {
        message: response?.errors[0]?.extensions?.response?.body?.message,
        code: response?.errors[0].extensions.response.status,
      }
    }
    res.status(200).json(response)
  } catch (error: any) {
    res.status(error?.code).json({ message: error?.message })
  }
}
