const http = require('http');
const fs = require('fs')
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write(
            // o action dentro do form especifica para onde irá ser enviada a mensagem. Pode ser usada para outro website inclusive
            `<html>
                <head><title>Formulario</title></head>
                <body>
                    <form action="/message" method="POST">
                        <input></input type="text" name="firstMessage">
                        <button type="submit">enviar</button>
                    </form>
                </body>
            </html>`);
        return res.end();
    }
    if (url === '/message' && method === 'POST'){
        fs.writeFileSync('message.txt', "TESTE");
        res.statusCode = 302;
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
