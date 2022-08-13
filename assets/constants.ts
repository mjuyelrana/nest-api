const dbName = "e_learning";
const dbUser = "juyel";
const dbPass = "juyel04232";
const MONGO_URI = `mongodb+srv://${dbUser}:${dbPass}@atlascluster.rqnxi4t.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const JWT_SECRET = dbPass;
export { dbName, MONGO_URI, JWT_SECRET };