import envs from "./enviroment-vars";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/UserEntity";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: envs.mysqlHost,
    port: Number(envs.mysqlPort),
    username: envs.mysqlUser,
    password: envs.mysqlPassword,
    database: envs.mysqlDatabase,
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