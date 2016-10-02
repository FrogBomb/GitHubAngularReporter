;(function(){
    
    function displayIssuesFunction(pageIssueContainer, dataTemplate){
        
        mod_key = 'full';
        
        function getCallback(JSONData, linkHeader){
            var dataArr = JSON.parse(JSONData);
            var navInfo = parseLinkCSV(linkHeader);
            pageIssueContainer.innerHTML = dataTemplate({issues: dataArr, pageNav: navInfo}); 
        }
        
        navButtonPress.callback = getCallback;
        navButtonPress.mod_key = mod_key;
        
        return function(){getSevenDayReportJSONFromGithub(getCallback, mod_key);}
    }
    
    
    
    var issueTemplate = Handlebars.compile(elemFromId("issue-template").innerHTML);
    var reportContainer = elemFromId("report-container");
    var reportButton = elemFromId("report-button");
    
    reportButton.onclick = displayIssuesFunction(reportContainer, issueTemplate);
})();