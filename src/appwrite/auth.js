import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // Create a new account and automatically log in upon successful creation
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            // Log in immediately if account creation is successful
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount
            }
        } catch (error){
                throw error
            }

       
    }

    // Log in a user using email and password
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Error in login:", error);
            throw error;  // Rethrow to allow the caller to handle
        }
    }

    // Retrieve the currently authenticated user
    async getCurrentUser() {
        try {
            return await this.account.get();  // Return the current user data
        } catch (error) {
            console.error("Error in getCurrentUser:", error);
            return null;  // Return null in case of error to handle gracefully in caller
        }
    }

    // Log out the current user by deleting all sessions
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Error in logout:", error);
            throw error;  // Rethrow error to notify caller
        }
    }
}

// Instantiate and export AuthService for use in other modules
const authService = new AuthService();
export default authService;
