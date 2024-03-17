import {db} from '@/lib/db';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import { v4 as uuidv4 } from 'uuid'; 
export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    //const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            }
        })  
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    });
    return verificationToken;
}