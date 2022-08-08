<?php
header("Access-Control-Allow-Origin: *"); // permite que o referenciador saiba se é permitido usar o recurso de destino.
header("Content-Type: text/html; charset=utf-8"); // tipo do texto, charset=utf-8
require_once("config.php"); //requerimento da página responsável pela conexão com o banco de dados
extract($_GET); //extract será o modo como as informações serão atribuidas 

if ($tipo == "create") { //se o tipo for criar então
    if ($tabela == "membros") { // se a tabela form membros então faça 
            $sql = "INSERT INTO membros VALUES(0,?,?,?,?,?,?)"; //executando a cláusula, fazendo uso do bindParam
                $com = $con->prepare($sql);     // a variável vai se conectar ao banco e irá preparar a cláusula colocando todos os valores do bindParam para a cláusula
                $com->bindParam(1, $nome);//bindParam que recebe valor diretamente da requisição
                $com->bindParam(2, $cpf);
                $com->bindParam(3, $cep);
                $com->bindParam(4, $endereco);
                $com->bindParam(5, $cidade);
                $com->bindParam(6, $estado);
                $com->execute(); //executando a cláusula e assim fazendo  a inserção 
    }
    if ($tabela == "eventos") { // se a tabela for "eventos" então 
            $sql = "INSERT INTO eventos VALUES(0,?,?,?)"; //cláusula de inserção
                $com = $con->prepare($sql);  // a variável vai se conectar ao banco e irá preparar a cláusula colocando todos os valores do bindParam para a cláusula
                $com->bindParam(1, $data);//bindParam que recebe valor diretamente da requisição
                $com->bindParam(2, $descri);
                $com->bindParam(3, $palestrantes);
                $com->execute();
    }
    if ($tabela == "usuarios"){
        $com = $con->prepare("SELECT * FROM usuarios WHERE email = ?");
        $com->bindParam(1, $email);
        $com->execute();
    if ($com->rowCount() == 0) {
        $pass = sha1($senha); // a variável pass ira receber o retorno da função sha1 que foi responsável por converter a $senha passada pela requisição
        $com = $con->prepare("INSERT INTO usuarios VALUES(0,?,?,?)");// variável responsável por armazenar a string com a cláusula para posteriormente ser executada   
        $com->bindParam(1, $nome);// cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
        $com->bindParam(2, $email); // cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
        $com->bindParam(3, $pass);// cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
        $com->execute();
     echo "CADASTRO FEITO COM SUCESSO"; 
     }else {
     echo "EMAIL EM USO";
    }
    }
} 
if ($tipo == "read") { // se o tipo for "read" então significa que os códigos seguintes irão ser responsáveis pelo select
    if ($tabela == "membros") { // se a tabela for "membros" então
                 $com = $con->query("SELECT * FROM membros"); //estabelecendo conexão com o banco e inserindo uma cláusula em uma query  
                 $dados = $com->fetchAll(); // a variável dados recebe um Fetch com todos os elementos
                echo json_encode($dados, JSON_UNESCAPED_UNICODE); //codificando em json para mais tarde reconverter para json
    }
    if ($tabela == "eventos") { ; // se a tabela for "evento" então
            $sql = "SELECT * FROM eventos"; // variável responsável por armazenar a string com a cláusula para posteriormente ser executada
                $com = $con->query($sql); // estabelecemos aqui a conexão com a query contendo a variável $sql
                $dados = $com->fetchAll();// a variável dados recebe um Fetch com todos os elementos que a cláusula retorno
                echo json_encode($dados, JSON_UNESCAPED_UNICODE);//codificando em json para mais tarde reconverter para json
       }
}
if ($tipo == "update") { //aqui temos que o tipo é igual a "update", ou seja, todas as condições abaixo dessa condição serão uma atualização exclusivamente das tabelas 
    if ($tabela == "membros") {  // se a tabela for "membros" então
            $sql = "UPDATE membros SET nome = ?, cpf = ?, cep = ?, endereco = ?, cidade = ?, Estado = ? WHERE id = ?";// variável responsável por armazenar a string com a cláusula para posteriormente ser executada
                $com = $con->prepare($sql); // estabelecemos aqui a conexão com a query contendo a variável $sql
                $com->bindParam(1, $nome);       // cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
                $com->bindParam(2, $cpf); // cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
                $com->bindParam(3, $cep); // cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
                $com->bindParam(4, $endereco); // cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
                $com->bindParam(5, $cidade); // cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
                $com->bindParam(6, $estado); // cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
                $com->bindParam(7, $codigo); // cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
                $com->execute(); //A cláusula pronta e preparada já pode ser executada, não concorda? então vamos executar ela por meio do comando execute
        }
    if ($tabela == "eventos") { //tipo da tabela for igual a "eventos" então:
            $sql = "UPDATE eventos SET data= ?, descri = ?, palestrantes = ?"; //uma linda cláusula de update, responsável por fazer uma atualização conforme as restrições dos argumentos fornecidos pelo bindparam
                $com = $con->prepare($sql); //Nesta linha é responsável por ligar o banco e preparar nossa cláusula com os devidos argumentos
                $com->bindParam(1, $data); //falando em bindParam aqui está ele, responsável por atrelar uma numeração ao argumento e definir o valor deste argumento
                $com->bindParam(2, $descri);//argumento descrição
                $com->bindParam(3, $palestrantes);//argumento palestrantes
                $com->execute(); // Tendo em vista que nossa cláusula está preparada com os devidos argumentos, agora basta executa-la
        }
}
if ($tipo == "delete") { // se tipo passado pela requisicao.js for "delete" então faça:
    if ($tabela == "membros") { // se tipo da tabela for "membros" então faça
            $sql = "DELETE FROM membros WHERE id = ?"; // variável responsável por armazenar a string com a cláusula para posteriormente ser executada
                $com = $con->prepare($sql); // estabelecemos aqui a conexão com a query contendo a variável $sql
                $com->bindParam(1, $codigo);// cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
                $com->execute();//A cláusula pronta e preparada já pode ser executada, não concorda? então vamos executar ela por meio do comando execute
    }
    if($tabela == "eventos"){ // se tipo da tabela for "eventos" então faça
            $sql = "DELETE FROM eventos WHERE id = ?";// variável responsável por armazenar a string com a cláusula para posteriormente ser executada
                $com = $con->prepare($sql);// estabelecemos aqui a conexão com a query contendo a variável $sql
                $com->bindParam(1, $codigo);// cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
                $com->execute();//A cláusula pronta e preparada já pode ser executada, não concorda? então vamos executar ela por meio do comando execute    
        }  
}
if ($tipo == "readFilter") { //utilizei deste tipo para leituras especiais, aquelas que retornam valores ou necessitam de argumentos extras para filtragem de registro
    if ($tabela == "membros") { //se a tabela for "membros" então
            $sql = "SELECT * FROM membros WHERE id = ?"; // variável responsável por armazenar a string com a cláusula para posteriormente ser executada
                $com = $con->prepare($sql);// estabelecemos aqui a conexão com a query contendo a variável $sql
                $com->bindParam(1, $codigo);// cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
                $com->execute();// Tendo em vista que nossa cláusula está preparada com os devidos argumentos, agora basta executa-la
                $dados = $com->fetch();// a variável dados recebe um Fetch com todos os elementos que a cláusula retorno
		        echo json_encode($dados, JSON_UNESCAPED_UNICODE);//codificando em json para mais tarde reconverter para json
    }
    if($tabela == "eventos"){ //se a tabela for "eventos" então
            $sql = "SELECT * FROM eventos WHERE id = ?"; // variável responsável por armazenar a string com a cláusula para posteriormente ser executada
                $com = $con->prepare($sql);// estabelecemos aqui a conexão com a query contendo a variável $sql
                $com->bindParam(1, $codigo); // cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
                $com->execute();// Tendo em vista que nossa cláusula está preparada com os devidos argumentos, agora basta executa-la
                $dados = $com->fetch();// a variável dados recebe um Fetch com todos os elementos que a cláusula retorno
		        echo json_encode($dados, JSON_UNESCAPED_UNICODE);//codificando em json para mais tarde reconverter para json    
        }  
    if($tabela == "usuarios"){//se a tabela for "usuários" então
        $pass = sha1($senha); // a variável pass ira receber o retorno da função sha1 que foi responsável por converter a $senha passada pela requisição
        $sql = "SELECT * FROM usuarios WHERE email = ? and senha = ?";// variável responsável por armazenar a string com a cláusula para posteriormente ser executada
        $com = $con->prepare($sql);// estabelecemos aqui a conexão com a query contendo a variável $sql   
        $com->bindParam(1, $email); // cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
        $com->bindParam(2, $pass); // cada número do bindParam corresponde ao agurmento simbolizado por um ponto de exclamação logo a cima na cláusula sql disponível na variável $sql 
        $com->execute();// Tendo em vista que nossa cláusula está preparada com os devidos argumentos, agora basta executa-la
        if ($com->rowCount() == 0) { // essa condição é muito importante, ela é responsável por validar o login. Se a retorno da cláusula acima retornar nenhum registro significa que o email e a senha não conferem ou não existem na nossa base de dados
        echo "Desculpe login inválido"; // mensagem que será mostrada no retorno da função logo em um alert na parte da requisicao.js
        }else{ //senão
            $dados = $com->fetch();// a variável dados recebe um Fetch com todos os elementos que a cláusula retorno
            echo json_encode($dados, JSON_UNESCAPED_UNICODE);//codificando em json para mais tarde reconverter para json  
        }
        
        }
    }
?>