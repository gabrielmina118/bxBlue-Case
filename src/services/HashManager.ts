import {config} from "dotenv"
import {genSaltSync,hashSync,compareSync} from "bcryptjs"

config()

class HashManager{
    async generateHash(pass: string): Promise<string>{
        //para esconder o texto precisamos:
        //do plaintext (que é nosso parametro s)
        //do nosso cost (que é o quanto vamos demorar pra esconder.
        //Quanto maior, mais escondido)
        //do salt (string aleatória que vai ser gerada aqui na função,
        //a partir do cost)

        const cost = Number(process.env.BCRYPT_COST!);
        const salt = genSaltSync(cost);
        const cypherText =  hashSync(pass, salt);

        return cypherText;
    }

    async compare(plaintext: string, hash: string): Promise<boolean>{
        const hashCompare:boolean = compareSync(plaintext, hash);
        return hashCompare;
    }
}

export default HashManager