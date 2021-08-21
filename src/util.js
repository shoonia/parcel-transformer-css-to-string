exports.createAssets = (css) => {
  return [
    {
      type: 'js',
      content: `module.exports = ${JSON.stringify(css)}`,
    },
  ];
};
