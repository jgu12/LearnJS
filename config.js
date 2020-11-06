const env = process.env;

export const nodeEnv = env.NODE_ENV || 'dev';

export default {
  //mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
  mongodbUri: 'mongodb://localhost:27017/test',
  port: env.PORT || 8080,
  host: env.HOST || '0.0.0.0',
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  }
};

// export const logLines = function(input) {
//     console.log("start of func");
//     console.log(input + " hello!");
//     console.log("end of func");
// };
