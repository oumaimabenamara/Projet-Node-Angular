import { AbstractControl } from "@angular/forms";

export function pwConfirmationValidator (formGroup: AbstractControl) : {[key:string] : any} | null
{
    const pwVal = formGroup.get('password');
    const pwConfirmationVal = formGroup.get('passwordConfirmation');
    if(pwVal.pristine || pwConfirmationVal.pristine)
    {
        return null;
    }
    const match = pwVal.value !== pwConfirmationVal.value ?  {'pwConfirmation' : {value: pwVal.value}} : null;
    return match;
}