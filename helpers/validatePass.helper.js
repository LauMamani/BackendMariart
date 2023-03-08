import bcrypt from "bcrypt";
const validatePass = (pass, hashedPass) => {
   return bcrypt.compareSync(pass, hashedPass);
};

export default validatePass;
