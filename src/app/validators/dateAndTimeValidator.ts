import { AbstractControl } from "@angular/forms";
import { DATE } from "ngx-bootstrap/chronos/units/constants";

export function startDateValidator (formGroup: AbstractControl) : {[key:string] : any} | null
{
    const startDate = formGroup.get('startDate');
    const minStartDate = new Date();

    const startDateValidity = (startDate.value.getTime()) < (minStartDate.getTime()) ? {'startDate' : {value: startDate.value}} : null;

    return startDateValidity;
}

export function endDateValidator (formGroup: AbstractControl) : {[key:string] : any} | null
{
    const endDate = formGroup.get('endDate');
    const minEndDate = formGroup.get('startDate');

    const endDateValidity = (endDate.value.getTime()) < (minEndDate.value.getTime()) ? {'endDate' : {value: endDate.value}} : null;

    return endDateValidity;
}