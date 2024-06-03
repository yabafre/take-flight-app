const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Configure the transformers
config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-sass-transformer"),
    getTransformOptions: async () => ({
        transform: {
            experimentalImportSupport: false,
            inlineRequires: false,
        },
    }),
};

// Extend the resolver configuration
config.resolver = {
    ...config.resolver,
    extraNodeModules: {
        "@": path.resolve(__dirname, "./"), // Point "@" to the root directory
        "@app": path.resolve(__dirname, "src"), // Point "@app" to the "src" directory
        "@assets": path.resolve(__dirname, "assets"), // Point "@assets" to the "assets" directory
        "@app/api": path.resolve(__dirname, "src/services/api"), // Point "@app/api" to the "src/services/api" file
    },
    assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"), // Remove "svg" from the list of asset extensions
    sourceExts: [...config.resolver.sourceExts, "svg", "scss", "sass"], // Add "svg", "scss", and "sass" to the list of source extensions
};

// Include react-native-svg-transformer separately
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

module.exports = withNativeWind(config, {
    input: "./src/global.css",
    outputDir: "./src/style",
    configPath: "./tailwind.config.js",
});
