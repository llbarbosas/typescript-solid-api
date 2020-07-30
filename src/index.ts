import { app } from "./app";
import env from "./config/env";

const { PORT } = env;

app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
