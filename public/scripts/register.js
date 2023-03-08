const btnRegister = document.querySelector("#btnRegister");
const password = document.querySelector("#password");
const password1 = document.querySelector("#password1");

btnRegister.addEventListener("click", () => {
  if (password.value !== password1.value) {
    password.value = "";
    password1.value = "";
    return (errorPassword.textContent = "Las contraseñas no coinciden, Reingrese");
  }
  errorPassword.textContent = "";

});
