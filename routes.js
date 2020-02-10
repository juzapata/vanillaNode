const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
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
    if (url === '/message' && method === 'POST') {
        // criação de event listener on() method
        const body = [];
        req.on('data', (chunk) => {
            // vai ser ativado sempre quando um novo chunk estiver pronto
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            // esse é o momento em que vamos fazer algo com os chunks para podermos trabalhar com eles, ou seja usar o Buffer
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            //fs.writeFileSync('message.txt', message); // esse método vai bloquear execução de código até ser executado. 
            fs.writeFile('message.txt', message, (err) => {
                // ele só vai terminar de mandar o request, assim que writeFile estiver pronta, por isso colocamos o resto do código abaixo, dentro do contexto desta função
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            })
        });
    }
    res.setHeader('Content-type', 'text/html');
    res.write(`<html>
    <head><title>My First Page</title></head>
    <body><h1>Ola do meu servidor Node</h1></body>
    </html>`);
    res.end();
}

module.exports = requestHandler;