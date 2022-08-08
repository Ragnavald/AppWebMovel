$(document).ready(function(){      
        $("#cep").blur(function (){ //Função que executa logo após o usuário desfocar do campo com id cep
            var cep = $(this).val().replace('-','');  // Limpa a variável cep, removendo o '-' por ''
            if (cep != '') { 
                var url = 'http://viacep.com.br/ws/'+cep+'/json';// acessando o server indicado e buscando os dados do cep inserido
                $.get(url,function(dados){  //recebendo os dados por get e retornando dados
                    $("#endereco").val(dados.logradouro); //listando os valores de dados nos campos 
                    $("#cidade").val(dados.localidade);
                    $("#estado").val(dados.uf);
                });
            }
            // localStorage.getItem("login_email") === null &&  localStorage.getItem("login_senha") === null
            if (typeof localStorage === undefined) { // se localStorage for indefinido, no caso que eu necessito é que esteja vazio
                window.location.href("http://localhost/Atividade3_TM_Ronaldo_Junior/App/login.html"); // será redirecionado para a pag login.html 
            }else{ //senão
                window.location.href("http://localhost/Atividade3_TM_Ronaldo_Junior/App/index.html"); // é redirecionado para o index.html pois ele já está no localstorage
            } 
        });
        $("#add").toggle(); 
        $("#add2").toggle();
        $("#ger").toggle();
        $("#ger2").toggle();
        $("#card_sing").hide();
        $("#membroc").click(function(){ 
        $("#tituloM").val("Cadastro de Membro");
        $("#add").toggle();
        $("#add2").hide();
        $("#ger").hide();
        $("#ger2").hide();
        $("#navbarSupportedContent").toggle(); 
        $("#codigoM").val(0); //atribuindo o valor 0 para código
        });
        $("#eventoc").click(function(){
        $("#tituloE").val("Cadastro de Evento");
        $("#add2").toggle();
        $("#add").hide();
        $("#ger").hide();
        $("#ger2").hide();
        $("#navbarSupportedContent").toggle();
        $("#codigoE").val(0); 
        });
        $("#sai").click(function(){
        $("#navbarSupportedContent").toggle();
        });

        $("#NC").click(function() {
           $("#card_login").hide();
           $("#card_sing").show(); 
        });
        $("#E").click(function() {
            $("#card_login").show();
            $("#card_sing").hide();
        });

        $("#sair").click(function() { //quando o usuário clicar em sair
            localStorage.removeItem("login_email"); //o localstorage com a key "login_email" será apagada
            localStorage.removeItem("login_senha"); 
            window.location.replace("http://localhost/Atividade3_TM_Ronaldo_Junior/App/login.html"); //utilizei da função replace para estabelecer que o usuario não retorne para a página
            

        });
    
        $("#card_sing_btn_salvar").click(function(){    
          var nome = $("#sing_nome").val();
          var email = $("#sing_email").val();
          var senha = $("#sing_senha").val();
          var confi = $("#sing_senhaC").val();
            if(senha == confi){ //é importante fazer uma confirmação de senha para os usuários que esquecem com frequência suas senhas
              $.ajax({ //abrindo escopo AJAX 
              url: "http://localhost/Atividade3_TM_Ronaldo_Junior/webservice/webservice.php", //endereço 
              method: "GET", // médoto do tipo GET
              data:{ //data os dados que serão enviados para o destino da url acima
               "tipo":"create", // tipo
               "tabela": "usuarios",
               "nome": nome,
               "email": email,
               "senha": senha,
              },
              success: function (retorno) {
                $("#sing_nome").val("");
                $("#sing_email").val("");
                $("#sing_senha").val("");
                $("#sing_senhaC").val("");
                alert(retorno);
              },timeout: 3000,
              error: function () {
                  
              }
          });
        }else{
            alert("SENHAS NÃO CONFEREM");
        }
        });

        $("#login").click(function(){ //PARTE DA VERIFICAÇÃO DO LOGIN
            var email = $("#login_email").val();
            var senha = $("#login_senha").val();

            $.ajax({
                url: "http://localhost/Atividade3_TM_Ronaldo_Junior/webservice/webservice.php",
                method: "GET",
                data:{
                    "tipo": "readFilter",
                    "tabela": "usuarios",
                    "email": email,
                    "senha": senha,
                },
                success: function (retorno) {
                var json = $.parseJSON(retorno);
                var emailLS = json[2]; //CRIANDO DUAS VARIÁVEIS 
                var senhaLS = json[3];
                localStorage.setItem('login_email',emailLS); //FIZEMOS O SEGUINTE NESSA LINHA DE CÓDIGO: TROCAMOS VAZIO PELO VALOR ESTABELECIDO ACIMA NAS VARIÁVEIS DO LOCALSTORAGE
                localStorage.setItem('login_senha',senhaLS);
                window.location.replace("http://localhost/Atividade3_TM_Ronaldo_Junior/App/index.html");

                },timeout: 3000,
                error: function () {
                    
                }
            });


        });

        $("#adicionarM").click(function(){
            var codigo = parseInt($("#codigoM").val()); //pega o valor inteiro do codigo do form
		    var tipo;
		    if(codigo == 0){ //se codigo for 0 o tipo será:
			tipo = "create";
		    }
		    else{
		    tipo = "update";
		    }
            var nome = $("#nome").val();
            var cpf = $("#cpf").val();
            var cep = $("#cep").val().replace('-',''); //limpando cep
            var endereco = $("#endereco").val();
            var cidade = $("#cidade").val();
            var estado = $("#estado").val();
            $.ajax({ //criando um ajax para cadastro, com o url indicando o webservice que se encontra a cláusula de inserção
                url: "http://localhost/Atividade3_TM_Ronaldo_Junior/webservice/webservice.php", //endereço 
                method: "GET", //o método
                data:{  // os dados que serão enviados, no valor com aspas é a variável logo acima e o valor que se encontra logo após o dois pontos é o parâmetro que será enviado e relacionado no webservice
                    "tipo": tipo,
                    "tabela": "membros",
                    "nome":nome,
                    "cpf": cpf,
                    "cep": cep,
                    "endereco": endereco,
                    "cidade":cidade,
                    "estado":estado,
                    "codigo": codigo
                },
                success: function () {
                    $("#nome").val("");
                    $("#cpf").val("");
                    $("#cep").val("");
                    $("#endereco").val("");
                    $("#cidade").val("");
                    $("#estado").val("");
                },timeout: 3000,
                error: function(){
                    alert("Erro ao mandar para o servidor");
                }

            });
        });

        $("#adicionarE").click(function(){
            var codigo = parseInt($("#codigoE").val());
		    var tipo;
		    if(codigo == 0){
			tipo = "create";
		    }
		    else{
		    tipo = "update";
		    }
            var data = $("#data").val();
            var palestrantes = $("#palestrantes").val();
            var descri = $("#descri").val();
            $.ajax({
                url: "http://localhost/Atividade3_TM_Ronaldo_Junior/webservice/webservice.php",
                method: "GET",
                data:{
                    "tipo": tipo,
                    "tabela": "eventos",
                    "data":data,
                    "palestrantes": palestrantes,
                    "descri": descri

                },
                success: function () {
                    $("#data").val("");
                    $("#palestrantes").val("");
                    $("#descri").val("");
                },timeout: 3000,
                error: function(){
                    alert("Erro ao mandar para o servidor");
                }

            });
        });

        $("#membrol").click(function(){           
            $("#add").hide();
            $("#add2").hide();
            $("#navbarSupportedContent").toggle();
            $("#ger").toggle();
            $("#ger2").hide();
            document.getElementById("listM").innerHTML="" //limpando a listagem, para que não ocorra ambiguidade
            listarM(); //chamando a função que irá listar 
        });
        $("#eventol").click(function(){           
            $("#add").hide();
            $("#add2").hide();
            $("#navbarSupportedContent").toggle();
            $("#ger2").toggle();
            $("#ger").hide();
            document.getElementById("listE").innerHTML=""
            listarE();
        });

        $("#criar").click(function () {
           $("#card_login").hide(); 
           $("#card_sing").show();
        });


    });


        



    function puxarDadosM(id){ //função que irá puxar os dados e atribuí-los para os inputs na hora de editar
        $.ajax({
            url: "http://localhost/Atividade3_TM_Ronaldo_Junior/webservice/webservice.php",
            method: "GET",
            data:{ 
                "tipo": "readFilter", //tipo que irá retornar apenas os dados do id que será enviado via ajax
                "tabela": "membros",
                "codigo": id
            },
            success: function(retorno){
                $("#ger").hide();
                $("#ger2").hide();
                $('#add').show();       
                var json = $.parseJSON(retorno);//criando uma variável que converte o retorno da função em json
                $("#nome").val(json[1]); // pegando os dados json por index de um vetor
                var cep = json[3];
                var resultado = cep.replace(/(\d{5})(\d{3})/, "$1-$2"); // colocando máscara novamente no cep para que o ajax funcione corretamente
                $("#cpf").val(json[2]);	
                $("#cep").val(resultado); //atribuindo a variável resultado com o cep pontuado
                $("#cep").focus(); // focar no input cep, logo que o usuário desfocar do campo irá executar o ajax
                $("#codigoM").val(json[0]); // atribuindo o id para o codigo do membro que será usado na função deletar  
                $("#tituloM").html("Editar Membro"); //alterando o titulo do nosso form
             
            },
            timeout: 3000,
            error: function(){
                alert("Erro ao mandar para o servidor");
            }
        });
        
    }

    function puxarDadosE(id){
        $.ajax({
            url: "http://localhost/Atividade3_TM_Ronaldo_Junior/webservice/webservice.php",
            method: "GET",
            data:{
                "tipo": "readFilter",
                "tabela": "eventos",
                "codigo": id
            },
            success: function(retorno){
                $("#ger").hide();
                $("#ger2").hide();
                $('#add2').show();       
                var json = $.parseJSON(retorno);
                var dtcv = moment((json[1])).format("YYYY-MM-DDTkk:mm");
                $("#data").val(dtcv);
                $("#palestrantes").val(json[3]);	
                $("#descri").val(json[2]);
                $("#codigoE").val(json[0]);  
                $("#tituloE").html("Editar Membro");
             
            },
            timeout: 3000,
            error: function(){
                alert("Erro ao mandar para o servidor");
            }
        });
        
    }

         function deletarM(id) { //função responsável por excluir 
            $.ajax({ //criamos um ajax para passar o id, tipo e tabela que será executada nossa função
                url:"http://localhost/Atividade3_TM_Ronaldo_Junior/webservice/webservice.php",
                method: "GET",
                data:{ 
                    "tipo": "delete",
                    "tabela": "membros",
                    "codigo": id
                },
                success: function()
                {
                    document.getElementById("listM").innerHTML="" //limpando a listagem, para que não ocorra ambiguidade
                    listarM(); //chamando a função que irá listar 
                },
                timeout: 3000,
                error: function()
                {
                    alert("Não foi possível conectar ao servidor");
                }
            });
        }
        function deletarE(id) {
            $.ajax({
                url:"http://localhost/Atividade3_TM_Ronaldo_Junior/webservice/webservice.php",
                method: "GET",
                data:{
                    "tipo": "delete",
                    "tabela": "eventos",
                    "codigo": id
                },
                success: function()
                {
                    document.getElementById("listE").innerHTML=""
                    listarE();
                },
                timeout: 3000,
                error: function()
                {
                    alert("Não foi possível conectar ao servidor");
                }
            });
        }

        function listarM() { //função responsável por listar os membros 
            $.ajax({ // criação de um ajax para retornar o resultado da cláusula do webservice
             url: "http://localhost/Atividade3_TM_Ronaldo_Junior/webservice/webservice.php",   
		data:{
			"tipo": "read",
			"tabela": "membros" 
		},
		success: function(retorno)
		{        
            var json = $.parseJSON(retorno); //converteremos o retorno da nossa cláusula para json
            var membros = ""; // atribuiremos vazio para a variável responsável por concatenação
			for (var i = 0; i < json.length; i++) {//form para atribuir de forma organizada para cada tbody
				membros ='<tr>';
      			membros +='<td>'+json[i].nome+'</td>';  
    			membros +='<td>'+json[i].cpf+'</td>';
      			membros +='<td>'+json[i].cep+'</td>';
    			membros +='<td>'+json[i].endereco+'</td>';
                membros +='<td>'+json[i].cidade+'</td>';
                membros +='<td>'+json[i].Estado+'</td>';
                membros +='<td><a href="javascript:deletarM('+json[i].id+')">Excluir</a></td>'; //ao clicar no link excluir a função deletarM será executada e receberá o id do item selecionado
                membros +='<td><a href="javascript:puxarDadosM('+json[i].id+')">Editar</a></td>';
                membros +='</tr>';
                $("#listM").append(membros); //append para exibir sequêncialmente de cima para baixo
       
            }

        },
        timeout: 3000,
		error: function()
		{
			alert("Não foi possível conectar com o servidor");
		}
            });
        }

        function listarE() {
            $.ajax({
             url: "http://localhost/Atividade3_TM_Ronaldo_Junior/webservice/webservice.php",   
		data:{
			"tipo": "read",
			"tabela": "eventos" 
		},
		success: function(retorno)
		{        
            var json = $.parseJSON(retorno);
            var eventos = "";
			for (var i = 0; i < json.length; i++) {
				eventos ='<tr>';
      			eventos +='<td>'+json[i].data+'</tds>';  
    			eventos +='<td>'+json[i].palestrantes+'</td>';
      			eventos +='<td>'+json[i].descri+'</td>';
                eventos +='<td><a href="javascript:deletarE('+json[i].id+')">Excluir</a></td>'; 
                eventos +='<td><a href="javascript:puxarDadosE('+json[i].id+')">Editar</a></td>';
                eventos +='</tr>';
                $("#listE").append(eventos);
       
            }

        },
        timeout: 3000,
		error: function()
		{
			alert("Não foi possível conectar com o servidor");
		}
            });
        }



       
 