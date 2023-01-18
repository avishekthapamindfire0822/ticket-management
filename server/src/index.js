const app = require('./app');

async function bootstrap() {
  try {
    app.listen(8001, () => {
      console.log(`SERVER STARTED`);
    });
  } catch (err) {
    process.exit(1);
  }
}

bootstrap();
