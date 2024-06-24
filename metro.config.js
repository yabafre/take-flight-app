const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Combine les transformers
config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
    getTransformOptions: async () => ({
        transform: {
            experimentalImportSupport: false,
            inlineRequires: false,
        },
    }),
};

// Configuration du resolver
config.resolver = {
    ...config.resolver,
    extraNodeModules: {
        "@": path.resolve(__dirname, "./"),
        "@app": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "assets"),
        "@app/api": path.resolve(__dirname, "src/services/api"),
    },
    assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...config.resolver.sourceExts, "svg", "scss", "sass"],
};

// Ajout du support pour SASS
config.transformer.sassTransformerPath = require.resolve("react-native-sass-transformer");

module.exports = withNativeWind(config, {
    input: "./src/global.css",
    outputDir: "./src/style",
    configPath: "./tailwind.config.js",
});