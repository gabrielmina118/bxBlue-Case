import { app } from "./controller/app";
import { investidorRouter } from "./route/investorRouter";
import { pokemonRouter } from "./route/pokemonRouter";

app.use("/investor",investidorRouter)
app.use("/pokemon",pokemonRouter)
