# PureScript

"An elegant weapon for a more civilized age."



# Overview

- Purely functional programming language
- Haskell syntax with *improvements*
- compiles to JavaScript



# Downloading

Numerous download options available via PureScript's
[website][1], including Linux package managers, NPM, Cabal,
or compiled binaries.

For local projects everything can be done via [Node.js][2]:

  [1]: http://www.purescript.org/download/
  [2]: https://nodejs.org/



# Installing Locally

```sh
mkdir purescript-example && cd purescript-example
npm install purescript
ln -s node_modules/.bin/* .
```

Test that you have a working install via `./psci`. Can also be installed
globally via `npm install -g purescript` (and no need to link bins).



# Tooling

Uses tools familiar to modern JavaScript developers:

- *grunt* or *gulp* for compilation
- *bower* for package management

We'll can use [grunt-purescript][3] to automate compilation,
documentation-generation, and even dead code elimination via the `psc` tool.

Download the example [grunt][4] and [bower][5] files and then let's play!

  [3]: https://github.com/purescript-contrib/grunt-purescript
  [4]: still_needed
  [5]: still_needed



# Let's Play!
