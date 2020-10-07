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

export interface RoleModel extends Model<RoleDocument> {}

export interface UserDocument extends Document {
    employeeName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    password: string;
    serviceUserID: string;
    aadharNumber: string;
    roles: string[];
}

export interface UserModel extends Model<UserDocument> {
    findByCredentials(username: string, password: string): UserDocument;
}

export interface LoginSessionDocument extends Document {
    userID: string;
    userName: string;
    phoneNumber: string;
    token: string;
    tokenExpiry: number;
    loggedIn: boolean;
}

export interface LoginSessionModel extends Model<LoginSessionDocument> {}
