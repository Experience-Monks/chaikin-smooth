# chaikin-smooth

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)


[Chaikin's smoothing algorithm](http://www.idav.ucdavis.edu/education/CAGDNotes/Chaikins-Algorithm/Chaikins-Algorithm.html) for 2D polylines.

```js
var smooth = require('chaikin-smooth')

var path = [ [0, 0], [25, 25], [13, 13] ]
var smoothedPath = smooth(path)
```

The result will be:

```js
[ [ 0, 0 ],
  [ 6.25, 6.25 ],
  [ 18.75, 18.75 ],
  [ 22, 22 ],
  [ 16, 16 ],
  [ 13, 13 ] ]
```

## Usage

[![NPM](https://nodei.co/npm/chaikin-smooth.png)](https://nodei.co/npm/chaikin-smooth/)

#### `smooth(path[, output])`

Performs the smoothing algorithm on the specified path, returning a list populated with the additional smoothed points. If the input path has a length of <= 2, the result will be a new array with the same points as the input.

If `output` is provided, it will push the points onto the specified path instead of creating a new one. This is useful to build a smooth polyline out of several inputs, or to re-use arrays to avoid GC thrashing. If reusing, you should clear the path first to zero-length. 

**Note:** This uses a strict array test, so it is safe to use `map` and other array functions on it:

```js
var smoothedPaths = paths.map(smooth)
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/chaikin-smooth/blob/master/LICENSE.md) for details.
