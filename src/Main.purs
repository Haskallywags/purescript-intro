module Main (main) where

import Control.Monad.Eff
import Debug.Trace

main :: forall eff. Eff (trace :: Trace | eff) Unit
main = trace "Hello, World!"
