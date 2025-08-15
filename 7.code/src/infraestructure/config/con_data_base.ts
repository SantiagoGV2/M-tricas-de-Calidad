import envs from "../config/enviroment-vars";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/UserEntity";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: envs.DB_HOST,
    port: Number(envs.DB_PORT),
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    synchronize: true,
    logging: true,
    entities:[UserEntity]
});

//Connect to Data Base

export const connectDB = async()=>{
    try {
        await AppDataSource.initialize();
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting to the DB:", error);
        process.exit(1);
    }
}