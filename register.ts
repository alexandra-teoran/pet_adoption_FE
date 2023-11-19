
interface IFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  type FormField = keyof IFormData;
  
  class RegisterFormController {
    formData: IFormData;
    static fields: FormField[] = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword"
    ];
  
    constructor() {
      for (const field of RegisterFormController.fields) {
        this.bindElement(field);
      }
    }
  
    bindElement(field: FormField) {
      document.getElementById(field)!.addEventListener("input", (event: any) => {
        this.formData = { ...this.formData, [field]: event.target.value };
        this.onDataChanged(field);
      });
    }
  
    onDataChanged = (field: FormField) => {
      let emailRegex: RegExp = /[a-z]+.[a-z][0-9]@[a-z][-][a-z]*.[a-z]/;
      let passwordRegex: RegExp = /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-_]).{8,}$/;
      if (field === "firstName") {
        if (this.formData.firstName.length < 2) {
          this.setValidation("firstName", "Your name must have at least 2 characters.");
        } else {
          this.setValidation("firstName", "Looks good!");
        }
      }
  
      if (field === "lastName") {
        if (this.formData.lastName.length < 2) {
          this.setValidation("lastName", "Your name must have at least 2 characters.");
        } else {
          this.setValidation("lastName", "Looks good!");
        }
        if (this.formData.firstName.length + this.formData.lastName.length < 6) {
          this.setValidation("lastName", "Your last name and first name combined must have at least 6 characters.");
        } else {
          this.setValidation("lastName", "Looks good!");
        }
      }
  
      if (field === "email") {
        if (!emailRegex.test(this.formData.email)) {
          this.setValidation("email", "Your email must be valid.");
        } else {
          this.setValidation("email", "Looks good!");
        }
      }
  
      if (field === "password") {
        if (!passwordRegex.test(this.formData.password)) {
          this.setValidation("password", "Your password must have at least 8 characters, minimum 1 lowercase, 1 uppercase, 1 digit, and 1 special character.");
        } else {
          this.setValidation("password", "Looks good!");
        }
      }
  
      if (field === "confirmPassword") {
        if (!(this.formData.password === this.formData.confirmPassword)) {
          this.setValidation("confirmPassword", "Your passwords must match.");
        } else {
          this.setValidation("confirmPassword", "Looks good!");
        }
      }
  
    }
  
    setValidation = (field: FormField, message: string) => {
      document.getElementById(`${field}-validation`)!.innerHTML = message;
    }
  }
  
  // create an instance of the controller
  const registerController = new RegisterFormController();