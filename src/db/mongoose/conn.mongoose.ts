const conn = require('mongoose');

conn.connect('mongodb://app:app@localhost:27018/appdb?authSource=admin&readPreference=primary&ssl=false')
.then(() => {
    console.log('Mongoose connected');
})
.catch(e => {
    console.log('Mongoose Error!', e)
});

export = conn;