const getRandomNumber = (min,max) => Math.floor(Math.random()*(max - min + 1) + min);

const getRandomHexChar = () => getRandomNumber(0, 15).toString(16);

const getRandomHexString = (length) => 
  Array(length).fill(0).map(getRandomHexChar).join("")
  
const getUUID = () => [8,4,4,4,12].map(getRandomHexString).join("-")

const display = (data) => {
  console.log(data);
}

const main = () => {
  display(getUUID())
}

main()