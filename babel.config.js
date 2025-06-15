module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Plugin untuk react-native-dotenv, pastikan ini ada
      'module:react-native-dotenv',

      // Plugin ini penting jika Anda menggunakan navigasi atau animasi
      'react-native-reanimated/plugin',
    ],
  };
};