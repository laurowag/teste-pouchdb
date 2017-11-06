import PouchDB from 'pouchdb-react-native';
PouchDB.plugin(require('pouchdb-find'));
//PouchDB.debug.enable('*');

class DatabaseConnection {

    private static _instance: DatabaseConnection = new DatabaseConnection();

    private _pouchDB: PouchDB;
    
    constructor() {
        if (DatabaseConnection._instance){
            throw new Error("Error: Instantiation failed: Use DatabaseConnection.getInstance() instead of new.");
        }
        DatabaseConnection._instance = this;
        this._pouchDB = new PouchDB('docs');
    }

    public static getInstance(): DatabaseConnection
    {
        return DatabaseConnection._instance;
    }

    public static getPouchDBInstance(): PouchDB
    {
        return DatabaseConnection._instance._pouchDB;
    }

    public limparDatabase(onError?: Function) {
        this._pouchDB.destroy().then(function () {
            this._pouchDB = new PouchDB('docs');
        }).catch(function (error) {
            if (onError) {
                onError(error);
            }
        });
    }

    public replicar(database: string, servidor: string, usuario: string, senha: string, onComplete?: Function, onError?: Function)
    {		
		const remoteDB = new PouchDB(`http://${usuario}:${senha}@${servidor}:5984/${database}`, {ajax: {cache: false}});

        //Replicacao de envio
        const x = this;
        this._pouchDB.replicate.to(remoteDB, {batch_size: 10, 
                filter: function (doc) {
                    return doc._id.indexOf('proposta:') >= 0;
                }
        })
        .on('complete', function () {
            //Replicacao de retorno
            x._pouchDB.replicate.from(remoteDB, {batch_size: 10, timeout: 20000, retry: true, filter: 'filtros/porUsuario', query_params: {'usuario': 'lauro'}})
            .on('complete', function (info) {
                console.log(info);
                if (onComplete) {
                    onComplete(info);
                }
            }).on('denied', function (error) {
                console.log(error);
                if (onError) {
                    onError(error);
                }
            }).on('error', function (error) {
                console.log(error);
                if (onError) {
                    onError(error);
                }
            });
        }).on('denied', function (error) {
            console.log(error);
            if (onError) {
                onError(error);
            }
        }).on('error', function (error) {
            console.log(error);
            if (onError) {
                onError(error);
            }
        });
    }
}

export default DatabaseConnection;