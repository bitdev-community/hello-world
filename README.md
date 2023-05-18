[![Bit Org Greeings](https://img.shields.io/badge/Bit-@greetings-2C00C3)](https://bit.cloud/greetings)

[![Scope Hello World](https://img.shields.io/badge/Scope-Hello_World_(5)-820596)](https://bit.cloud/greetings/hello-world)
[![Scope Development](https://img.shields.io/badge/Scope-Development_(4)-820596)](https://bit.cloud/greetings/development)
[![Scope Design](https://img.shields.io/badge/Scope-Design_(2)-820596)](https://bit.cloud/greetings/design)

# Monolith to Bit Components: Step by Step Transition Guide
This repository will take you through the evolution of a basic hello-world application that uses React for the frontend (`/web`) and Express.js for the API (`/api`). Initially, the application is designed as monolith using React and Express.js. It is then transitioned into an independent component architecture highlighting each step in the process.

## Full-Stack React and Express Application 
**Example:** [Code](https://github.com/teambit-community/hello-world/tree/pre-bit)

This branch contains a classical React frontend and an Express.js API. They are deployed to Netlify and to a Virtual Machine using SSH.

```
- web
  - src
    - app.tsx
    - index.tsx
    - pages
      - landing-page
    - hooks
      - use-hello-world
    - ui
      - button
      - heading
- api
  - src
    - app.ts
    - index.ts
    - routes
      - hello
- .github
  - workflows
    - main.yml
- netlify.toml
- _redirects
```

### Running Locally
Run React App: Go to `/web` directory and execute `npm run start` command. 
Run Express.js API: Go to `/api` directory and execute `npm run start` command.

## Transition to Bit Component

## Initializing Bit Workspace
First at the project root directory, `bit init` command is used and workspace.json was updated to use:
1. `greeters` for the workspace.
2. `development` for the default scope.

**Example:** [Code](https://github.com/teambit-community/hello-world/tree/bit-init)

Now, let's create the development environments for both React and Node which we use to build, develop and test Bit components. The Envs are also tracked as components in Bit so that you can share them with your development team.

### Creating the `React Env`
First let's start by creating a `React Env` by running `bit create react-env envs/react-env --aspect teambit.react/react-env` command.

[![Component React Env](https://img.shields.io/badge/React_Env-v0.0.2-brightgreen)](https://bit.cloud/greetings/development/envs/react-env)

### Creating the `Node Env`
Similarly let's create a Node Env for the express components by executing `bit create node-env envs/node-env --aspect teambit.harmony/node` command.

[![Component Node Env](https://img.shields.io/badge/Node_Env-v0.0.9-brightgreen)](https://bit.cloud/greetings/development/envs/node-env)

## Extracting the Components

### `Web` project

The components in `web` project are moved into two different scopes `design` and `hello-world`.

```
greeters.design/button
greeters.design/paragraph
greeters.hello-world/app
greeters.hello-world/hello-world-app
greeters.hello-world/hooks/use-hello-world
greeters.hello-world/pages/hello-world-page
```

### `Api` project
The components in `api` project are also moved into the scope `hello-world`.

```
greeters.hello-world/api
greeters.hello-world/api-routes/hello
```

**Note**: After doing this, you will get issues with the local dependency paths. Let's ignore it until we `add` all the components into `bit`.

**Example:** [Code](https://github.com/teambit-community/hello-world/tree/bit-apps)

## All Components & Scopes

| Scope           | Components                                                                      |
|---------------------------|----------------------------------------------------------------------------|
| [![Scope Hello World](https://img.shields.io/badge/Scope-Hello_World_(5)-820596)](https://bit.cloud/greetings/hello-world) | [![Component Hello](https://img.shields.io/badge/Hello-v0.0.9-brightgreen)](https://bit.cloud/greetings/hello-world/api-routes/hello) [![Component Use Hello World](https://img.shields.io/badge/Use_Hello_World-v0.0.2-brightgreen)](https://bit.cloud/greetings/hello-world/hooks/use-hello-world) [![Component Landing Page](https://img.shields.io/badge/Landing_Page-v0.0.3-brightgreen)](https://bit.cloud/greetings/hello-world/pages/landing-page) [![Component Hello World App](https://img.shields.io/badge/Hello_World_App-v0.0.5-brightgreen)](https://bit.cloud/greetings/hello-world/apps/hello-world-app) [![Component Hello World API](https://img.shields.io/badge/Hello_World_Api-v0.0.19-brightgreen)](https://bit.cloud/greetings/hello-world/apps/hello-world-api) |
| [![Scope Design](https://img.shields.io/badge/Scope-Design_(2)-820596)](https://bit.cloud/greetings/design) | [![Component Button](https://img.shields.io/badge/Button-v0.0.3-brightgreen)](https://bit.cloud/greetings/design/ui/button) [![Component Heading](https://img.shields.io/badge/Heading-v0.0.2-brightgreen)](https://bit.cloud/greetings/design/ui/heading) |
| [![Scope Development](https://img.shields.io/badge/Scope-Development_(4)-820596)](https://bit.cloud/greetings/development) | [![Component SSH Deployer](https://img.shields.io/badge/SSH_Deployer-v0.0.13-brightgreen)](https://bit.cloud/greetings/development/deployers/ssh-deployer) [![Component React Env](https://img.shields.io/badge/React_Env-v0.0.2-brightgreen)](https://bit.cloud/greetings/development/envs/react-env) [![Component Node Env](https://img.shields.io/badge/Node_Env-v0.0.9-brightgreen)](https://bit.cloud/greetings/development/envs/node-env) [![Component Node App Type](https://img.shields.io/badge/Node_App_Type-v0.0.3-brightgreen)](https://bit.cloud/greetings/development/app-types/node-app-type)|
