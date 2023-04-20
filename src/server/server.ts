import express from 'express';
import { MONGO_URL, PORT } from '../constant/ServerConstant';
import bodyParser from 'body-parser'
import { clientErrorHandler, errorHandler, logErrors } from '../errorHandler/errorHandler';
import globalRoutes from '../routes/routes';
import * as mongoose from 'mongoose';

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(MONGO_URL).then(mongos => {
    console.log('MongoDb Connected')
}).catch(err => {
    if(err){
        console.error('MongoDB Connection Failed')
    }
});

globalRoutes(app);

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server Running On ${PORT}`));