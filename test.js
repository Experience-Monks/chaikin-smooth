var smooth = require('./')
var test = require('tape').test

var paths = [
    [
        [10, 15], [2, 5]
    ],
    [
        [10, 10], [5, 25], [0,0]
    ],
    [
        [10, 10]
    ],
    []
]

var expected = [
    [
        [10, 15],
        [8, 12.5],
        [4, 7.5],
        [2, 5]
    ],

    [ [ 10, 10 ],
      [ 8.75, 13.75 ],
      [ 6.25, 21.25 ],
      [ 3.75, 18.75 ],
      [ 1.25, 6.25 ],
      [ 0, 0 ] ],

    [
        [10, 10]
    ],
    []
]

test("Chaikin's smoothing algorithm on 2d points", function(t) {
    var smoothed = paths.map(smooth)

    smoothed.forEach(function(p, i) {
        t.deepEqual(p, expected[i], 'smooths 2D polyline')
    })

    var result = [ 
        [ -2, -2 ],
        [ -4, -6 ],
        [ 5, 10 ],
        [ 6.25, 10 ],
        [ 8.75, 10 ],
        [ 10, 10 ] 
    ]
    var polyline = [ [-2, -2], [-4, -6] ]
    var input = [ [5, 10], [10, 10] ]
    var output = smooth(input, polyline)
    t.equal(output, polyline, 'should reuse array')
    t.notEqual(smooth(input).length, output.length, 'should create new empty array')
    t.deepEqual(polyline, result, 'pushes smoothed input onto reusable array')
    t.end()
})