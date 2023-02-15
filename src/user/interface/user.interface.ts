import { Document } from 'mongoose'

/** create intrface and inharit document  mongooos packege */
export interface Iuser extends Document{
     username: string;
     email: string;
     password: string;
}