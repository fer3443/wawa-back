import { IAddress, IName } from "./Iuser";

export interface IRequestBody {
    username: string;
    email: string;
    passwordUnHash: string;
    names: IName;
    address?: IAddress;
    phoneNumber?: String;
}