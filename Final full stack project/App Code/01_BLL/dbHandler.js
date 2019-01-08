const dal = require('./../00_DAL/index');


const {TriviaQueryCreator} ={ ...require('./triviaQueryCreator') };
const { Country } = { ...require('./tabels/country') };
const { Border } = { ...require('./tabels/border') };
const { Currency } = { ...require('./tabels/currency') };
const { CurrencyPerCountry } = { ...require('./tabels/currencyPerCountry') };
const { Language } = { ...require('./tabels/language') };
const { LanguagePerCountry } = { ...require('./tabels/languagePerCountry') };


class DbHandler {

    static createDatabase() {
        return new Promise(
            (resolve, reject) => {
                dal.createDB()
                    .then(DbHandler.createAllTables)
                    .then(DbHandler.insertAllTables)
                    .then(resolve)
                    .catch(reject)
            });

    }

    static createAllTables() {
        return Promise.all([
            Currency.createTable(),
            Language.createTable(),
            Country.createTable(),
            LanguagePerCountry.createTable(),
            CurrencyPerCountry.createTable(),
            Border.createTable()
        ]);

    }

    static dropAllTables() {
        return dal.connect()
            .then(() => dal.runQuery('SET FOREIGN_KEY_CHECKS = 0'))
            .then(
                () =>
                    Promise.all([
                        Currency.dropTable(),
                        Language.dropTable(),
                        Country.dropTable(),
                        LanguagePerCountry.dropTable(),
                        CurrencyPerCountry.dropTable(),
                        Border.dropTable()
                    ])
            )
            .then(() => dal.runQuery('SET FOREIGN_KEY_CHECKS = 1'))
    }

    static insertAllTables() {
        return Country.insertTable()
            .then(Language.insertTable)
            .then(Currency.insertTable)
            .then(LanguagePerCountry.insertTable)
            .then(CurrencyPerCountry.insertTable)
            .then(Border.insertTable)
            .then(()=>TriviaQueryCreator.triviaQuery("Alpha2Code"))
    }
}


module.exports = { DbHandler };