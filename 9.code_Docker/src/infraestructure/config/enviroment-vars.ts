import * as joi from 'joi';
import "dotenv/config";

export type ReturnEnviromentVars = {
   PORT: number;
   mysqlHost: string;
   mysqlPort: number;
   mysqlUser: string;
   mysqlPassword: string;
   mysqlDatabase :string;
 }

 export type EviromentsVars = {
   PORT: number;
    MYSQL_HOST: string;
    MYSQL_PORT: number;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
    MYSQL_DATABASE :string;
 }
 
type ValidationEnviromentVars = {
   error: joi.ValidationError | undefined;
   value: EviromentsVars;
}

function validateEnVars(vars: NodeJS.ProcessEnv): ValidationEnviromentVars {
   const envSchem = joi.object({
      PORT: joi.number().required(),
      MYSQL_HOST: joi.string().required(),
      MYSQL_PORT: joi.number().default(3306),
      MYSQL_USER: joi.string().required(),
      MYSQL_PASSWORD: joi.string().required(),
      MYSQL_DATABASE: joi.string().required()
   }).unknown(true);
   const { error, value } = envSchem.validate(vars);
   return { error, value }

}

const loadEnvVars = (): ReturnEnviromentVars => {
   const result = validateEnVars(process.env);
   if (result.error) {
      throw new Error(`Error validating enviroment variables: ${result.error.message}`);
   }
   const value = result.value;
   return {
      PORT: value.PORT,
      mysqlHost: value.MYSQL_HOST,
      mysqlPort: value.MYSQL_PORT,
      mysqlUser: value.MYSQL_USER,
      mysqlPassword: value.MYSQL_PASSWORD,
      mysqlDatabase: value.MYSQL_DATABASE
   }
}
const envs = loadEnvVars();
export default envs;