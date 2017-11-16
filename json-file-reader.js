var fs = require("fs")

module.exports = {
  readFile: function(filename, callback){
    fs.readFile(filename, function (err,data) {
      if (err){
        throw err;
      }
      parsedData = JSON.parse(data)
      callback(parsedData)
    })
  }
}

