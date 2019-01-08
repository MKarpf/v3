const dal = require('./../../00_DAL/index');


class Language {

    static createTable() {
        return dal.runQuery(`create table Languages(
            Id int AUTO_INCREMENT PRIMARY KEY,
            LanguageName nvarchar(30) NOT NULL
            )`
        );
    }

    static dropTable() {
        return dal.runQuery('drop table if exists Languages');
    }

    static insertTable() {
        return dal.runQueryWithParam("INSERT INTO Languages (LanguageName) VALUES ?", Language.getValues());
    }

    static getValues() {
        let countries = require('./countriesData.json');
        let languages=[];
        countries.forEach(country => {
           country.languages.forEach(lang=>languages.push([lang.name]));
        });
        return languages;
    }
}

module.exports = { Language };


