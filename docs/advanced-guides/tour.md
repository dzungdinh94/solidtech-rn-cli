# Tour of SolidtechRN CLI source code

Let's take a tour of SolidtechRN CLI's source code.

(note in any code examples we're using `yarn`)

## gluegun

`SolidtechRN-cli` (described [next](#SolidtechRN-cli)) uses another Infinite Red npm package called [Gluegun](https://github.com/solidtechvn/gluegun). Gluegun is sort of like [Yeoman](http://yeoman.io/) in that it gives us a bunch of CLI tools, but it's much lighter and doesn't take over your whole CLI.

Whenever you see `toolbox` in `SolidtechRN-cli`, it is the Gluegun toolbox. This is a JS object that has a bunch of useful functions and properties attached to it, like `print` and `parameters`.

In addition, SolidtechRN CLI adds some of its own SolidtechRN CLI-specific functions and parameters to `toolbox` ... those are found under `toolbox.SolidtechRN`.

If you're curious what's in the toolbox object, check out Gluegun's [nice toolbox docs](https://github.com/solidtechvn/gluegun/blob/master/docs/toolbox-api.md), or just inspect it with `console.dir(toolbox, {depth: 3, colors: true})`.

## SolidtechRN-cli

The `SolidtechRN` binary itself is in the `bin` folder and there are some initial scripts that run whenever you invoke `SolidtechRN` in the `./src/cli` folder.

#### Commands

The commands you can run with SolidtechRN CLI, such as `SolidtechRN add <plugin>`, `SolidtechRN doctor`, `SolidtechRN new MyApp`, all execute the corresponding JS files under `./src/commands`. Take a peak in each of those files. When you see a function like this:

```javascript
module.exports = async function(toolbox) {
  const { print, filesystem, prompt, ignite, parameters, strings } = toolbox
  // ...
}
```

... then you're looking at the main function. The `toolbox` object is described above in the [gluegun section](#gluegun). Here, we're destructuring several parts of `toolbox` such as `print`, `filesystem`, etc. Those get used in the main body of the function to perform the various tasks.

#### Extensions

Any file exports in this directory will add functionality to the `toolbox` object as additional properties. Let's say we wanted a `toolbox.foo()` function. Just add `foo.ts` into `./src/extensions` and export a function from there that adds any extra features to the toolbox. You'll then be able to access those anywhere.

Notice that there are several functions under the `SolidtechRN` extension. For example, `toolbox.SolidtechRN.addModule()` is in `./src/extensions/SolidtechRN/add-module.ts`.

We often use extensions for namespacing and organizing various tools and data that we need in the CLI.

#### Tests

`SolidtechRN-cli` tests are fairly straightforward. For any new commands or extensions you might add, we recommend adding tests for them here.

## Documentation and Github

Github-specific templates and docs are in `./.github`. Other documentation is found in `./docs`. If you add any new features or update old features, please include appropriate documentation changes in your pull request as well.

_That's it! If you have questions about the structure of SolidtechRN CLI, feel free to open an issue or [join the Infinite Red Community Slack](http://community.infinite.red)._
