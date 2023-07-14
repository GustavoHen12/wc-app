import {API_URL} from "./config.js"

function criarTabela(listaJson) {
    var tabela = document.createElement("table");
    var cabecalho = tabela.createTHead().insertRow();
    
    var thNome = document.createElement("th");
    thNome.textContent = "Nome";
    cabecalho.appendChild(thNome);
    var thTelefone = document.createElement("th");
    thTelefone.textContent = "Telefone";
    cabecalho.appendChild(thTelefone);
    
    var corpo = tabela.createTBody();
    listaJson.forEach(function(objeto) {
        var linha = corpo.insertRow();
        var celulaNome = linha.insertCell();
        celulaNome.textContent = objeto.nome;
        var celulaTelefone = linha.insertCell();
        celulaTelefone.textContent = objeto.telefone;
    });


    return tabela;
}

$(document).ready(function() {
    $('#form_get_visitantes').submit(function(event) {
        event.preventDefault();
        var data = $('#data').val();

        var token = localStorage.getItem('tokenJwt');
        var settings = {
            "url": API_URL + "/visitantes?data=" + data,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + token,
            }
        };

        $.ajax(settings).done(function (response) {
            if(response != undefined && response.length > 0) {
                $('#btn_copiar').show();
                $('#btn_copiar').click(function() {
                    var nomes = "";
                    response.forEach(function(objeto) {
                        nomes += objeto.nome + " - " + objeto.telefone + "\n";
                    });
                    navigator.clipboard.writeText(nomes);
                });
                
                var tabela = criarTabela(response);
                $('.tabela').html(tabela);
            } else {
                $('.tabela').html("Nenhum visitante encontrado");
                $('#btn_copiar').hide();
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $('.erro').html(jqXHR.responseText);
        })
    });
});
