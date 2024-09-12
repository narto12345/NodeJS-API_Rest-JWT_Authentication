import { z } from "zod";

const schemes = [
  z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(3).max(30),
  }),
];

const analyzeSchema = (object, schemeIndex) =>
  new Promise((resolve, reject) => {
    try {
      const response = schemes[schemeIndex].safeParse(object);
      resolve(response);
    } catch (error) {
      reject(error.errors);
    }
  });

export { analyzeSchema };

// object example
// const user = {
//   username: "Nicolás",
//   password: "qwerty123",
//   injectSQL: "DROP TABLE users"
// };

// execution example
// analyzeSchema(scheme, user)
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
