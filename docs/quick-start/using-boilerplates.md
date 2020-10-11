# Using Boilerplates

You can use a boilerplate as the starting point for your app by creating a new
SolidtechRN CLI project with the `--boilerplate` (or `-b`) flag:

```sh
$ SolidtechRN new MySolidtechRNApp -b {boilerplate name}
```

SolidtechRN CLI comes with a default boilerplate.

It creates your app with a host of opinions and options. This boilerplate reflects the way that we at Infinite Red prefer to start our apps. This is also SolidtechRN CLI's default boilerplate; if you don't select a one, SolidtechRN CLI will use this.

You can opt out of a boilerplate entirely by passing the option `--no-boilerplate`. This will skip installing a boilerplate and only create an `SolidtechRN/SolidtechRN.json` file in your project; the bare minimum needed to become SolidtechRN CLI sentient.

We intend to release new boilerplates as best practices change. For example, [React Navigation](https://reactnavigation.org) is a great new navigation library that we recently released in our brand new [`SolidtechRN-ir-boilerplate` boilerplate](https://github.com/solidtechvn/SolidtechRN-ir-boilerplate).
