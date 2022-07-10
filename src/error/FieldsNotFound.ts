import { BaseError } from "./BaseError";

export class FieldsNotFound extends BaseError{
    constructor(){
        super("Missing fields to complete",404)
    }
}