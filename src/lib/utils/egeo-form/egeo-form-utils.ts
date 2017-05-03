export class EgeoFormUtils {

   // Get error message in function of error list.
   public getErrorMessage(formErrors: any, errorMessages: { [key: string]: any }): string {
      if (!errorMessages) {
         return undefined;
      }

      if (!formErrors) {
         return '';
      }

      if (errorMessages.hasOwnProperty('required')) {
         return formErrors.required || formErrors.generic || '';
      }
      if (errorMessages.hasOwnProperty('fieldType')) {
         return formErrors.type || formErrors.generic || '';
      }
      if (errorMessages.hasOwnProperty('minlength')) {
         return formErrors.minLength || formErrors.generic || '';
      }
      if (errorMessages.hasOwnProperty('maxlength')) {
         return formErrors.maxLength || formErrors.generic || '';
      }
      if (errorMessages.hasOwnProperty('pattern')) {
         return formErrors.pattern || formErrors.generic || '';
      }
      return '';
   }
}
