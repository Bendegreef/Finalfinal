/* jshint
devel: true,
browser: true,
jquery: true
*/

/* --------------Naam-Event + naam persoon-------------------------- */


$(document).ready(function () {

    var inlogCode = localStorage.getItem('loginCode');
    var naam = localStorage.getItem('naam');
    jQuery.ajax({
        type: 'GET',
        url: 'http://api.adaytoshare.be/1/platform/check_code',
        data: {
            code: inlogCode
        },
        dataType: 'json',
        success: function (responseData) {

            $('.naam_event').text(responseData.album_name);
            $('.naam').text(naam);

        },
        error: function (responseData) {
            alert("server niet beschikbaar");
        },

    });
});

/* --------------verzenden via url ------------------------- */
/*
$(document).ready(function () {
    document.getElementById("send_message").addEventListener("click", verzenden, false);

    function verzenden() {

        var message = $('.bericht').val();
        var code = localStorage.getItem('loginCode');
        var from = $('.naam').text();
        var email = localStorage.getItem('email');
        var public_private = $('.public_private').text();
        var pb = 1;
        if (public_private == "privé")
            pb = 0;

        var data = {
            code: code,
            from: from,
            message: message
        };
        var json1 = JSON.stringify(data);
        var url = "http://api.adaytoshare.be/1/guestbook/post?code=" + code + "&from=" + from + "&message=" + message + "&public=" + pb;
        if (email != '')
            url = "http://api.adaytoshare.be/1/guestbook/post?code=" + code + "&from=" + from + "&message=" + message + "&email=" + email + "&public=" + pb;


        $.ajax({
            url: url, // opsturen van data in het data veld lukt nog niet. Daarom moet het voorlopig via de url.
            type: 'POST',
            data: json1,
            // contentType: "application/json",
            dataType: 'json',
            success: function (responseData) {
                //On ajax success do this
                //for (var key in responseData) {
                //alert(key + ": " +responseData[key]);
                // }
                window.location = "timeline.html";
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("fout bij het versturen");
            }
        });
    }
});
*/

/* --------------verzenden via json parameters-------------------------- */

$(document).ready(function () {

    document.getElementById("send_message").addEventListener("click", verzenden, false);

    function verzenden() {


        var message = $('.bericht').val();
        var inlogCode = localStorage.getItem('loginCode');
        var from = $('.naam').text();
        var email = localStorage.getItem('email');
        var public_private = $('.public_private').text();
        var pb = 1;


        if (public_private == "privé")
            pb = 0;

        if ($("#defImg").attr("src") !== "") {
            verzendenMetFoto(inlogCode, from, message, pb, email);

        } else {
            verzendenZonderFoto(inlogCode, from, message, pb, email);
        }

    }
});


var verzendenZonderFoto = function (inlogCode, from, message, pb, email) {
    var postData = 'code=' + inlogCode + '&from=' + from + '&message=' + message + '&public=' + pb + '&email=' + email;
    var url = 'http://api.adaytoshare.be/1/guestbook/post';

    var sendData = {
        'url': url,
        'postData': postData
    };

    $.ajax({
        url: 'http://dtdl.ehb.be/~jan.klaas.vdm/crosscall.php',
        //url: 'http://api.adaytoshare.be/1/guestbook/post?code=' + inlogCode + '&from=' + from + '&message=' + message,
        type: 'POST',
        data: sendData,
        // async: false,
        dataType: 'json',
        cache: false,
        success: function (responseData) {
            window.location = "timeline.html";
        },
        error: function (err) {
            alert('error');
        }
    });
};

var verzendenMetFoto = function (inlogCode, from, message, pb, email) {
    $.ajax({
        url: "http://api.adaytoshare.be/1/guestbook/post_with_media_base64",
        data: {
            code: inlogCode,
            from: from,
            photo: foto,
            message: message,
            public: pb,
            email: email
        },
        async: false,
        datatype: 'json',
        type: 'post',
        // async: false,
        success: function (data) {

            window.location = "timeline.html";
        }

    });

};