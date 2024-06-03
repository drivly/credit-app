'use server'

import { headers } from 'next/headers'
import { HOSTNAMES, TENANT } from '../constants'

export default async function getTenant(params: { tenant?: string }) {
  const hostName = headers().get('x-forwarded-host') || headers().get('host')
  const shouldSupportTenant = HOSTNAMES.some((host) => hostName?.includes(host))
  return shouldSupportTenant && params?.tenant ? params.tenant : TENANT
}
