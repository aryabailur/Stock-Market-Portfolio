
import express, { Request, Response } from 'express';


const app = express();


const PORT = process.env.PORT || 3000;


app.get('/', (req: Request, res: Response) => {
  res.send(' This is a basic Express server in TypeScript.');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});