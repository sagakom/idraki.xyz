const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development' ? {} : require('next-server/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      /* production only config */
    }
  }

  const withSass = require('@zeit/next-sass')
  const withTM = require('next-plugin-transpile-modules')

  return withTM(
    withSass({
      target: 'serverless',
      transpileModules: ['react-bulma-components'],
      sassLoaderOptions: {
        includePaths: ['./styles']
      }
    })
  )
}