const dal = require('./../../00_DAL/index');
class Currency {

    static createTable() {

        return dal.runQuery(`create table Currencies(
            Id int AUTO_INCREMENT PRIMARY KEY,
            CurrencyName nvarchar(30) NOT NULL,
            Symbol nvarchar(5) NOT NULL
            )`);
    }

    static dropTable() {
        return dal.runQuery('drop table if exists Currencies');
    }

    static insertTable() {
        return dal.runQueryWithParam("INSERT INTO Currencies (CurrencyName,Symbol) VALUES ?", Currency.getValues());
    }

    static getValues() {
        let countries = require('./countriesData.json');
        let currencies = [];
        countries.forEach(country => {
            country.currencies.forEach(currency => currencies.push(
                [
                    currency.name,
                    currency.symbol
                ]
            ));
        });
        return currencies.filter(e=>e[0] && e[1]);

    }
}


module.exports = { Currency }