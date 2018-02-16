//ALIAS GENERATOR

//user inputs region, sex, age, and randomly generates a name, surname, birthday ect.
//UI names API supplies a random identity with the given parameters.
//In tandem with the region chosen, News API supplies the dossier div with current headlines
//pertaining to chosen region
//a user is then asked to generate a mission that is randomly selected for them.
//The missions will be stored in arrays

//object for our app
const spyApp = {}

const langCode = [
    {
        lang: "english",
        country: [
            "Canada",
            "England",
            "Australia"
        ],
        code: "en"
    },
    {
        lang: "french",
        country: [
            "France",
            "Belgium"
        ],
        code: "fr"
    },
    {
        lang: "arabic",
        country: "Egypt",
        code: "ar"
    },
    {
        lang: "german",
        country: "Germany",
        code: "de"
    },
    {
        lang: "hindi",
        country: "India",
        code: "hi"
    },
    {
        lang: "korean",
        country: "Korea",
        code: "ko"
    },
    {
        lang: "russian",
        country: "Russia",
        code: "ru"
    }
]

const missions = [
    {
        mission: "collect intell on your mark"
    },
    {
        mission: "rendevouz with your insider person in predetermined drop point"
    },
    {
        mission: "conduct reconnaissance with a fellow agent"
    },
    {
        mission: "use your alias to infiltrate a black market infiltrating as a night club"
    },
    {
        mission: "collect intel on one of the stories from your dossier"
    }
]

//storing the API urls
spyApp.aliasURL = 'https://uinames.com/api/?ext';
spyApp.newsURL = 'https://newsapi.org/v2/top-headlines?apiKey=78fde68366ee4527b3657ee5cf00545a';
spyApp.langURL = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180214T213558Z.002f2216a1277a3c.b2d49048607a0c301a3ea3f8afa73907988dcc31&text=hello goodbye thank you'

//retrieves data from Name API and passing in what user
//has chosen as the value for the key value pairs.
spyApp.getAlias = function(userRegion, userGender) {
    $.ajax({
        url: spyApp.aliasURL,
        method: 'GET',
        dataType: 'json',
        data: {
            region: userRegion,
            // gender: userGender,
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
    });
};

//need to make a variable that holds the 2 letter region code of userRegion to pass it through getLang lang parameter
spyApp.getLang = function(lang) {
    $.ajax({
        url: spyApp.langURL,
        method: 'POST',
        dataType: 'jsonp',
        data: {
            lang: lang
        }
    }).then((res) => { 
        //this gets the results form the API
        console.log(res);
        //this is calling displayLang 
        //and passing the results as an argument. So the data can be
        //accessed by the function further down
        spyApp.displayLang(res); 
    });
};

spyApp.displayLang = function (lang) {
    $(".newLang").text(lang.text);
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
    
    $(".photoID").append(`<img src="assets/profile.png" alt"">`);
    $(".firstname").text(alias.name);
    $(".surname").text(alias.surname);
    // $(".gender").text(alias.gender);
    $(".age").text(alias.age);
    $(".birthday").text(alias.birthday.mdy);
    $(".region").text(alias.region);
}

spyApp.displayMissions = function() {
    $(".missions").text()
}

//function that handles event listeners
spyApp.events = function() {

    $('#enter').on('click', function(){
        //this shows the alias section when
        //user clicks the enter button
        $('.alias').removeClass('hidden');
        $('.missions').removeClass('hidden');
        $('.codeWord').addClass('hidden');
    });

    $("form").on("submit", function(e){
        e.preventDefault();
        //this takes in value for user selected userRegion
        //and userGender
        const userRegion = $('#region option:selected').val();
        // const userGender = $('#gender option:selected').val();
        //getALias is called after user input
        spyApp.getAlias(userRegion);
        spyApp.getNews(userRegion);

        let lang;
        //loop over the language array
        langCode.forEach((item) => {

            if(userRegion === 'Belgium') {
                lang = 'fr'
            }
            if(userRegion === 'France'){
                lang = 'fr'
            }
            if (userRegion === 'Canada') {
                lang = 'en'
            }
            if (userRegion === 'England') {
                lang = 'en'
            }
            if (userRegion === 'Australia') {
                lang = 'en'
            }
            if (userRegion === 'Egypt') {
                lang = 'ar'
            }
            if (userRegion === 'Germany') {
                lang = 'de'
            }
            if (userRegion === 'India') {
                lang = 'hi'
            }
            if (userRegion === 'Korea') {
                lang = 'ko'
            }
            if (userRegion === 'Russia') {
                lang = 'ru'
            }
            // console.log(lang);
            // spyApp.displayLang(lang);

        });

        spyApp.getLang(lang);
        spyApp.displayLang(lang);

        // console.log(lang);

        // console.log(newStuff);
        //check to see if the userRegion matches any item in the array

        //and if it does, then feed it into getLang function / request




    });
    //function to randomize mission results from missions array
    //when user clicks on submit button
    // function randomMission(missions) {
    //     const index = Math.floor(Math.random() * spyApp.missions.length);
    //     //new result variable created from randomized function
    //     const newMission = missions[index];
    //     console.log(newMission);
    // }   
    $('.getMission').on('click', function(e) {
        e.preventDefault();
        const randomMission = missions[Math.floor(Math.random()* missions.length)]
        console.log(randomMission);
        $('.missions').append(`<h2>${randomMission.mission}</h2>`);
        // $('randomMission').empty().append(`<h2>${randomMission.mission}</h2>`);
    });

}

//initializes the getNews and events functions
//getAlias and displayALias are inside spyApp.events and
//don't need to be called twice in here
spyApp.init = function() {
    spyApp.events();
};

//calling spyApp.init on page load
$(document).ready(function(){
    spyApp.init();
    
});



