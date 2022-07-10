import { v4 } from "uuid";

class IdGenerator{
    public generatedId():string{
        return v4()
    }
}
export default IdGenerator