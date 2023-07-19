const mongoose = require('mongoose');

module.exports = async() => {
    const mongoUri = 'mongodb+srv://Ansh:D3gKUENU2gGIHCUj@cluster0.hkiipph.mongodb.net/?retryWrites=true&w=majority';
    try {
        const connect = await mongoose.connect(mongoUri, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        }); 
        
        console.log(`MongoDB Connected: ${connect.connection.host}`);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    
}