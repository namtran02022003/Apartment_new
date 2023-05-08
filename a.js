var string = 'abcddcfba'

var lenght = string.length
for (let i = 0; i < lenght / 2; i++) {
  if (string[i] != string[lenght - 1 - i]) {
    console.log(string[i])
  }
}
