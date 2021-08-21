exports.createAssets = (css) => {
  return [
    {
      type: 'js',
      content: `export default ${JSON.stringify(css)}`,
    },
  ];
};
