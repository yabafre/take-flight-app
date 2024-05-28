const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

// Modify the resolver to include custom aliasing
config.resolver = {
    ...config.resolver,
    extraNodeModules: {
        "@": path.resolve(__dirname, "./"), // Point "@" to the root directory
        "@app": path.resolve(__dirname, "src"), // Point "@app" to the "src" directory
        "@assets": path.resolve(__dirname, "assets"), // Point "@assets" to the "assets" directory
    },
    assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"), // Remove "svg" from the list of asset extensions
    sourceExts: [...config.resolver.sourceExts, "svg"], // Add "svg" to the list of source extensions
};

module.exports = withNativeWind(config, { input: "./src/global.css" });
