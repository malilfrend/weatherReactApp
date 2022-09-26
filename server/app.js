const express = require('express');
const https = require('https');
const path = require('path');
require('dotenv').config();

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
    y;
  });
}

app.get('/api/weather', function (req, res) {
  const options = {
    hostname: 'api.weather.yandex.ru',
    path: `/v2/forecast?lat=${req.query.lat}&lon=${req.query.lon}&extra=false`,
    method: 'GET',
    headers: {
      'X-Yandex-API-Key': process.env.YANDEX_WEATHER_API_KEY,
    },
  };
  const yandexReq = https.request(options, (yandexRes) => {
    yandexRes.setEncoding('utf8');
    res.writeHead(yandexRes.statusCode);

    yandexRes.on('data', (chunk) => {
      res.write(chunk);
    });

    yandexRes.on('close', () => {
      res.end();
    });

    yandexRes.on('end', () => {
      res.end();
    });
  });
  yandexReq.on('error', (e) => {
    console.error(e);
    try {
      res.writeHead(500);
      res.write(e.message);
    } catch (e) {
      // ignore
    }
    res.end();
  });
  yandexReq.end();
});

const PORT = process.env.NODE_ENV === 'production' ? 3000 : 3001;

app.listen(PORT, () => {
  console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
  console.log('Сервер ожидает подключения...');
});
