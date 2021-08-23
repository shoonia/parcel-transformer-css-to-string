import { Transformer } from '@parcel/plugin';
import postcss from 'postcss';

import { plugins, options } from './config.js';

const createAssets = (asset, css) => {
  asset.type = 'js';
  asset.setCode(`export default ${JSON.stringify(css)}`);

  return [asset];
};

export default new Transformer({
  canReuseAST() {
    return false;
  },

  async transform({ asset }) {
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
