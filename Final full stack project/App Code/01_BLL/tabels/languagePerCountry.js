const dal = require('./../../00_DAL/index');

class LanguagePerCountry {

    static createTable() {
        return dal.runQuery(`create table LanguagePerCountry(
            Id int AUTO_INCREMENT PRIMARY KEY,
            LanguageId int NOT NULL,
            CountryId int NOT NULL,
            FOREIGN KEY (LanguageId) REFERENCES Languages(Id),
            FOREIGN KEY (CountryId) REFERENCES Countries(Id)
            )`
        );
        
    }

    static dropTable() {
        return dal.runQuery('drop table if exists LanguagePerCountry');
    }

    static async insertTable() {
        return dal.runQueryWithParam("INSERT INTO LanguagePerCountry (LanguageId,CountryId) VALUES ?", await LanguagePerCountry.getValues());
    }


    static async getValues() {
        let countries = require('./countriesData.json');
        let arr=[];

        for(let country of countries)
        {
            let countryId= await dal.runQueryWithParam("select Id from Countries where CountryName like  ?", country.name)

            for(let language of country.languages){
                let languageId= await dal.runQueryWithParam("select Id from Languages where LanguageName =  ?", language.name);

                arr.push([
                    Object.values(JSON.parse(JSON.stringify(languageId.res)))[0].Id,
                    Object.values(JSON.parse(JSON.stringify(countryId.res)))[0].Id
                 ]);
            }
        }
        
        return arr;
        
    }

    
}


module.exports = { LanguagePerCountry }