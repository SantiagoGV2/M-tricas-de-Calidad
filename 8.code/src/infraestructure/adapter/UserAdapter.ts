import { Repository } from "typeorm";
import { User } from '../../domain/User';
import { UserPort } from "../../domain/UserPort";
import { UserEntity } from '../entities/UserEntity';
import { AppDataSource } from "../config/con_data_base";

export class UserAdapter implements UserPort{

    private userRepository: Repository<UserEntity>;//cruds

    constructor(){
        this.userRepository = AppDataSource.getRepository(UserEntity);
    }

    private toDomain(user: UserEntity): User{
        return{
            id: user.id_user,
            name: user.name_user,
            email: user.email_user,
            password: user.password_user,
            status: user.status_user
        }
    }

    private toEntity (user: Omit<User, "id">): UserEntity {
        const userEntity = new UserEntity();
        userEntity.name_user = user.name,
        userEntity.email_user = user.email,
        userEntity.password_user = user.password,
        userEntity.status_user = user.status
        return userEntity;
    }

    async createUser(user: Omit<User, "id">): Promise<number> {
        try {
            const newUSer = this.toEntity(user);
            const savedUser = await this.userRepository.save(newUSer);
            return savedUser.id_user;
        } catch (error) {
            console.error("Error creating user", error);
            throw new Error("Error creating user");
        }
    }


    async updateUser(id: number, user: Partial<User>): Promise<boolean> { //opcionalese (partial)
       try {
        const existingUser = await this.userRepository.findOne({where:{id_user:id}});
            if(!existingUser){//si no econtro nada
                throw new Error("User not found")//lanzamos la exepcion
            }
            //actualizamos las propiedades enviadas
            Object.assign(existingUser,{//asignar datos
                name_user: user.name ?? existingUser.name_user, 
                email_user: user.email ?? existingUser.email_user,
                password_user: user.password ?? existingUser.password_user,
                status_user:1
            });//guardo los datos

            await this.userRepository.save(existingUser);
            return true;
       } catch (error) {
            console.error("Error updating user", error);
            throw new Error("Error updating user"); 
       }
    }

    async deleteUser(id: number): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOne({where:{id_user:id}});
            if(!existingUser){//si no econtro nada
                throw new Error("User not found")//lanzamos la exepcion
            }
            Object.assign(existingUser,{
                status_user:0
            });
            await this.userRepository.save(existingUser);
            return true;
        } catch (error) {
            console.error("Error deleting user", error);
            throw new Error("Error deleting user"); 
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            const users = await this.userRepository.find();
            return users.map(this.toDomain)
        } catch (error) {
           console.error("Error fetching all users", error);
            throw new Error("Error fetching all users");
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            const userId = await this.userRepository.findOne({where:{id_user:id}});
            return userId ? this.toDomain(userId): null;
        } catch (error) {
           console.error("Error fetching user by id", error);
            throw new Error("Error fetching user by id"); 
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const userEmail = await this.userRepository.findOne({where:{email_user:email}});
            return userEmail ? this.toDomain(userEmail): null;
        } catch (error) {
           console.error("Error fetching user by email", error);
            throw new Error("Error fetching user by email"); 
        }
    }

}