
import * as  bcrypt from 'bcrypt'


export class HashService{
    async hashPassword(password: string) {
        const saltRound = 10;
        return await bcrypt.hash(password, saltRound);
    }
    async comparePassword(password: string, hash) {
        return await bcrypt.compare(password,hash)
    }
}