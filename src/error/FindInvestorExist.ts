import { BaseError } from "./BaseError";

export class FindInvestorExist extends BaseError{
    constructor(){
        super("investor doesn exist",404)
    }
}