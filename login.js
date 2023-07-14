import {API_URL} from "./config.js"

$(document).ready(function() {
    $('#form_login').submit(function(event) {
        event.preventDefault();

        var usuario = $('#usuario').val();
        if(usuario == undefined || usuario.length < 1) {
            $('.erro').html('Usuario inválido');
            return;
        }
        var senha = $('#senha').val();

        var settings = {
            "url": API_URL + "/sigin",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "email": usuario,
                "senha": senha
            }),
        };

        $.ajax(settings).done(function (response) {
            localStorage.setItem("tokenJwt", response.token);
            window.location.href = 'admin_panel.html';
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $('.erro').html(jqXHR.responseText);
        })
    });
});