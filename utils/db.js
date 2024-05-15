const { MongoClient } = require('mongodb');

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        const uri = `mongodb://${host}:${port}/${database}`;

        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.isDBConnected = false;

        this.connect();
    }

    async connect() {
        try {
            await this.client.connect();
            this.isDBConnected = true;
        } catch (error) {
            console.error('MongoDB connection error:', error);
            this.isDBConnected = false;
        }
    }

    isAlive() {
        return this.isDBConnected;
    }

    async nbUsers() {
        try {
            const db = this.client.db();
            const usersCollection = db.collection('users');
            const count = await usersCollection.countDocuments();
            return count;
        } catch (error) {
            console.error('Error counting users:', error);
            return -1;
        }
    }

    async nbFiles() {
        try {
            const db = this.client.db();
            const filesCollection = db.collection('files');
            const count = await filesCollection.countDocuments();
            return count;
        } catch (error) {
            console.error('Error counting files:', error);
            return -1;
        }
    }
}

const dbClient = new DBClient();
module.exports = dbClient;

