// cria uma nova array
export const shuffle = (array: any[]) => {
  const arrayOut = [...array];
  let count = arrayOut.length;
  let value: any;
  let index: number;
  while (count) {
    index = Math.floor(Math.random() * count--);
    value = arrayOut[count];
    arrayOut[count] = arrayOut[index];
    arrayOut[index] = value;
  }
  return arrayOut;
};

// mantem array
// const shuffleMe = (array: any[]) => {
//   let count = array.length;
//   let value: any;
//   let index: number;
//   while (count) {
//     index = Math.floor(Math.random() * count--);
//     value = array[count];
//     array[count] = array[index];
//     array[index] = value;
//   }
//   return array;
// };
