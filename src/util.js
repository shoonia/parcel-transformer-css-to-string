const postcssrc = require('postcss-load-config');

exports.getConfig = async () => {
  try {
    const config = await postcssrc();

    return config;
  } catch (error) {
    const isProd = process.env.NODE_ENV === 'production';

    return {
      options: {},
      plugins: isProd
        ? [require('cssnano')]
        : []
    };
  }
};

exports.createAssets = (css) => {
  return [
    {
      type: 'js',
      content: `module.exports = ${JSON.stringify(css)}`,
    },
  ];
};
