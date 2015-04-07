# PureScript - A Whirlwind Tour

"An elegant weapon for a more civilized age."



# Caveat

This talk assumes basic knowledge of Haskell syntax.



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



# Installing via NPM

```sh
mkdir purescript-example && cd purescript-example
npm install -g purescript
```

Test that you have a working install via `psci`.



# Tooling

Uses tools familiar to modern JavaScript developers:

- *npm* to manage tooling
- *grunt* or *gulp* for compilation and tasks
- *bower* for project package management

For a quick start, clone the associated [example
project][3] and let's have some fun!

  [3]: https://github.com/Haskallywags/purescript-intro



# Let's Play!

Install all required dependencies...

```sh
npm install
bower install
grunt
```

...and open `index.html` in your browser of choice. If you
open the console, you should see "Hello, World!" output.



# Calling PureScript from JavaScript

- see the `<script>` and `<body>` tags in `index.html`.
- see the corresponding `main` function of `src/Main.purs`

`psc` provides a very straightforward mapping between
written PureScript and generated `JavaScript`.



# Differences to Other Compile-to-JS Languages

- straightforward mapping of PureScript to JavaScript
- native JavaScript types
- compilation provides type-checking, dead code
  elimination, some optimization



# Differences to Elm

- higher-kinded types
- type-classes
- together, this means *monads*!



# Differences to Haskell

- higher granularity of type-classes
- strict by default
- uses common tooling
- can be easily added into existing projects



# Similarities to Haskell

All of the pure functions and immutable data that we know
and love, but improved upon.

```purs
head :: [a] -> Maybe a
head (x:xs) = Just x
head _      = Nothing
```



# Native JavaScript Types

- allows for predictable interop between JS and PS
- includes `String`, `Number`, `Boolean`, `[]`, `Object`
- `Object`!? Like Haskell records but better!




# PureScript has Records!

Example of a PureScript object literal (of kind `#`):

```purs
type Person = Object (name :: String, age: Number)

myself :: Person
myself = { name: "Jon Childress", age: 32 }

getAge :: Person -> Number
getAge person = person.age
```



# Functions have Object Row Polymorphism!

```purs
agePlusOne :: { age :: Number | rows } -> Number
agePlusOne record = record.age + 1
```

Note: function composition operators are `<<<` and `>>>`.


# PureScript has Effects!

Rather than IO, carries side-effects in "Eff" monad that
tracks "rows" of effects much like an object (of kind `!`)

```purs
main :: forall eff. Eff (trace :: Trace | eff) Unit
main = trace "Hello, World!"
```



# Effects can be Eliminated!

Example from [purescript-number-format][4] library:

```purs
errorAsNothing
  :: forall e a. Eff (err :: Exception | e) (Maybe a)
  -> Eff eff (Maybe a)
errorAsNothing = catchException (return <<< const Nothing)
```

  [4]: https://github.com/Jonplussed/purescript-number-format



# An Effect Monad sans Effects can be Removed!

```purs
toString :: Number -> Number -> Maybe String
toString radix num =
  runPure
    (errorAsNothing $ Just <$> unsafeToString radix num)
```



# Granular Type-classes

Functor, Semigroupoid, Semiring, Apply, Bind, Applicative,
Plus, Alternative, Monad, MonadPlus, etc...

- allows for finer type constraints
- each class handles a single behavior
- makes understanding each class easier

```purs
class (Monad m, Alternative m) <= MonadPlus m where
class (Applicative f, Plus f) <= Alternative f where
```



# Strictness by Default

- allows for predictable interop with JavaScript
- easier to reason about resource behavior
- [`Control.Lazy`][5] allows for deferring evaluation

  [5]: https://github.com/purescript/purescript-control#user-content-module-controllazy



# The Foreign Function Interface

```purs
foreign import stringify """
  function stringify(n) {
    return function (x) {
      return JSON.stringify(x, null, n);
    };
  } :: forall a. Number -> a -> String
"""
```



# Avoiding FFI Boilerplate

```purs
import Data.Function

foreign import stringify """
  function stringify(n, x) {
    return JSON.stringify(x, null, n);\
  }
""" :: forall a. Fn2 Number a String

stringify :: forall a. Number -> a -> String
stringify n x = runFn2 stringify n x
```



# Cool Stuff: V for Validation

The [V][6] validation monad provides helpers for collecting
errors in arbitrary Semigroup (monoid sans `mempty`).

```purs
validate :: Person -> V [Error] Person
validate person = { first: _, last: _, email: _ }
  <$> validateName person.first
  <*> validateName person.last
  <*> validateEmail person.email
```

  [6]: https://github.com/purescript/purescript-validation



# Cool Stuff: C for Continuation

The [C][7] continuation monad helps wire together
asynchronous calls in a predictable manner.

```purs
copyFileCont :: forall eff. FilePath -> FilePath -> C eff (Either ErrorCode Unit)
copyFileCont src dest = do
  e <- readFileCont src
  case e of
    Left err -> return $ Left err
    Right content -> writeFileCont dest content
```

  [7]: https://github.com/purescript/purescript-transformers/blob/master/docs/Monad/Cont.md



# Cool Stuff: RWS for Reader-Writer-State

The [RWS][8] monad allows for all operations allowed by
`StateT`, `ReaderT` and `WriterT` transformers.

Each transformer is defined in terms of type-classes, so
that nested monads receive each other's functions.

  [8]: https://github.com/purescript/purescript-transformers/blob/master/docs/Monad/RWS.md



# Cool Stuff: Parallel (thankfully not P)

The [Parallel][9] applicative wraps the continuation monad
to provide parallel computation.

```purs
loadModel :: ContT Unit (Eff (ajax :: AJAX)) Model
loadModel = do
  token <- authenticate
  runParallel $
    Model <$> inParallel (get "/products/popular/" token)
          <*> inParallel (get "/categories/all" token)
```

  [9]: https://github.com/purescript/purescript-parallel



# Cool Stuff: Signals

[Signals][10] provide a means of reacting to user input in
a predictable form. Signals include key-presses, mouse
events, and even `requestAnimationFrame()`.

Signals are beyond the scope of this talk, but see the [Elm
signal documentation][11] for a great explanation.

  [10]: https://github.com/bodil/purescript-signal/
  [11]: http://package.elm-lang.org/packages/elm-lang/core/1.1.1/Signal



# Cool Stuff: So Much More

- "standard library" modules found in [purescript][12] org
- curated contributions in [purescript-contrib][13] org

  [12]: https://github.com/purescript
  [13]: https://github.com/purescript-contrib



# Want to Know More About PureScript?

Read the fantastic [PureScript book][14] to get up-to-speed
with this amazing language.

  [14]: https://leanpub.com/purescript/read
