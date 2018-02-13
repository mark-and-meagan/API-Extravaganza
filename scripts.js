//ALIAS GENERATOR

//user inputs region, sex, age, and randomly generates a name, surname, birthday ect.
//UI names API supplies a random identity with the given parameters.
//In tandem with the region chosen, News API supplies the dossier div with current headlines
//pertaining to chosen region
//a user is then asked to generate a mission that is randomly selected for them.
//The missions will be stored in arrays

const spyApp = {};

spyApp.aliasURL = 'https://uinames.com/api/?ext';
spyApp.newsURL = 'https://newsapi.org/v2/top-headlines?apiKey=78fde68366ee4527b3657ee5cf00545a';

spyApp.getAlias = function() {
    $.ajax({
        url: spyApp.aliasURL,
        method: 'GET',
        dataType: 'json',
    }).then((res) => {
        // console.log("request worked");
        console.log(res);
        spyApp.displayAlias(res);
        console.log(res.age, res.gender, res.birthday.mdy, res.photo, res.name, res.surname, res.region,);
    });
};

spyApp.getNews = function() {
    $.ajax({
        url: spyApp.newsURL,
        method: 'GET',
        dataType: 'json',
        data: {
            //add q: 'query' to take the userchoice from the region dropdown. Will give 
            //results appropriate to the area chosen
            language: 'en',
            pageSize: 3,
        }
    }).then((res) => {
        // console.log("request worked");
        // console.log(res);
    });
};

spyApp.displayAlias = function(alias) {
    $('.age').text(.age);


};

spyApp.init = function() {
    spyApp.getAlias();
    spyApp.getNews();
    spyApp.displayAlias();
};

$(document).ready(function(){
    spyApp.init();
});