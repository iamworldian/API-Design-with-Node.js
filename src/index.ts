import * as dotenv from 'dotenv'
dotenv.config();

import app from "./server";

app.listen(3001, () => {
    console.log('Server Listening on port 3001');
})
