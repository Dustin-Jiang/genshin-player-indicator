const path = require('path');
const BannerPlugin = require('webpack/lib/BannerPlugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require('fs');

// 通过npm run build:header编译出的路径
const header_path = 'dist/app_header.js';

output = {
  filename: 'genshin-player-indicator.user.js',
  path: path.resolve(__dirname, "dist")
};


module.exports = async () => {
  if (!fs.existsSync(header_path)) {
    throw '文件' + header_path + '不存在，请先执行npm run build:header编译！';
  }
  const header = fs.readFileSync(header_path, 'utf-8');

  return {
    mode: 'none',

    entry: './src/index.ts',
    output: output,
    module: {
      rules: [{
        test: /\.ts$/,
        use: [
          'babel-loader',
          'awesome-typescript-loader'
        ],
        exclude: /header/
      }]
    },
    resolve: {
      extensions: [
        '.ts', '.js'
      ]
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new CheckerPlugin(),
      new BannerPlugin({
        banner: header,
        raw: true
      })
    ],
  };
};
