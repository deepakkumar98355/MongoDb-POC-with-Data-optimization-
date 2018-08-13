var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    //sample Find 
    //Start
    var query = {"category_code": "biotech"};

    db.collection('companies').find(query).toArray(function(err, docs) {

        assert.equal(err, null);
        assert.notEqual(docs.length, 0);
        
        docs.forEach(function(doc) {
            console.log( doc.name + " is a " + doc.category_code + " company." );
        });
        
        db.close();
        
    });
    //End

    //Explicit cursor (will enhance the performance )

    //Start

    var query = {"category_code": "biotech"};

    var cursor = db.collection('companies').find(query);

    cursor.forEach(
        function(doc) {
            console.log( doc.name + " is a " + doc.category_code + " company." );
        },
        function(err) {
            assert.equal(err, null);
            return db.close();
        }
    );

    //End

    //Field projection to query based on the cursor to enhance the data stablity and DB performance  
    //Start //
    var query = {"category_code": "biotech"};
    var projection = {"name": 1, "category_code": 1, "_id": 0};

    var cursor = db.collection('companies').find(query);
    cursor.project(projection);  //will chain a call to project using 'projecy method on cursor'

    cursor.forEach(
        function(doc) {
            console.log(doc.name + " is a " + doc.category_code + " company.");
            console.log(doc);
        },
        function(err) {
            assert.equal(err, null);
            return db.close();
        }
    );
    //End //

    //Start//



    //End//

});
