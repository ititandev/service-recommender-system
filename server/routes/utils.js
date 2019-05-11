function matchName(x, y){
    if (x == undefined) {
        return false;
    }

    if (y == undefined) {
        return true;
    }

    return x.toLowerCase().includes(y.toLowerCase())
}

module.exports = {matchName}