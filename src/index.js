const { Transformer } = require('@parcel/plugin');
const postcss = require('postcss');

const { getConfig, createAssets } = require('./util.js');

module.exports = new Transformer({
  async canReuseAST() {
    return false;
  },

  async transform({ asset }) {
    asset.type = 'js';

    const [
      code,
      config,
    ] = await Promise.all([
      asset.getCode(),
      getConfig(),
    ]);

    const { plugins, options } = config;

    if (plugins.length < 1) {
      return createAssets(code);
    }

    const { css } = await postcss(plugins).process(code, {
      from: asset.id,
      ...options,
    });

    return createAssets(css);
  },
});
