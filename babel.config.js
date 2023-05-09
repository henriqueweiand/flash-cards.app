module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
        },
      ],
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@core": "./src/core",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@services": "./src/core/services",
            "@providers": "./src/core/providers",
            "@hooks": "./src/core/hooks",
            "@context": "./src/core/context",
            "@domain": "./src/core/domain",
            "@routes": "./src/routes",
          },
        },
      ],
    ],
  };
};
