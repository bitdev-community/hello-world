# `Hello World` App Evolution
This repository will take you through the evolution of a basic hello-world application that incorporates React for the frontend (`/web`) and Express.js for the API (`/api`). Initially, the application follows a conventional React and Express.js architecture, but gradually evolves into an independent component architecture.

As you progress through the different stages of the transition, you'll find the code in corresponding branch in this repository.

## Pre-Bit
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

## Bit-Init
**Example:** [Code](https://github.com/teambit-community/hello-world/tree/bit-init)

## Initializing Bit Workspace
First at the project root directory, `bit init` command is used and workspace.json was updated to use:
1. `greeters` for the workspace.
2. `development` for the default scope.

Now, let's create the development environments for both React and Node which we use to build, develop and test Bit components. The Envs are also tracked as components in Bit so that you can share them with your development team.

### Creating the `React Env`
First let's start by creating a `React Env` by running `bit create react-env envs/react-env --aspect teambit.react/react-env` command.

### Creating the `Node Env`
Similarly let's create a Node Env for the express components by executing `bit create node-env envs/node-env --aspect teambit.harmony/node` command.

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

## Making them Bit Components




