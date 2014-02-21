/*jslint browser:true */
/*jslint devel: true */
/*global XDomainRequest: false*/

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
    
    function ieSendRequestCrossDomain(url, idDomResult) {
        var xdr = new XDomainRequest();
        xdr.open('get', url);
        xdr.onload = function () {
            console.log('XDR onlaod');
            console.log('request done :)');
            console.info('response = ' + xdr.responseText);
            var response = JSON.parse(xdr.responseText);
            console.log('name = ' + response.name);
            document.getElementById(idDomResult).innerHTML = xdr.responseText;
        };
        xdr.onerror = function () {
            console.log('error');
        };
        xdr.progress = function () {
            console.log('progress');
        };
        xdr.ontimeout = function () {
            console.log('timeout');
        };
        xdr.send();
    }
    
    function sendRequest(url, idDomResult) {
        var xhr;
        console.log("prepare to send a request");

        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE < 10
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
                document.getElementById(idDomResult).innerHTML = xhr.responseText;
            } else if (xhr.readyState === xhr.DONE && xhr.status !== 200) {
                console.error('Erreur : ' + 'Code = ' + xhr.status + ' texte = ' + xhr.statusText);
            }
        };
        xhr.send(null);
    }
    
    function initApp() {
        var local_url = 'test.json',
            webPuzzleUrl = 'http://webpuzzlews.herokuapp.com/web_components/AngularJsWc.json',
            github_url = 'https://api.github.com/users/siliconsalad',
            idDomResultSameDomain = 'result_same_domain',
            idDomResultGithub = 'result_github',
            domElementSameDomain = document.getElementById('requete_same_domain'),
            domElementGitHub = document.getElementById('requete_github');
        
        if (!domElementSameDomain.addEventListener) {
            domElementSameDomain.attachEvent('onclick', function () {
                sendRequest(local_url, idDomResultSameDomain);
            });
        } else {
            domElementSameDomain.addEventListener("click", function () {
                sendRequest(local_url, idDomResultSameDomain);
            });
        }
        
        if (!domElementGitHub.addEventListener) {
            domElementGitHub.attachEvent('onclick', function () {
                ieSendRequestCrossDomain(webPuzzleUrl, idDomResultGithub);
            });
        } else {
            domElementGitHub.addEventListener('click', function () {
                if (window.hasOwnProperty('XDomainRequest') && window.XDomainRequest !== null) {
                    ieSendRequestCrossDomain(webPuzzleUrl, idDomResultGithub);
                } else {
                    sendRequest(github_url, idDomResultGithub);
                }
            });
        }
    }
    
    document.onreadystatechange = function () {
        if (document.readyState === "complete") {
            console.log("state = " + document.readyState);
            initApp();
        }
    };
    
//    document.addEventListener("DOMContentLoaded", function (event) {
        
}());


