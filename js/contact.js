var myEmail = "";
var successFeedback = "ההודעה נשלחה בהצלחה";
var failFeedback = "היתה בעיה בשליחת ההודעה, אנא נסה מאוחר יותר";
var serverName = "";
//serverName = "http://localhost:50467/WebSite3/";
serverName = "http://webdevelopmentcourse.telem-hit.net/"

var ajaxLoaderImageURL = serverName + "images/ajaxloader.gif";



$(function () {
    myEmail = $("input#myEmail").val();
    var theEmailString = "";
    $("input[type='submit']").click(function () {
        theEmailString = getFormValue();
        send2Server(myEncode(theEmailString));
        return false;
    });

    // we set the ajaxLoaderImageFromTheStart
    addAjaxLoaderToFeedbackDiv();
});


function getFormValue() {
    var theString = "";
    $("body [rel]").each(function () {

        var theId = "";
        var theTitle = "";
        var theValue = "";

        if ($(this).attr("rel") != null) {
            theId = $(this).attr("rel");
            theTitle = $(this).text();
            // dealing with radiobutton
            if ($("#" + theId).find("input").is(":visible")) {
                $("#" + theId).find("input").each(function () {
                    if ($(this).is(':checked')) {
                        theValue += $("label[for='" + $(this).attr("id") + "']").text() + " + ";
                    }
                });
            } else {  // if not radiobutton
                theTitle = $(this).text();
                if ($("textarea#" + theId).is(":visible")) {
                    theValue = $("textarea#" + theId).text();
                    theValue = $.trim(theValue);
                    if (theValue == "") {
                        theValue = $("textarea#" + theId).val();
                    }
                } else if ($("select#" + theId).is(":visible")) {
                    var optionValue = $("#" + theId).val();
                    theValue = $("#" + theId).find("option[value='" + optionValue + "']").text();
                } else {
                    theValue = $("#" + theId).val();
                }
            }

        } else { // this is a checkbox
            theId = $(this).attr("id");
            theTitle = $("label[for='" + theId + "']").text();
            if ($(this).is(':checked')) {
                theValue = "כן";
            } else {
                theValue = "לא";
            }

        }

        theString += theTitle + "^";
        theString += theValue + "$";

    });
    return theString;
}


function send2Server(str) {
    showAjaxLoader();
    var theServer = serverName + "handler.ashx?callback=?";
    //theServer = "http://localhost:50467/WebSite3/handler.ashx?callback=?";
    var theVars = "&sendTo=" + myEncode(myEmail) + "&theMailBody=" + str;
    $.getJSON(theServer + theVars,
    function (json) {
        hideAjaxLoader();
        $("div#feedback").html("");
        addAjaxLoaderToFeedbackDiv();
        if (json.msg == true) {
            $("div#feedback").append(successFeedback);
            $("div#feedback").css("color", "green");
        } else {
            $("div#feedback").append(failFeedback);
            $("div#feedback").css("color", "red");
        }
    });
}



function myEncode(str) {
    return encodeURIComponent(str).replace(/\'/g, "%27");
}

function addAjaxLoaderToFeedbackDiv() {
    $("div#feedback").append("<div id='ajaxLoaderDiv' style='display:none;'><img src='" + ajaxLoaderImageURL + "' alt='ajaxLoader' /></div>");
}

function showAjaxLoader() {
    $("div#ajaxLoaderDiv").fadeIn();
}

function hideAjaxLoader() {
    $("div#ajaxLoaderDiv").fadeOut();
}
								
										