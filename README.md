# Mercadocell - Mobile

![ReactNative] ![TypeScript]

## Environment Config

### For native (Kotlin / Swift)

Follow the official [React Native CLI Setup][rn01] for your platform.

### Visual Studio Code

VSCode is the recommended code editor for multiplatform development and this project is pre
configured for it. On the first time you open this project you'll be prompted to install recommended
extensions. Do so.

You may use other editor, but you are responsible for the configuration.

### For native (Kotlin / Swift)

# For iOS platform, run `yarn ios` (ONLY MAC OS)
# For Android platform, run `yarn android`

## Folder structure

| Folder   | Description                |
| -------- | -------------------------- |
| android/ | Native project for android |
| ios/     | Native project for ios     |
| public/  | Public assets for web      |
| src/     | Multiplatform code         |

## Multiplatform organization

### 1. Lib folder

Code that should be unit tested.

You should put files here if:

1. The file can be tested without any mock, only with the parameters needed.
1. The file **may** be useful in other project
1. The file **does not** depend on any file outside "Lib"

Examples: React presentational components, helpers, etc

### 2. Modules folder

The modules are the different aspects of the project. They're where the business logic should live.

The code here are good candidates for integration tests. Remember to mock API responses.

Examples: React hooks with business logic, container components, etc

### 2.1. Application module folder

This especial module is where all the code that is needed for the application as a whole.

Examples: Backend calls configuration, global state, application shells (layout), etc

### 3. Screens

The code in this folders is where you should handle page routing of the application. The `pages/` is
for the web and `screens/` for mobile.

The routes should handle all the initialization needed for the application, as well as final
rendering for the client.

## Troubleshooting

### Dependencies
In case of dependencies problems you can follow these steps:
1. Be sure that you had run 'yarn install' on the root project folder.
2. Be sure that all servers are terminated, inclusive others projects servers that was running previously and than restart the 'metro server'.
3. Before run any iOS build command be sure that you had run 'pod install' inside the 'ios' project folder.

---

[expo01]:
  https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&gl=US
  'Expo Client Android'
[rn01]: https://reactnative.dev/docs/environment-setup 'Setting up the development environment'
[reactnative]: https://img.shields.io/badge/ReactNative-0.63-61DAFB?logo=react
[typescript]: https://img.shields.io/badge/TypeScript-4.0-3178c6?logo=typescript
