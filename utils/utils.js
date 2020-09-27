/**
 * Fisher-Yates shuffle randomizes cards array
 * @author Mike Bostock - https://bost.ocks.org/mike/shuffle/
 */
const shuffle = function(array) {
    let length = array.length;
    let element;
    let index;
    while (length) {
        index = Math.floor(Math.random() * length--);
        element = array[length];
        array[length] = array[index];
        array[index] = element;
    }
    return array;
};


module.exports = {
    shuffle
}