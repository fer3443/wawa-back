export class productsValidations {
  public static validateName(name: string, minLength = 3):boolean {
		return typeof name === 'string' && name.trim().length >= minLength
	};
	public static validateDescription(description: string, minLength = 3):boolean {
		return typeof description === 'string' && description.trim().length >= minLength
	};
	public static validatePrice(price: Number):boolean {
		return typeof price === 'number'
	};
	public static validateCategory(category: string, minLength = 3):boolean {
		return typeof category === 'string' && category.trim().length >= minLength
	};
	public static validateStock(stock: number):boolean {
		return typeof stock === 'number' && stock > 0
	}
	public static validatePhoto(photoUrl: string):boolean {
		return typeof photoUrl === 'string' && photoUrl.trim().length > 0
	}
}
