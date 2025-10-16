import express from "express";
import cors from "cors";
import { sequelize } from "./config/dbconfig";
import { setRoutes } from "./routes";
     import http from 'http';
import { initModel } from "./model";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
// import { initializeSocket } from './src/helpers/socket';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const server = http.createServer(app);

const port = process.env.PORT || 5001;

try {
  initModel(sequelize);
  sequelize.sync();
} catch (e) {
  console.log("Error", e);

}

// const io = initializeSocket(server);
setRoutes(app);

// console.log("Starting Server on Port: ", io);



server.listen(port, () => console.log(`Server running on ${port}`));