/*jslint browser:true */
/*jslint devel: true */

(function () {
    'use strict';
    var i, m;
    if (!window.console) {
        window.console = {};
    }
    // union of Chrome, FF, IE, and Safari console methods
    m = [
        "log", "info", "warn", "error", "debug", "trace", "dir", "group",
        "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
        "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
    ];
    function f() {}
    // define undefined methods as noops to prevent errors
    for (i = 0; i < m.length; i = i + 1) {
        if (!window.console[m[i]]) {
            window.console[m[i]] = f;
        }
    }
    
    document.addEventListener("DOMContentLoaded", function (event) {
        var url = 'test.json';

        function sendRequest() {
            var xhr;
            console.log("prepare to send a request");
            
            if (window.XMLHttpRequest) { // Mozilla, Safari, ...
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) { // IE
                try {
                    xhr = new window.ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
                    } catch (ex) {}
                }
            }
            
            
            xhr.open('GET', url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log('request done :)');
                    console.info('response = ' + xhr.responseText);
                    var response = JSON.parse(xhr.responseText);
                    console.log('name = ' + response.name);
                    document.getElementById("result").innerHTML = xhr.responseText;
                } else if (xhr.readyState === xhr.DONE && xhr.status !== 200) {
                    console.error('Erreur : ' + 'Code = ' + xhr.status + ' texte = ' + xhr.statusText);
                }
            };
            xhr.send(null);
        }

        document.getElementById("requete").addEventListener("click", sendRequest);
    });

	
}());


