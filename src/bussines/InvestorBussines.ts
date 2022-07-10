import { InvestorDataBase } from "../data/InvestorDataBase";
import { FieldsNotFound } from "../error/FieldsNotFound";
import { FindInvestorExist } from "../error/FindInvestorExist";
import { PasswordIncorrect } from "../error/PasswordIncorrect";
import { Investor, InvestorDTO, InvestorLoginDTO } from "../model/Investor";
import Authenticator from "../services/Authenticator";
import HashManager from "../services/HashManager";
import IdGenerator from "../services/IdGenerator";

class InvestorBussines {

    constructor(
        private idGenerator: IdGenerator,
        private hashmanager: HashManager,
        private authenticator: Authenticator
    ) { }

    async createInvestor(input: InvestorDTO) {

        if (!input.name || !input.password || !input.password) {
            throw new FieldsNotFound()
        }

        const password = await this.hashmanager.generateHash(input.password)
        const id = this.idGenerator.generatedId()

        const investor = new Investor(id, input.name, password, input.email)
        await new InvestorDataBase().createInvestor(investor)

        const createToken = this.authenticator.generateToken({ id })

        return createToken
    }

    async loginInvestor(input: InvestorLoginDTO) {

        if (!input.password || !input.password) {
            throw new FieldsNotFound()
        }

        const investorExist = await new InvestorDataBase().getInvestor(input.email)

        if (!investorExist) {
            throw new FindInvestorExist()
        }

        const passwordIsCorrect = await this.hashmanager.compare(input.password,investorExist.getPassword())
        
        if (!passwordIsCorrect) {
            throw new PasswordIncorrect()
        }

        // gera o token para o usuario
        const token = this.authenticator.generateToken({ id: investorExist.getId() })

        return token

    }
}

export default InvestorBussines