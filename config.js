import { func } from "prop-types";

const env = process.env;

export const nodeEnv = env.NODE_ENV || "dev";

export default {
    port: env.PORT || 8080
};

// export const logLines = function(input) {
//     console.log("start of func");
//     console.log(input + " hello!");
//     console.log("end of func");
// };
