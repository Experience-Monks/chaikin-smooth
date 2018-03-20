var copy = require('vec2-copy')

module.exports = function(input, output) {
    if (!Array.isArray(output))
        output = []

    var inputLen = input.length;
    var lastIdx = inputLen - 1;

    var isClosedRing = inputLen > 2
        && input[0][0] === input[lastIdx][0]
        && input[0][1] === input[lastIdx][1];

    // Push first pair if input is not a closed ring
    if (inputLen > 0 && !isClosedRing) {
        output.push(copy([0, 0], input[0]))
    }
    for (var i = 0; i < lastIdx; i++) {
        var p0 = input[i]
        var p1 = input[i+1]

        if (isClosedRing) {
            var currentIdx = i % lastIdx;
            var nextIdx = (i+1) % lastIdx;
            p0 = input[currentIdx];
            p1 = input[nextIdx];
        }

        var p0x = p0[0],
            p0y = p0[1],
            p1x = p1[0],
            p1y = p1[1]

        var Q = [ 0.75 * p0x + 0.25 * p1x, 0.75 * p0y + 0.25 * p1y ]
        var R = [ 0.25 * p0x + 0.75 * p1x, 0.25 * p0y + 0.75 * p1y ]
        output.push(Q)
        output.push(R)
    }
    // Push last pair if input is not a closed ring
    if (inputLen > 1 && !isClosedRing) {
        output.push(copy([0, 0], input[ lastIdx ]))
    }
    // Close originally passed rings once done
    if (inputLen > 1 && isClosedRing) {
        output.push(copy([0, 0], output[ 0 ]))
    }

    return output
}