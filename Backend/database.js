const mongoose = require('mongoose');

// const local = 'mongodb://localhost:27017';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('########## Connect to MongoDB ##############'))
    .catch(err => console.error('Could not connect to MongoDB..', err))


    