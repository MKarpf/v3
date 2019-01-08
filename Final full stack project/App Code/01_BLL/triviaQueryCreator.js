const dal = require('./../00_DAL/index');
const { Country } = { ...require('./tabels/country') };

class TriviaQueryCreator{

    static randomCountriesId(){
        let arr=new Array(4);
        for(let i=0; i<arr.length; i++)
            arr[i]=Math.floor(Math.random()*(Country.lastCountryId-1)+1);

        return arr;
    }

    static triviaQuery(subject) {
        let randomIdList=TriviaQueryCreator.randomCountriesId();


        let countryTableCol=["Alpha2Code","Alpha3Code","CallingCode","Capital", "Region" ,"Subregion" ,"CountryPopulation" ,"Area", "Flag" ,"Lat" , "Lng"];
        let CurrencyTableCol=["CurrencyName","Symbol"];
        let sqlQuery;
        if(countryTableCol.find(e=> e==subject)){
            sqlQuery=`select ${subject},CountryName from Countries where Id in (${randomIdList.join(",")})`;
        }
        else if(CurrencyTableCol.find(subject)){
            sqlQuery=`select ${subject}, Countries.CountryName from Countries join Currencies join CurrencyPerCountry 
            on CurrencyPerCountry.CurrencyId=Currencies.Id AND CurrencyPerCountry.CountryId=Countries.Id`;
        }
        else if(CurrencyTableCol.find(e=> e==subject)){
            sqlQuery=`select ${subject}, Countries.CountryName from Countries join Currencies join CurrencyPerCountry 
            on CurrencyPerCountry.CurrencyId=Currencies.Id AND CurrencyPerCountry.CountryId=Countries.Id`;
        }
        else if(subject=="LanguageName"){
            sqlQuery="";
            /*
            Languages:
            -----------------
            select from "LanguagePerCountry" the "LanguageId" and "CountryId"
                --> select with the value of "LanguageId" a row with the same "Id" in "Languages" table --> take from row the "LanguageName"
                --> select with the value of "CountryId" a row with the same "Id" in "Countries" table --> take from row the "CountryName"
            _*/
        }
        else if(subject=="Borders"){
            sqlQuery="";
            /*
            Borders:
            -----------------
            select from "Border" the "CountryId" and "BorderCountryId"
                --> select with the value of "BorderCountryId" a row with the same "Id" in "Countries" table --> take from row the "CountryName"
                --> select with the value of "CountryId" a row with the same "Id" in "Countries" table --> take from row the "CountryName"
            */
        }
        

        dal.runQuery(sqlQuery)
        .then((res)=>{
            let resArray=Object.values(JSON.parse(JSON.stringify(res.res)));
            let query={
                "query":`what is the ${subject} of ${resArray[0].CountryName}: `,
                "a":resArray[0][subject],
                "b":resArray[1][subject],
                "c":resArray[2][subject],
                "d":resArray[3][subject],
                "correct":"",
            };

            console.log(query,resArray);
        });

        
    }


 

}

module.exports={TriviaQueryCreator}