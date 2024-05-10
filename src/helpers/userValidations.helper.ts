import { IAddress, IName } from "../interfaces/Iuser";

export class userValidations {
  //valida que el correo cumpla con las normal de mail
	public static validateMail(email: string):boolean{
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isValid:boolean = emailRegex.test(email);
		return isValid
	}
	//validacion de contraseña
	public static validatePassword(password:string):boolean{
		const minLength = 8;
		const hasUpperCase = /[A-Z]/.test(password);
		const hasLowerCase = /[a-z]/.test(password);
		const hasNumber = /[0-9]/.test(password);
		const isValid:boolean = password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber;
		return isValid
	}
	//validacion para nombre
	public static validateName(name:IName):boolean{
		const isValid:boolean =  (
			typeof name.firstName === 'string' &&
			name.firstName.trim().length >= 3 &&
			typeof name.lastName === 'string' &&
			name.lastName.trim().length >= 2
		  );
		return isValid
	}
	//validacion de roles
	public static validateRole(role:string, validRole: string[]):boolean{
		const isValid = validRole.includes(role);
		return isValid
	}

	//validacion de username cumpla ciertos requisitos
	public static validateUsername(username:string, minLength = 3, maxLength = 15):boolean{
		const usernameRegex = /^[a-zA-Z0-9._-]{3,15}$/;
		const isValid = usernameRegex.test(username) && username.length > minLength && username.length <= maxLength;
		return isValid;
	};

	//validacion para address
	public static validateAddress(address:IAddress):boolean{
		const isValid = address.city.trim().length > 0 && address.country.trim().length > 0 && address.state.trim().length > 0 && address.street.trim().length > 0;
		return isValid;
	}
	
	//validacion de phoneNumber
	public static validatePhoneNumber(phoneNumber:string):boolean{
		const phoneRegex = /^\+?[1-9]\d{7,14}$/;
		const isValid = phoneRegex.test(phoneNumber);
    return isValid;
	}
}