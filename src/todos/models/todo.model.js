import { v4 as uuid } from "uuid";
export class Todo{
    
    /**
     * 
     * @param {String} description 
     */

    constructor( description ) {
        if(!description) throw new Error('No description has been sent as a parameter')
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createAt = new Date();
    }
}