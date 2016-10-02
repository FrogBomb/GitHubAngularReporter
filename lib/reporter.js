var BASE_API_URL = "https://api.github.com/repos/angular/angular/issues";
var GITHUB_ACCEPT_CONTENT_MODS = { //Currently expecting github v3 api formats
    'raw' : "vnd.github.v3.raw+",
    'html' : "vnd.github.v3.html+",
    'text' : "vnd.github.v3.text+",
    'full' : "vnd.github.v3.full+"
};
function httpGetJson(url, callback, acceptContentMod){
    /*
        Gets JSON information from the passed url.
        
        The callback's first arguement will be json text, while the
        second arguement will be the "Link" response header.

        acceptContentMod modifies the request header "Accept" option for content
        by inserting a desired string between "application/" and "json".
        This value is "" by default.
    */
    if(!acceptContentMod){acceptContentMod = "";} //for cross compatability
    
    var xmlHttp = new XMLHttpRequest();
    
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText, xmlHttp.getResponseHeader('Link'));
    }
    
    xmlHttp.open("GET", url, true); 
    xmlHttp.setRequestHeader("Accept", "application/" + acceptContentMod + "json");
    xmlHttp.send(null);
}
function calculatePrevDateAsISOString(numDaysAgo){
    /*
        Calculates the date n days ago, and returns it as an ISO formatted string 
        (YYYY-MM-DDTHH:MM:SSZ).
    */
    
    //Why write a function to calculate n-days in milliseconds when js has one!
    var millisecondOffset = Date.UTC(70, 0, 1+numDaysAgo);//ms since new year's, 1970.
    var prevDateWithSameTime = new Date(Date.now() - millisecondOffset);
    
    prevDateWithSameTime.setHours(0);
    prevDateWithSameTime.setMinutes(0);
    prevDateWithSameTime.setSeconds(0);
    
    //YYYY-MM-DDTHH:00:00Z , HH adjusted by timezone.
    return prevDateWithSameTime.toISOString().slice(0, 19) + "Z"; //Ignore ms. 
}
function getSevenDayReportJSONFromGithub(callback, modKey){
    /*
        Get the JSON string representation of all issues in angular on github from the past 7 days
        
        callback is called with the JSON string as the only arguement
        modKey denotes how the issues are formatted when they are returned by the github api.
        
        modKey can be one of the following values:
            'raw'
            'html' 
            'text'
            'full' (default)
    */
    if(!modKey){modKey = 'full';}
    
    var ISO_sevenDaysAgo = calculatePrevDateAsISOString(7);
    var getReqURL = BASE_API_URL + "?since=" + ISO_sevenDaysAgo;
    httpGetJson(getReqURL, callback, GITHUB_ACCEPT_CONTENT_MODS[modKey]);
}