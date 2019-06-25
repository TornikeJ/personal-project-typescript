import { SubjectsModel } from "./SubjectsModel";

export class LMSModel{
    mp: Map<any, any>;
    constructor(){
        this.mp = new Map();
    }

    async add(obj:SubjectsModel) {             
            return this.mp.set(obj.id,obj);
    };

    
    async remove(obj:SubjectsModel) { 
            if(!obj.id)
            {
                throw new Error('Input can\'t be found');
            }
            
            return (this.mp.delete(obj.id));
    };

    async verify(obj:SubjectsModel) { 
        if(this.mp.has(obj.id))
        {
        return (true);
        }
        return false;
    };

    async read(id:string){ 
        return (this.mp.get(id));
    };
    async readAll(){  
        const values = this.mp.values();          
        
        return [Array.from(values)];
    };

}