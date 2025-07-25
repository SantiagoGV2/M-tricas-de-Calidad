 import * as joi from 'joi';
 import "dotenv/config";

 export type ReturnEnviromentVars = {
    PORT: number;
 }
 type ValidationEnviromentVars = {
    error: joi.ValidationError | undefined;
    value: ReturnEnviromentVars;
 }

 function validateEnVars(vars: NodeJS.ProcessEnv): ValidationEnviromentVars{   
    const envSchem = joi.object({
        PORT: joi.number().required()
    }).unknown(true);
    const {error, value} = envSchem.validate(vars);
    return {error, value}

 }

 const loadEnvVars = () : ReturnEnviromentVars =>{
    const result = validateEnVars(process.env);
    if(result.error){
        throw new Error(`Error validating enviroment variables: ${result.error.message}`);
    }
    const value = result.value;
    return{
        PORT: value.PORT
    }
 }
 const envs = loadEnvVars();
 export default envs;