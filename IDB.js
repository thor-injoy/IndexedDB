const IDB = {
    set: async function(name,value){
        //  works
        if (await IDB.check(name)){
            await IDB.remove(name);
        } 

        let version = await IDB.version(name)+1;
        let open = indexedDB.open(name, version);
        
        open.onupgradeneeded = function(evt) {
            var db = open.result;
            var store = db.createObjectStore(name, {keyPath: "id"});
            var index = store.createIndex("index", "id");
        }

        open.onsuccess = function(evt) {
            var db = open.result;
            var tx = db.transaction(name, "readwrite");
            var store = tx.objectStore(name);
            var index = store.index("index");

            store.put({id:name,data:value});

            // Close the db when the transaction is done!
            tx.oncomplete = function() {
                db.close();
            };
        }
        
        open.onerror = function(evt) {
            console.warn("Error",evt);
        }
        
    },
    getCall: function(name,callback){
        let open = indexedDB.open(name);
        open.onsuccess = function(evt) {
            var db = open.result;
            var tx = db.transaction(name);
            var store = tx.objectStore(name);
            
            // Query the data
            var query = store.get(name);

            query.onsuccess = function(evt) {
                let response = query.result.data;
                callback(response);
            };

            query.onerror = function(evt) {
                console.warn("Error",evt);
            }

            // Close the db when the transaction is done
            tx.oncomplete = function() {
                db.close();
            };
        }
    },
    get: function(name,callback){
        return new Promise(function(resolve, reject) {
            let open = indexedDB.open(name);
            open.onsuccess = function(evt) {
                var db = open.result;
                var tx = db.transaction(name);
                var store = tx.objectStore(name);
                
                // Query the data
                var query = store.get(name);

                query.onsuccess = function(evt) {
                    let response = query.result.data;
                    resolve(response);
                    if (callback){
                        callback(response);
                    }
                };

                query.onerror = function(evt) {
                    console.warn("Error",evt);
                    reject("Error",evt);
                }

                // Close the db when the transaction is done
                tx.oncomplete = function() {
                    db.close();
                };
            }
        })
    },
    remove: function(name){
        return new Promise(function(resolve, reject) {
            let drop = indexedDB.deleteDatabase(name);
            drop.onsuccess = function(evt) {
                resolve(true,evt);
            }
            drop.onerror = function(evt) {
                console.warn("Error",evt);
                reject(false,evt);
            }
        })
    },
    check: function(name){
        return new Promise(function(resolve, reject) {
            let open = indexedDB.open(name);
            open.onsuccess = function(evt) {
                let db = open.result;
                db.objectStoreNames.length > 0 ? resolve(true) : resolve(false);
                db.close();
                IDB.remove(name);
            }
            open.onerror = function(evt) {
                console.warn("Error",evt);
                reject(false);
            }
        })  
    },
    version: function(name){
        return new Promise(function(resolve, reject) {
            let open = indexedDB.open(name);
            open.onsuccess = function(evt) {
                let db = open.result;
                let version = db.version;
                resolve(version);
                db.close();
            }
            open.onerror = function(evt) {
                console.warn("Error",evt);
                reject("Error",evt);
            }
        })  
    }
}

async function getIDB(){
    let response = await IDB.check("testDB");
    console.log(response);
}