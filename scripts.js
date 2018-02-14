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
spyApp.langURL = 'https://translate.yandex.net/api/v1.5/tr.json/translate? key=trnsl.1.1.20180214T213558Z.002f2216a1277a3c.b2d49048607a0c301a3ea3f8afa73907988dcc31'

spyApp.getAlias = function(userRegion, userGender) {
    $.ajax({
        url: spyApp.aliasURL,
        method: 'GET',
        dataType: 'json',
        data: {
            region: userRegion,
            gender: userGender,
        }
    }).then((res) => {
        spyApp.displayAlias(res);
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
  
    $(".firstname").text(alias.name);
    $(".surname").text(alias.surname);
    $(".gender").text(alias.gender);
    $(".photoID").attr("src", alias.photo);
    $(".age").text(alias.age);
    $(".birthday").text(alias.birthday.mdy);
    $(".region").text(alias.region);
}

// spyApp.getAlias(userRegion);

//function that handles event listeners
spyApp.events = function() {
    $("form").on("submit", function(e){
        e.preventDefault();
        // const userRegion = $("#region").val();
        const userRegion = $('#region option:selected').val();
        const userGender = $('#gender option:selected').val();

        spyApp.getAlias(userRegion, userGender);

    });
}

spyApp.init = function() {
    spyApp.getNews();
    spyApp.events();
    
    
};

$(document).ready(function(){
    spyApp.init();
    
});
