var copy = require('vec2-copy')

module.exports = function(input, output) {
    if (!Array.isArray(output))
        output = []

    if (input.length>0)
        output.push(copy([0, 0], input[0]))
    for (var i=0; i<input.length-1; i++) {
        var p0 = input[i]
        var p1 = input[i+1]
        var p0x = p0[0],
            p0y = p0[1],
            p1x = p1[0],
            p1y = p1[1]

        var Q = [ 0.75 * p0x + 0.25 * p1x, 0.75 * p0y + 0.25 * p1y ]
        var R = [ 0.25 * p0x + 0.75 * p1x, 0.25 * p0y + 0.75 * p1y ]
        output.push(Q)
        output.push(R)
    }
    if (input.length > 1)
        output.push(copy([0, 0], input[ input.length-1 ]))
    return output
}