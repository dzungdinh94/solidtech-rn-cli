# SolidtechRN CLI Commands

This document reviews the commands that the SolidtechRN CLI provides. This guide
assumes that you've installed SolidtechRN. If you haven't, then check out our Getting
Started Guide [here](./getting-started.md).

Enter `SolidtechRN` into your command line to see the commands offered by SolidtechRN CLI.

#### General Options

| Option    | Description                                                                           | Example                             |
| --------- | ------------------------------------------------------------------------------------- | ----------------------------------- |
| `--debug` | Pass this flag to any command to get more verbose logging if something is going wrong | `SolidtechRN new My App --debug`    |
| `--npm`   | Pass this flag if you want `npm` used for any package installs                        | `SolidtechRN add some-plugin --npm` |

### Plugins

#### Add

```sh
$ SolidtechRN add {SolidtechRN plugin name}
```

Adds an SolidtechRN CLI plugin.

SolidtechRN CLI plugins are just Node packages. They must have an index.js file with an
`add` function. Calling `SolidtechRN add <plugin name>` calls this function. Its job is to add the
desired plugin to your project. It may modify files in your project.

You can find published SolidtechRN CLI plugins on npm, but you can also add unpublished
plugins from source. To do so, simply pass the path to the plugin instead of its
name.

The plugin NodeJS package name (i.e. the name of the package you will find it on npmjs.com) is `SolidtechRN-{SolidtechRN plugin name}`.

Ex: You can find the `maps` SolidtechRN plugin (added to your project with `SolidtechRN add maps`) at https://www.npmjs.com/package/SolidtechRN-maps

#### New

```sh
$ SolidtechRN plugin new {plugin name}
```

Creates an SolidtechRN plugin.

This command allows you to create a plugin or list currently available plugins (coming
soon).

When creating a plugin, you can choose to include an example component and example
command or generator.

#### Remove

```sh
$ SolidtechRN remove {SolidtechRN plugin name} [-y]
```

Removes an SolidtechRN CLI plugin. You can add `-y` which automatically answers
"yes" to any confirmation questions.

The opposite of `SolidtechRN add`, this removes a plugin from your project. Be warned
that this may change other files in your project, e.g. to undo changes made by
`add`. There is a potential for danger here, so you may want to consider using
version control to be on the safe side.

### Doctor

```sh
$ SolidtechRN doctor
```

Checks your dev environment for dependencies.

This command checks your dev environment for dependencies. It will list the version of
system, JavaScript, React Native, SolidtechRN CLI, Android, and iOS dependencies
available on your machine, and where applicable, their location. This may be
useful when debugging or when seeking help for an issue in forums.

Especially handy is `SolidtechRN doctor --bug`, which opens webpage with pre-filled
out issue on SolidtechRN CLI's github. **_[NOTE: this doesn't seem to work yet]_**

### Generate

```sh
$ SolidtechRN generate listview {listview name}
```

Generates some files.

This command will use generators to create files for you. It looks at
node_modules for folders starting with `SolidtechRN`, then looks in those for
generators. Generators have a folder called `templates`, which (naturally)
contain the templates that determine the contents of the files the generator
generates.

Run `SolidtechRN generate` by itself and it will list available generators. Run
`SolidtechRN generate <generator name>` to use the desired generator.

### Help

```sh
$ SolidtechRN help
```

Lists all of the available SolidtechRN commands.

### New

```sh
$ SolidtechRN new {Project name}
```

Generates a new React Native project with SolidtechRN CLI.

`SolidtechRN new` uses `npx react-native init`, then adds files specific to SolidtechRN CLI.

When you execute this command, SolidtechRN CLI will give you a series of options for
your new project regarding what libraries you would like to use.

With `SolidtechRN new`, you have the option to pick your own boilerplate to install for your project. The default is `SolidtechRN-ir-boilerplate`, however you can change this by providing your own boilerplate available on `npm`. You can also point to a folder on your machine or public / private repository. `--boilerplate` can also be shortened to `-b`.

```sh
$ SolidtechRN new MyAwesomeApp --boilerplate ir-boilerplate
$ SolidtechRN new MyAwesomeApp -b boss-boilerplate
$ SolidtechRN new MyAwesomeApp -b /path/to/my/SolidtechRN-cool-boilerplate
$ SolidtechRN new MyAwesomeApp -b git@github.com:solidtechvn/SolidtechRN-andross.git
$ SolidtechRN new MyAwesomeApp -b https://github.com/solidtechvn/SolidtechRN-andross.git
```

If you would like to skip the boilerplate and use what is available out of the box with React Native, you can pass the `--no-boilerplate` option.

```sh
$ SolidtechRN new MyBareBonesApp --no-boilerplate
```

If you want to use a specific version of a boilerplate, you can add the version to the boilerplate name. For example, use `SolidtechRN new BetaApp -b SolidtechRN-bowser@3.0.0-beta.2` to use the `3.0.0-beta.2` release of the Bowser boilerplate.

#### Other Options

- `--skip-git`: Use this flag if you do not want to initiate a git repository for your app
- `--overwrite`: If the new app's folder already exists, use this flag to overwrite the directory. If you don't, SolidtechRN CLI will ask you if you want to overwrite it.
- `--min` or `--max`: You can (with most boilerplates) pass through one of these flag to automatically choose maximum options or minimum options.

### Spork

```sh
$ SolidtechRN spork
```

Copies templates as blueprints for this project.

SolidtechRN's boilerplates are generally pretty opinionated. Spork lets you avoid those
opinions by "forking" the template. Like a 'fork' on a git repo `SolidtechRN spork`
looks at the generators, then looks at the templates. You then select the things
you want to make a copy of. They then live in `SolidtechRN/Spork/...`.

After entering `SolidtechRN spork`, you will be presented with a list of available
templates to spork. Cycle through them with arrow keys, select the desired
templates with `space` and finish with `enter`.

Spork lets you be kinda happy with someone else's template, but then change it
to your liking. For example, different linting, new headers, etc.

### Version

```sh
$ SolidtechRN version
```

Prints current version of installed SolidtechRN CLI.
