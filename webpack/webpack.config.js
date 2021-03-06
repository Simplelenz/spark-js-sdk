const path = require('path');

const merge = require('webpack-merge');
const dotenv = require('dotenv');

const baseConfig = require('./webpack.config.base.js');
const devConfig = require('./webpack.config.dev.js');

dotenv.config();

module.exports = (env) => {
  if (env && env.package) {
    if (process.env.NODE_ENV !== 'production') {
      const context = path.resolve(__dirname, '..', 'packages', 'node_modules', env.package);
      return merge(baseConfig, devConfig, {
        mode: process.env.NODE_ENV || 'development',
        context,
        entry: './src/index.js',
        devServer: {
          contentBase: path.resolve(context, 'sample')
        }
      });
    }
    return baseConfig;
  }
  throw new Error('Please specify a package');
};
