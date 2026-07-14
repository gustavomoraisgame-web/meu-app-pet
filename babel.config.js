module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Resolve os path aliases definidos em tsconfig.json (ex: @screens/*, @hooks/*)
      // Requer: npm install --save-dev babel-plugin-module-resolver
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@context': './src/context',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@constants': './src/constants',
            '@theme': './src/theme',
            '@services': './src/services',
            '@types': './src/types',
            '@providers': './src/providers',
            '@assets': './src/assets',
          },
        },
      ],
      'react-native-reanimated/plugin',
      'nativewind/babel',
    ],
  };
};
