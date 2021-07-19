// function substr(s1, s2) {
//   let p1 = 0;
//   let p2 = 0;

//   while (p1 < s1.length) {
//     if (s1[p1] === s2[p2]) {
//       while (p1 < s1.length && p2 < s2.length && s1[p1] === s2[p2]) {
//         p1++;
//         p2++;
//       }

//       if (p2 === s2.length) {
//         return true;
//       } else {
//         p2 = 0;
//       }
//     } else {
//       p1++;
//     }
//   }

//   return false;
// }

// console.log(substr("John Doe", "ohnq"));
