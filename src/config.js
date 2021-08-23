import postcssrc from 'postcss-load-config';

export const { options, plugins } = (() => {
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
