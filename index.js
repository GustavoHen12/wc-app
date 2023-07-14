import {API_URL} from "./config.js"

$(document).ready(function() {
    $('#form_visitantes').submit(function(event) {
        event.preventDefault();

        console.log(API_URL);
        var nome = $('#nome').val();
        if(nome == undefined || nome.length < 1) {
            $('.erro').html('Nome inválido');
            return;
        }

        var telefone = $('#telefone').val();
        if(telefone.length < 14) {
            $('.erro').html('Telefone inválido');
            return;
        }

        var settings = {
            "url": API_URL + "/visitantes",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "nome": nome,
                "telefone": telefone.replace(/\D/g, '')
            }),
        };

        $.ajax(settings).done(function (response) {
            modal.style.display = "none";
            alert('Obrigado, em breve entraremos em contato com você !');
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $('.erro').html(jqXHR.responseText);
        })
    });
});
