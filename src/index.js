import { Transformer } from '@parcel/plugin';
import postcssrc from 'postcss-load-config';
import postcss from 'postcss';
import cssnano from 'cssnano';

const postcssConfig = (() => {
  try {
    return postcssrc.sync();
  } catch (error) {
    const message = error && error.message || '';
    const isDefault = message.startsWith('No PostCSS Config found in');

    if (!isDefault) {
      throw error;
    }

    return {
      options: {},
      plugins: [],
      isDefault,
    };
  }
})();

const createAssets = (asset, css) => {
  asset.type = 'js';
  asset.setCode(`export default ${JSON.stringify(css)}`);

  return [asset];
};

export default new Transformer({
  canReuseAST() {
    return false;
  },

  loadConfig({ config, logger }) {
    const plugins = [];

    if (postcssConfig.isDefault) {
      logger.info({
        message: 'Use default PostCSS config',
      });

      if (config.env.shouldOptimize) {
        plugins.push(cssnano);
      }
    } else {
      plugins.push(...postcssConfig.plugins);
    }

    config.setCacheKey('css-to-string');

    return {
      options: postcssConfig.options,
      plugins,
    };
  },

  async transform({ asset, config }) {
    const { plugins, options } = config;

    const code = await asset.getCode();

    if (plugins.length < 1) {
      return createAssets(asset, code);
    }

    const { css } = await postcss(plugins).process(code, {
      from: asset.filePath,
      ...options,
    });

    return createAssets(asset, css);
  },
});
