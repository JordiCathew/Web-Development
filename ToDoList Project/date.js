
// 
module.exports.getDate = function() {
    var today = new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    return today.toLocaleString("en-US", options);
};

// Also another way of defining the function.
module.exports.getDay = getDay;

function getDay(){
    var today = new Date();
    
    let options = {
        weekday: "long"
    };

    return today.toLocaleString("en-US", options);
}


