const {v4: uuidV4} = require('uuid');

class Band {
    constructor(name = 'no-name', votes = 0){
        this.id = uuidV4(); // Identificador único
        this.name = name;
        this.votes = votes;
    }

}

module.exports = Band;
