function elemFromId(id){
    return document.getElementById(id);
}

function parseLinkCSV(linkCsvString){

    return linkCsvString.split(",")
                        .map(function(x){
                            rawStringPairs = x.split(";");
                            return {link : rawStringPairs[0].replace(/<(.*)>/, '$1'),
                                    rel  : rawStringPairs[1].replace(/rel="(.*)"/, '$1')};
                        });

}

function navButtonPress(url){
    //These will be assigned through displayIssuesFunction in main.js
    var callback = navButtonPress.callback; 
    var mod_key = navButtonPress.mod_key;

    httpGetJson(url, callback, GITHUB_ACCEPT_CONTENT_MODS[mod_key]);
}