import { UserTypes } from "../types/enum";

export type UserModel = {
    id: string;
    name: string;
    email: string;

    type: UserTypes;
    typeId: number;

  };