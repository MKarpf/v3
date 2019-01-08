const dal = require('./../../00_DAL/index');

class CurrencyPerCountry {

    static createTable() {
        return dal.runQuery(`create table CurrencyPerCountry(
            Id int AUTO_INCREMENT PRIMARY KEY,
            CountryId int NOT NULL,
            CurrencyId int NOT NULL,
            FOREIGN KEY (CountryId) REFERENCES Countries(Id),
            FOREIGN KEY(CurrencyId) REFERENCES Currencies(Id)
            )`
        );
    }

    static dropTable() {
        return dal.runQuery('drop table if exists CurrencyPerCountry');
    }


    static async insertTable() {
        return dal.runQueryWithParam("INSERT INTO CurrencyPerCountry (CountryId,CurrencyId) VALUES ?", await CurrencyPerCountry.getValues());
    }


    static async getValues() {
        let countries = require('./countriesData.json');
        let arr = [];

        for (let country of countries) {
            let countryId = await dal.runQueryWithParam("select Id from Countries where CountryName like  ?", country.name)

            for (let currency of country.currencies) {
                if (currency.name && currency.symbol) {
                    let currencyId = await dal.runQueryWithParam("select Id from Currencies where CurrencyName like ?", currency.name);

                    arr.push([
                        Object.values(JSON.parse(JSON.stringify(countryId.res)))[0].Id,
                        Object.values(JSON.parse(JSON.stringify(currencyId.res)))[0].Id
                    ]);

                }
            }
        }
        return arr;
    }

}

module.exports = { CurrencyPerCountry }
