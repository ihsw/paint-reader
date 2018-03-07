# paint-reader

[![Build Status](https://travis-ci.org/ihsw/paint-reader.svg?branch=master)](https://travis-ci.org/ihsw/paint-reader)
[![Coverage Status](https://coveralls.io/repos/github/ihsw/paint-reader/badge.svg?branch=master)](https://coveralls.io/github/ihsw/paint-reader?branch=master)

## Building

This is application uses NPM for scripting and runs via node.

    $ git clone git@github.com:ihsw/paint-reader.git
    Cloning into 'paint-reader'...
    remote: Counting objects: 147, done.
    remote: Compressing objects: 100% (76/76), done.
    remote: Total 147 (delta 63), reused 128 (delta 46), pack-reused 0
    Receiving objects: 100% (147/147), 36.25 KiB | 1003.00 KiB/s, done.
    Resolving deltas: 100% (63/63), done.
    $ cd paint-reader
    $ npm install
    added 320 packages in 2.277s
    $ npm run -s build
    built
    $ cat ./test-fixtures/example-3-complex | node .
    G M G G G

Feel free to substitute the given example file for any other.
