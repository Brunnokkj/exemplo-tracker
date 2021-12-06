const fetch = require("node-fetch") // UTILIZADO PARA DAR FETCH NA API
const cb = require('clipboardy')
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout}); // UTILIZADO PARA O INPUT DO ID
var colors = require('colors'); // UTILIZADO PARA DEIXAR COLORIDO KKK
let API_KEY = "" // API KEY AQUI
console.clear() // limpa o console
function loop(){ // CRIA UMA FUNÇÃO DE LOOP

  readline.question(colors.brightBlue('COLOQUE O ID DO USUÁRIO QUE DESEJA PROCURAR OS NICKS ANTIGOS > '), async name => { // CRIA A PERGUNTA
  
  var z = await fetch(`https://api.147bio.club/tracker?id=${name}`, {  // DA FETCH NA API
          method: 'GET',
          headers: { 'API_KEY': API_KEY }
      })
	  var res = await z.json()  // RETORNA O OBJETO
     
	 if(z.status == 422) return console.log(colors.brightRed(`\n${res.erro}\n`)), loop()
     if(z.status == 404) return console.log(colors.brightRed(`\n${res.erro}\n`)), loop()
     if(z.status == 401) return console.log(colors.brightRed(`\n${res.erro}\n`)), loop()
		 
	console.log(colors.brightMagenta(`\n${res.nicks_antigos.join("\n")}\n`)) // RETORNA OS NICKS NO CONSOLE
	console.log(colors.brightYellow(`Nicks copiados para área de transferência.\n`))
  cb.writeSync(res.nicks_antigos.join("\n")) // COPIA OS NICKS PARA ÁREA DE TRANSFERÊNCIA
  setTimeout(() => {     
		 loop() 
    }, 2000);  // ABRE UM TIMEOUT PARA RETORNAR O LOOP APOS 2 SEGUNDOS   
    
  });
}


return loop() //RETORNA AO LOOP

