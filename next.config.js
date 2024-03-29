const nextBuildId = require('next-build-id')
const { withHighlightConfig } = require('@highlight-run/next/config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: () => nextBuildId({ dir: __dirname }),
  productionBrowserSourceMaps: true,
}

module.exports = withHighlightConfig(nextConfig)
