const nextBuildId = require('next-build-id')
const { withHighlightConfig } = require('@highlight-run/next/server')

/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  experimental: {
    serverActions: true,
    instrumentationHook: true,
  },
  productionBrowserSourceMaps: true
}

module.exports = withHighlightConfig(nextConfig)
