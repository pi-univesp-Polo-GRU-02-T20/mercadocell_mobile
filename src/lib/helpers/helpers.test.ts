import { validateEmail } from "./validations";

describe('E-mail', () => {
    it('should return true if email is valid', () => {
      expect(validateEmail('email@email.com')).toBe(true);
    });

    it('should return false if email not contains @', () => {
      expect(validateEmail('emailemail.com')).toBe(false);
      expect(validateEmail('email')).toBe(false);
    });

    it('should return false if email domain is incomplete', () => {
      expect(validateEmail('emailemail.c')).toBe(false);
      expect(validateEmail('email@email')).toBe(false);
      expect(validateEmail('email@')).toBe(false);
    });

    it('should return false if email empty', () => {
      expect(validateEmail('')).toBe(false);
    });
});