import { Document, Model } from 'mongoose';

export interface PermissionDocument extends Document {
    permissionName: string;
    description: string;
}

export interface PermissionModel extends Model<PermissionDocument> {
    checkPermissionById(permissionID: string): Promise<PermissionDocument>;
    getAllPermissions(skip: number, limit: number): Promise<PermissionDocument[]>;
}

export interface RoleDocument extends Document {
    roleName: string;
    description: string;
    permissions: string[];
}

export interface RoleModel extends Model<RoleDocument> {
    checkRoleById(roleID: string): Promise<RoleDocument>;
    getAllRoles(skip: number, limit: number): Promise<RoleDocument[]>;
    checkAllPermissionsValid(permissions: string[]): Promise<null>;
    checkIfPermissionsExists(role: RoleDocument, permissions: string[]): Promise<null>;
}

export interface UserDocument extends Document {
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
    serviceUserID: string;
    serviceName: string;
    aadharNumber: string;
    roles: string[];
}

export interface UserModel extends Model<UserDocument> {
    checkUserById(userID: string): Promise<UserDocument>;
    checkUserByParameter(query: { [index: string]: string }, errorMessage: string): Promise<null>;
    getAllUsers(skip: number, limit: number): Promise<UserDocument[]>;
    checkAllRolesValid(roles: string[]): Promise<null>;
    checkIfRoleExists(user: UserDocument, role: string): Promise<null>;
    findByCredentials(userName: string, password: string): Promise<UserDocument>;
    getUserRolesPermissions(userID: string): Promise<jwtPayloadInterface>;
}

export interface LoginSessionDocument extends Document {
    userID: string;
    userName: string;
    email: string;
    phoneNumber: string;
    token: string;
    tokenExpiry: number;
    loggedIn: boolean;
}

export interface LoginSessionModel extends Model<LoginSessionDocument> {
    checkUserNameAndDelete(userName: string): Promise<null>;
}

export interface jwtPayloadInterface {
    userID: string;
    roles: string[];
    permissions: string[];
}

export interface jwtVerifyInterface {
    status: number;
    message: string;
    payload: jwtPayloadInterface | null;
}
