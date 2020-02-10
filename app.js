const http = require('http');
const fs = require('fs')
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        console.log('esta na primeira rota');
        res.write(
            // o action dentro do form especifica para onde irá ser enviada a mensagem. Pode ser usada para outro website inclusive
            `<html>
                <head><title>Formulario</title></head>
                <body>
                    <form action="/message" method="POST">
                        <input type="text" name="firstMessage"></input>
                        <button type="submit">enviar</button>
                    </form>
                </body>
            </html>`);
        return res.end();
    }
    if (url === '/message' && method === 'POST'){
        console.log('foi pra a segunda condição')
        // criação de event listener on() method
        const body = [];
        req.on('data', (chunk) => {
             // vai ser ativado sempre quando um novo chunk estiver pronto
            console.log(chunk);
            body.push(chunk);
        }); 
        req.on('end', () =>{
            // esse é o momento em que vamos fazer algo com os chunks para podermos trabalhar com eles, ou seja usar o Buffer
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
            console.log(parsedBody);
        });
        res.statusCode = 302;
        console.log('vai voltar para a primeira rota')
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('Content-type', 'text/html');
    res.write(`<html>
    <head><title>My First Page</title></head>
    <body><h1>Ola do meu servidor Node</h1></body>
    </html>`);
    res.end();
})

server.listen(3000);
