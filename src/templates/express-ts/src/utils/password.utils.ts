import bcrypt from "bcryptjs"

const SALT_ROUNDS = 10;

export const hostPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

export const comparePassword = async (
    password: string,
    hashPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword)
} 