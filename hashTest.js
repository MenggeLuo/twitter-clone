import bcrypt from 'bcryptjs';

async function hashPassword() {
    const password = '123456';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Manual hash of '123456':", hashedPassword);
}

hashPassword();