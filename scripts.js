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
    console.log('this is the alias', alias);
    console.log(alias.age);

// const newAlias = () => {

// }

// newAlias.forEach()
    $(".firstname").text(alias.name);
    $(".surname").text(alias.surname);
    $(".gender").text(alias.gender);
    $(".photoID").attr("src", alias.photo);
    $(".age").text(alias.age);
    $(".birthday").text(alias.birthday.mdy);
    $(".region").text(alias.region);
// };

// spyApp.userInfo = function() {
    // const userRegion = $("#region").val();
    // console.log(userRegion);
    // const userGender = $("#gender").val();
    // console.log(userGender);
}

// spyApp.getAlias(userRegion);

//function that handles event listeners
spyApp.events = function() {
    $("form").on("submit", function(e){
        e.preventDefault();
        // const userRegion = $("#region").val();
        const userRegion = $('#region option:selected').val();
        const userGender = $('#gender option:selected').val();

        console.log(userRegion)
        console.log(userGender)
        spyApp.getAlias(userRegion, userGender);

    });
}

// $('form').on('submit', function(e){
//     e.preventDefault();
//     spyApp.init();
// });

spyApp.init = function() {
    // spyApp.getAlias();
    spyApp.getNews();
    // spyApp.userInfo();
    spyApp.events();
    
    
};

$(document).ready(function(){
    spyApp.init();
    
});

//be able to use info the user has provided to filter through the options given back by the API. use userRegion and userGender as parameters

// $("#region").on("change", function () {
//     console.log("new region selected");
// });