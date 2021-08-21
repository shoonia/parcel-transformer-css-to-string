const { Transformer } = require('@parcel/plugin');
const postcss = require('postcss');

const { createAssets } = require('./util.js');
const { plugins, options } = require('./config.js');

module.exports = new Transformer({
  canReuseAST() {
    return false;
  },

  async transform({ asset }) {
    asset.type = 'js';

    const code = await asset.getCode();

    if (plugins.length < 1) {
      return createAssets(code);
    }

    const { css } = await postcss(plugins).process(code, {
      from: asset.filePath,
      ...options,
    });

    return createAssets(css);
  },
});
