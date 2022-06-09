import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function maxDateValidator(maxDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const date = new Date(control.value)
        if(isNaN(date.valueOf())) return null;
        return date > maxDate ? {maxDate: maxDate} : null;
    }
}