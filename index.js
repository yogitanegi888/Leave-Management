function vowelsAndConsonants(s) {
    let array = []
    for (let i = 0; i < s.length; i++) {

        if (s.charAt(i) == "a" || s.charAt(i) == "e" || s.charAt(i) == "i" || s.charAt(i) == "o" || s.charAt(i) == "u") {
            array.push(s.charAt(i))

        }
      

    }
    for (let k = 0; k < array.length; k++) {
        if (array[k] != s.charAt(i)) {
            array.push(s.charAt(i))

        }
     

    }
    console.log(array)
}

console.log(vowelsAndConsonants("javascript"))