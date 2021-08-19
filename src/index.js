const { Transformer } = require("@parcel/plugin");

module.exports = new Transformer({
  type: 'js',

  async canReuseAST() {
    return false;
  },

  async transform({ asset, config, logger, resolve, options }) {
    asset.type = 'js';

    const code = await asset.getCode();

    return [
      {
        type: 'js',
        content: `module.exports = ${JSON.stringify(code)}`,
      },
    ];
  }
});
