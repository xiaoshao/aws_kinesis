var kcl = require('aws-kcl');
var log = require('./logger.js')().getLogger('recordProcessor');

var recordProcessor = {
	initialize: function(initializeInput, completeCallback){
		completeCallback();
	},

	processRecords: function(processRecordsInput, completeCallback) {
		if (!processRecordsInput || !processRecordsInput.records) {
			completeCallback();
			return;
		}

		var records = processRecordsInput.records;
		var record, data, sequenceNumber, partitionKey;

		 for (var i = 0 ; i < records.length ; ++i) {
	        record = records[i];
	        data = new Buffer(record.data, 'base64').toString();
	        sequenceNumber = record.sequenceNumber;
	        partitionKey = record.partitionKey;
	        log.info("data: " + data + 
				"sequenceNumber: " + sequenceNumber + 
				"partitionKey: " + partitionKey);
      	}

      	if (!sequenceNumber) {
        	completeCallback();
			return;
      	}

      	processRecordsInput.checkpointer.checkpoint(sequenceNumber, function(err, sequenceNumber) {
        	completeCallback();
      	});
	},
	
	shutdown: function(shutdownInput, completeCallback) {
		log.info("shutdown");
		if (shutdownInput.reason !== 'TERMINATE') {
      		completeCallback();
      		return;
    	}

    	shutdownInput.checkpointer.checkpoint(function(err) {
        	completeCallback();
      	});
	}
};

module.exports=kcl(recordProcessor).run();