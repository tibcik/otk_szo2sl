import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { GenderTypes } from "../models/test";

export function genderValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        //return {genderType: Object.values(GenderTypes).join(",")};
        return Object.values(GenderTypes).includes(control.value) ? null : {genderType: control.value};
    }
}