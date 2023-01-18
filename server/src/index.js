const config = require('./config');
const dbConfig = require('./config/dbConfig');
const app = require('./app');

async function bootstrap() {
  try {
    await dbConfig();
    app.listen(config.port, () => {
      console.log(`SERVER STARTED AT ${config.port}`);
    });
  } catch (err) {
    process.exit(1);
  }
}

bootstrap();
