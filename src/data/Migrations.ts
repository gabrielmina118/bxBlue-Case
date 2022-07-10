import { BaseDataBase } from "../data/BaseDataBase";

class Migrations extends BaseDataBase {

    private static investorTableName = "Investor";
    private static pokemonTableName = "Investor";
    private static purchasePokemon = "purchase_pokemon";
    private static salePokemon = "sale_pokemon"

    async createTables() {
        try {
            await this.getConnection().raw(`
            CREATE TABLE ${Migrations.investorTableName}(
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) not null,    
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );

            CREATE TABLE ${Migrations.pokemonTableName}(
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) not null,    
                image VARCHAR(255) NOT NULL,
                price decimal not null
               );
          
            CREATE TABLE ${Migrations.purchasePokemon}(
                id_investor varchar(255) not null,
                id_pokemon varchar(255) not null,
                total_purchase decimal not null,
                primary key (id_investor,id_pokemon),
                foreign key (id_investor) references Investor(id),
                foreign key (id_pokemon) references pokemon(id)
               );
               
            CREATE TABLE ${Migrations.salePokemon}(
                id_investor varchar(255) not null,
                id_pokemon varchar(255) not null,
                total_salve decimal not null,
                primary key (id_investor,id_pokemon),
                foreign key (id_investor) references Investor(id),
                foreign key (id_pokemon) references pokemon(id)
               );
        `)

            console.log(`As tabelas ${Migrations.investorTableName} e ${Migrations.pokemonTableName} foram criadas com sucesso`)

        } catch (error: any) {
            console.log(error.message)
        } finally {
            // termina a conexão com o banco de dados
            this.getConnection().destroy()
        }


    }
}

// Instanciar a classe migrations e chamar o metodo de criar as tabelas
new Migrations().createTables()

