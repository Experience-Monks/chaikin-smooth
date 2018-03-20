var smooth = require('./')
var test = require('tape').test
var deepcopy = require('deepcopy')

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
    [],
    [   // A closed ring
        [0, 10], [10, 10], [10, 0], [0, 0], [0, 10]
    ]
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
    [],
    [
        [2.5, 10], [7.5, 10],
        [10, 7.5], [10, 2.5],
        [7.5, 0], [2.5, 0],
        [0, 2.5], [0, 7.5],
        [2.5, 10]
    ]
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


    var input1 = [[10, 25], [50, 12]]
    var copied = deepcopy(input1)
    var result1 = smooth(input1)

    result1.forEach(function(r) { //edit result
        r[0] *= 2
        r[1] *= 2
    })
    t.deepEqual(input1, copied, 'should produce new point arrays')
    t.end()
})