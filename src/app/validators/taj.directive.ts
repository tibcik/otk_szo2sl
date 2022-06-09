import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { GenderTypes } from "../models/test";

export function tajValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if(!control.value) return null;
        if(control.value.length != 9) return {length: control.value.length}
        const tajValue = control.value.valueOf();

        let sum = 0;
        let taj = (tajValue / 10) | 0

        for(let i = 7; i >= 0; i--) {
            let num = taj % 10
            taj = (taj / 10) | 0

            if(i % 2) sum += num * 7;
            else sum += num * 3;
        }
        let checksum = sum % 10

        if(checksum !== (tajValue % 10)) {
            return {checksum: checksum}
        }

        return null;
    }
}