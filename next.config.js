const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === 'development'
    ? {}
    : !process.env.NOW_REGION // ℹ️ Must be `NOW_REGION`, not `NOW` (my bad)
    ? require('next/constants')
    : require('next-server/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      /* production only config */
    };
  }

  const withSass = require('@zeit/next-sass');
  const withTM = require('next-transpile-modules');

  return withSass(
    withTM({
      target: 'serverless',
      transpileModules: ['react-bulma-components'],
      sassLoaderOptions: {
        includePaths: ['./styles']
      }
    })
  );
};
