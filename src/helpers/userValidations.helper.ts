import { IAddress } from "../interfaces/Iuser";

export class userValidations {
  //valida que el correo cumpla con las normal de mail
	public static validateMail(email: string):boolean{
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
	//validacion de contraseña
	public static validatePassword(password:string):boolean{
		const minLength = 8;
		const hasUpperCase = /[A-Z]/.test(password);
		const hasLowerCase = /[a-z]/.test(password);
		const hasNumber = /[0-9]/.test(password);
		return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber;
	}

	//validacion de roles
	public static validateRole(role:string, validRole: string[]):boolean{
		return validRole.includes(role);
	}

	//validacion de username cumpla ciertos requisitos
	public static validateUsername(username:string, minLength = 3, maxLength = 15):boolean{
		const usernameRegex = /^[a-zA-Z0-9._-]{3,15}$/;
		return usernameRegex.test(username) && username.length > minLength && username.length <= maxLength;
	};

	//validacion para address
	public static validateAddress(address:IAddress):boolean{
		const hasAddress = address !== (undefined  && null);
		const hasData = address.city.trim().length > 0 && address.country.trim().length > 0 && address.state.trim().length > 0 && address.street.trim().length > 0;
		return hasAddress && hasData;
	}
	
	//validacion de phoneNumber
	public static validatePhoneNumber(phoneNumber:string):boolean{
		const phoneRegex = /^\+?[1-9]\d{1,14}$/; 
    return phoneRegex.test(phoneNumber);
	}
}