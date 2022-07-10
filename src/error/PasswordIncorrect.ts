import { BaseError } from "./BaseError";

export class PasswordIncorrect extends BaseError{
    constructor(){
        super("invalid credencial",401)
    }
}