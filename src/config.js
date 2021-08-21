const postcssrc = require('postcss-load-config');

const { options, plugins } = (() => {
  try {
    return postcssrc.sync();
  } catch (error) {
    const isProd = process.env.NODE_ENV === 'production';

    return {
      options: {},
      plugins: isProd
        ? [require('cssnano')]
        : [],
    };
  }
})();

exports.options = options;
exports.plugins = plugins;
