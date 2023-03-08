import bcrypt from "bcrypt";
const hasPassword = (pass) => {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10), null);
  };

export default hasPassword;
