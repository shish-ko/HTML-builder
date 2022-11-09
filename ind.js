const http = require('http');

const PORT = 3000;

const requestHandler = (request, response) => {
    const { method, url } = request;
    console.log(`Получен ${method}-запрос на ${url}`);
    if(url=="/favicon.ico"){
      response.write("123123123");
      response.end();
    }else{
      response.write('Hello Node.js');
      response.end('Bye!');

    }
};

const server = http.createServer(requestHandler);

server.listen(PORT, 'localhost', () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});