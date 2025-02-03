// const {getDefaultConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('@react-native/metro-config').MetroConfig}
//  */
// const defaultConfig = getDefaultConfig(__dirname);

// // 👇 Ajoute ceci pour autoriser les fichiers dans le workspace
// defaultConfig.resolver.sourceExts = [...defaultConfig.resolver.sourceExts, "cjs"];
// defaultConfig.resolver.blockList = [/node_modules\/.*\/node_modules\/react-native\/.*/];

// module.exports = defaultConfig
// const { getDefaultConfig } = require('@react-native/metro-config');
// const path = require('path');

// const defaultConfig = getDefaultConfig(__dirname);

// // ✅ Ajout des extensions supportées
// defaultConfig.resolver.sourceExts = [...defaultConfig.resolver.sourceExts, "cjs"];

// // ✅ Empêche Metro de suivre les symlinks inutiles
// defaultConfig.resolver.blockList = [/node_modules\/.*\/node_modules\/react-native\/.*/];

// // ✅ Ajout des workspaces pour Metro (évite les erreurs de résolution)
// defaultConfig.watchFolders = [
//   path.resolve(__dirname, '../../core'),
//   path.resolve(__dirname, '../../adapter/react-native'),
// ];

// module.exports = defaultConfig;
const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);