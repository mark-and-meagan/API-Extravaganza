//ALIAS GENERATOR

//user inputs region, sex, age, and randomly generates a name, surname, birthday ect.
//UI names API supplies a random identity with the given parameters.
//In tandem with the region chosen, News API supplies the dossier div with current headlines
//pertaining to chosen region
//a user is then asked to generate a mission that is randomly selected for them.
//The missions will be stored in arrays

//object for our app
const spyApp = {};

//storing the API urls
spyApp.aliasURL = 'https://uinames.com/api/?ext';
spyApp.newsURL = 'https://newsapi.org/v2/top-headlines?apiKey=78fde68366ee4527b3657ee5cf00545a';
spyApp.langURL = 'https://translate.yandex.net/api/v1.5/tr.json/translate? key=trnsl.1.1.20180214T213558Z.002f2216a1277a3c.b2d49048607a0c301a3ea3f8afa73907988dcc31'

//retrieves data from Name API and passing in what user
//has chosen as the value for the key value pairs.
spyApp.getAlias = function(userRegion, userGender) {
    $.ajax({
        url: spyApp.aliasURL,
        method: 'GET',
        dataType: 'json',
        data: {
            region: userRegion,
            gender: userGender,
        }
    //the results we are getting from API
    //and calling displayAlias and passing it down
    }).then((res) => {
        //this function only allows to displayAlias when getAlias is fully retrieved
        spyApp.displayAlias(res);
    });
};



spyApp.getNews = function(userRegion) {
    $.ajax({
        url: spyApp.newsURL,
        method: 'GET',
        dataType: 'json',
        data: {
            //add q: 'query' to take the userchoice from the region dropdown. Will give 
            //results appropriate to the area chosen
            q: userRegion,
            language: 'en',
            pageSize: 5,
        }
    }).then((res) => {
        spyApp.displayDossier(res);
        console.log(res);
    });
};

spyApp.getLang = function(userRegion) {
    $.ajax({
        url: ,
        method: 'GET',
        dataType: 'json'
    });
}

spyApp.displayDossier = function(headlines){
    $(".headline1").text(headlines.articles[0].title);
    $(".link1").attr('href', headlines.articles[0].url);
    $(".headline2").text(headlines.articles[1].title);
    $(".link2").attr('href', headlines.articles[1].url);
    $(".headline3").text(headlines.articles[2].title);
    $(".link3").attr('href', headlines.articles[2].url);
    $(".headline4").text(headlines.articles[3].title);
    $(".link4").attr('href', headlines.articles[3].url);
    $(".headline5").text(headlines.articles[4].title);
    $(".link5").attr('href', headlines.articles[4].url); 
};

//function that displays all necessary info to the DOM
spyApp.displayAlias = function(alias) {
  
    $(".firstname").text(alias.name);
    $(".surname").text(alias.surname);
    $(".gender").text(alias.gender);
    $(".age").text(alias.age);
    $(".birthday").text(alias.birthday.mdy);
    $(".region").text(alias.region);
}

//function that handles event listeners
spyApp.events = function() {
    $("form").on("submit", function(e){
        e.preventDefault();
        //this takes in value for user selected userRegion
        //and userGender
        const userRegion = $('#region option:selected').val();
        const userGender = $('#gender option:selected').val();
        //getALias is called after user input
        spyApp.getAlias(userRegion, userGender);
        spyApp.getNews(userRegion);

    });
}

//initializes the getNews and events functions
//getAlias and displayALias are inside spyApp.events and
//don't need to be called twice in here
spyApp.init = function() {
    // spyApp.getNews();
    spyApp.events();

};

//calling spyApp.init on page load
$(document).ready(function(){
    spyApp.init();
    
});
