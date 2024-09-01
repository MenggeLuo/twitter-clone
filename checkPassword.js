import bcrypt from 'bcryptjs';

async function checkPassword() {
    const inputPassword = '123456';
    const storedHash = '$2a$10$rIZdyrEDFq0oQrBSoeLb4e5Putqj7SWc8XPKihQxv4ORyuyquNAl6';

    const isMatch = await bcrypt.compare(inputPassword, storedHash);
    console.log("Password comparison result:", isMatch);
}

checkPassword();