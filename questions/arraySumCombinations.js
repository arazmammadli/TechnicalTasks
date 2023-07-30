function combinations(array, n) {
    let arrayCopy = []
    let results = [];

    // duplicate array
    for (let i in array)
        arrayCopy[i] = array[i];

    for (let i in array){
        for (var j in arrayCopy){
            if ((array[i] + arrayCopy[j]) == n) results.push([array[i], arrayCopy[j]]);
        }
    }

    return results;
}

console.log(combinations([1,2,3], 4));