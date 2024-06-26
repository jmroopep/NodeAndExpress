const express = require('express');
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectId } = require('mongodb');

const sessionRouter = express.Router();

sessionRouter.route('/').get((req, res) => {
    const url = 'mongodb+srv://janeaquafina:PSofAKVbDXNtqowd@globomantics.84ky1vy.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'globomantics';

    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');

            const db = client.db(dbName);

            const sessions = await db.collection('sessions').find().toArray();
            res.render ('sessions', { sessions });

        } catch (error) {
            debug(error.stack);
        }
        client.close();
    })();
});

sessionRouter.route('/:id').get((req, res) => {
    const id = req.params.id;
    const url = 'mongodb+srv://janeaquafina:PSofAKVbDXNtqowd@globomantics.84ky1vy.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'globomantics';

    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url);
            debug('Connected to the mongo DB');

            const db = client.db(dbName);

            const session = await db.collection('sessions').findOne({_id: new ObjectId(id)});
            res.render ('session', { session });

        } catch (error) {
            debug(error.stack);
        }
        client.close();
    })();
});

module.exports = sessionRouter;