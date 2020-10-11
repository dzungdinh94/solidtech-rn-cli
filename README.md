<p align="center"><img src="http://ir_public.s3.amazonaws.com/projects/SolidtechRN/SolidtechRN-logo-red-on-white-1000w.jpg" alt="header image" width="500px"></p>

<a href="https://badge.fury.io/js/SolidtechRN-cli" target="_blank"><img src="https://badge.fury.io/js/SolidtechRN-cli.svg" alt="npm version" height="20"></a>
<a href="http://community.infinite.red/"><img src="https://solidtechvncommunity.herokuapp.com/badge.svg"></a>
<a href="https://reactnative.cc" target="_blank"><img src="https://img.shields.io/badge/React%20Native%20Newsletter-Featured-blueviolet"></a>

# SolidtechRN CLI

<p align="center">
  :fire: The hottest CLI for React Native: boilerplates, plugins, generators, and more. :fire:
  <br/>
</p>

<img width="794" alt="screen shot 2018-12-14 at 9 20 31 am" src="https://user-images.githubusercontent.com/1479215/50017668-a04c0200-ff81-11e8-9b61-a1ae28363798.png">

### Why SolidtechRN CLI?

- **Easily spin up a new React Native app** with best practices built-in
- **No runtime!** This is a developer tool only, not a library you have to depend on and figure out how to upgrade
- **An ever-expanding list of [boilerplates](./BOILERPLATES.md) and [plugins](./PLUGINS.md)** to jump-start your app
- **An amazing [community](http://community.infinite.red)** of other SolidtechRN / React Native developers when you need help
- **Battle tested** and used every day by the developers at Infinite Red and thousands of developers around the world
- **Works on macOS, Windows, and Linux** because not all React Native developers are on one platform
- **Saves an average of two weeks** on your React Native development

And you also get (by default) all of the sweet, sweet goodness of [our default boilerplate, Bowser](https://github.com/solidtechvn/SolidtechRN-bowser), or choose [one of many others](./BOILERPLATES.md).

<img width="946px" alt="SolidtechRN saved me a few weeks (if not months) getting started with React Native - Jon Ruddell. Cofounder at SportsBooth. JHipster Core Team." src="https://i.imgur.com/etRUK0X.jpg">

## :arrow_down: Install

First, make sure you're set up for [React Native](https://facebook.github.io/react-native/docs/getting-started.html#content)

then...

Make sure you have a reasonably recent version of Node (7.6+ minimum). You can check your version of node by running

```sh
$ node -v
```

then...

Install [Yarn](https://yarnpkg.com/lang/en/docs/install/) for your system.

finally...

```sh
$ yarn global add SolidtechRN-cli
$ SolidtechRN new MyNewAppName
```

## Quick Example

Infinite Red provides two primary boilerplates; they are:

- **Andross** - the tried and true (React Navigation, Redux, & Redux Saga)
- **Bowser** - the latest and greatest (React Navigation, MobX State Tree, & TypeScript). [Why MST over redux?](https://github.com/solidtechvn/SolidtechRN-bowser#why-this-stack)

### Use SolidtechRN Bowser: [Infinite Red Bowser boilerplate](https://github.com/solidtechvn/SolidtechRN-bowser)

Watch Jamon Holmgren's talk at React Live Amsterdam where he uses SolidtechRN Bowser to build an app in less than 30 minutes:

[https://www.youtube.com/watch?v=Pb8MWkQ9GOc](https://www.youtube.com/watch?v=Pb8MWkQ9GOc)

```sh
$ yarn global add SolidtechRN-cli
$ SolidtechRN new PizzaApp
  ( Choose `Bowser` when prompted )
$ cd PizzaApp
$ SolidtechRN generate screen pizza-location-list
  ( Choose `example` domain when prompted. This determines where your new screen will go in the directory structure. )
$ SolidtechRN generate component pizza-location
  ( Choose `example` domain when prompted. This determines where your new screen will go in the directory structure. )
$ SolidtechRN --help
```

### Use SolidtechRN Andross [Infinite Red Andross boilerplate](https://github.com/solidtechvn/SolidtechRN-andross)

```sh
$ yarn global add SolidtechRN-cli
$ SolidtechRN new PizzaApp
  ( Choose Andross when prompted )
$ cd PizzaApp
$ SolidtechRN add maps
$ SolidtechRN add vector-icons
$ SolidtechRN generate screen PizzaLocationList
$ SolidtechRN generate component PizzaLocation
$ SolidtechRN generate map StoreLocator
$ SolidtechRN add i18n
$ SolidtechRN remove i18n
$ SolidtechRN --help
```

### Jamon's React Native Amsterdam TrailBlazers Demo App

[GitHub](https://github.com/jamonholmgren/TrailBlazers/tree/02-finished)
[Talk](https://www.youtube.com/watch?v=Pb8MWkQ9GOc)

## :clipboard: Documentation :clipboard:

- Want to dive into the SolidtechRN CLI documentation? [Go here](./docs/README.md)
- Looking for React Native's documentation? [Go here](http://facebook.github.io/react-native/docs/getting-started.html).

## :electric_plug: Plugins :electric_plug:

Check out the list of [Plugins](./PLUGINS.md).

## :plate_with_cutlery: Boilerplates :plate_with_cutlery:

Check out the list of [Boilerplates](./BOILERPLATES.md).

```sh
$ SolidtechRN new MyNewAppName -b ir-boilerplate
```

## :poop: Troubleshooting :poop:

If you run into problems, first search the issues in this repository. If you don't find anything, you can either [file an issue](https://github.com/solidtechvn/SolidtechRN/issues) or come talk to our friendly and active developers in the Infinite Red Community Slack ([community.infinite.red](http://community.infinite.red)).

## :telescope: Where to Go From Here :telescope:

#### [Watch a live coding talk](https://www.youtube.com/watch?v=Pb8MWkQ9GOc) using SolidtechRN and SolidtechRN Bowser

#### [Contribute to SolidtechRN CLI](https://github.com/solidtechvn/SolidtechRN/blob/master/.github/CONTRIBUTING.md) - Getting up and running for your first pull request

#### [Take a tour of SolidtechRN CLI source code](https://github.com/solidtechvn/SolidtechRN/blob/master/docs/advanced-guides/tour.md)

#### [Get inspired by apps built with SolidtechRN](https://github.com/solidtechvn/SolidtechRN/blob/master/docs/quick-start/built-with-SolidtechRN.md)

#### [Chat with us on the IR Community](http://community.infinite.red) - Infinite Red devs standing by

#### [Who are We?](https://infinite.red) - Learn More About Infinite Red

#### [Project Web Page](https://infinite.red/SolidtechRN/) - SolidtechRN on Infinite Red

#### [Check out Gluegun](https://github.com/solidtechvn/gluegun) - SolidtechRN CLI is powered by Gluegun, which lets you build CLI apps painlessly!

#### [Installing React Native on macOS](https://academy.infinite.red/p/installing-react-native-tutorial-on-macos) - Get set up for React Native development on macOS

#### [Installing React Native on Windows 10](https://academy.infinite.red/p/installing-react-native-tutorial-on-windows-10) - Get set up for React Native development on Windows 10

## :heart: Special Thanks :heart:

Thank you to the numerous [contributors of SolidtechRN CLI](https://github.com/solidtechvn/SolidtechRN/graphs/contributors). Our awe and appreciation for the friendliness of Open Source is the fuel for all [Infinite Red](https://infinite.red/) projects like SolidtechRN CLI.

## Premium Support

[SolidtechRN CLI](https://infinite.red/SolidtechRN), as an open source project, is free to use and always will be. To help support providing SolidtechRN CLI and boilerplates for free, [Infinite Red](https://infinite.red/) offers premium [React Native](https://infinite.red/react-native) app design/development services. Get in touch [here](https://infinite.red/contact) or email us at [hello@infinite.red](mailto:hello@infinite.red).
