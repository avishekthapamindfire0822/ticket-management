const config = require('./config');
const app = require('./app');

async function bootstrap() {
  try {
    app.listen(config.port, () => {
      console.log(`SERVER STARTED AT ${config.port}`);
    });
  } catch (err) {
    process.exit(1);
  }
}

bootstrap();
