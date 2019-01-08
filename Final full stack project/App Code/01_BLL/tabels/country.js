const dal = require('./../../00_DAL/index');

class Country {


    static get lastCountryId() {
        return Country._lastCountryId;
    }

    static createTable() {
        return dal.runQuery(`
            create table Countries(
                Id int AUTO_INCREMENT PRIMARY KEY,
                CountryName nvarchar(100) NOT NULL,
                Alpha2Code nvarchar(2) NOT NULL,
                Alpha3Code nvarchar(3) NOT NULL,
                CallingCode nvarchar(10) NOT NULL,
                Capital nvarchar(100) NOT NULL,
                Region nvarchar(100) NOT NULL,
                Subregion nvarchar(30) NOT NULL,
                CountryPopulation int NOT NULL,
                Lat decimal NULL,
                Lng decimal NULL,
                Area decimal NULL,
                Flag nvarchar(500) NOT NULL
            )`
        );
    }

    static dropTable() {
        return dal.runQuery('drop table if exists Countries');
    }

    static async insertTable() {
        let res = await dal.runQueryWithParam(`
                INSERT INTO Countries 
                (CountryName,Alpha2Code,Alpha3Code,CallingCode,Capital,Region,Subregion,CountryPopulation,Lat,Lng,Area,Flag) 
                VALUES ?`,
            Country.getValues());
        res = await dal.runQueryWithParam("SELECT Id FROM Countries ORDER BY Id DESC LIMIT 1");
        Country._lastCountryId = Object.values(JSON.parse(JSON.stringify(res)))[0][0].Id;
    }

    static getValues() {
        let countries = require('./countriesData.json');
        return countries.map((country) =>
            [
                country.name,
                country.alpha2Code,
                country.alpha3Code,
                country.callingCodes[0],
                country.capital,
                country.region,
                country.subregion,
                country.population,
                country.latlng[0],
                country.latlng[1],
                country.area,
                country.flag
            ]
        );
    }
}



module.exports = { Country }

