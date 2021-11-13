/* Your Code Here */

/*
let testArray1 = ['George', 'Washington', 'President', 10];
let testArray2 = ['Freddie', 'Mercury', 'Frontman', 100];

 let testRecord1 = {
    firstName: "Christy",
    familyName: "P",
    title: "Boss",
    payPerHour: 1000, 
    timeInEvents: [{type: "TimeIn",
    hour: '0900',
    date: '2021-11-12'},
    {type: "TimeIn",
    hour: '1400',
    date: '2021-11-12'},
    {type: "TimeIn",
    hour: '0900',
    date: '2021-11-13'},
],
    timeOutEvents: [{type: "TimeOut",
    hour: '1200',
    date: '2021-11-12'},
    {type: "TimeOut",
    hour: '1700',
    date: '2021-11-12'},
    {type: "TimeOut",
    hour: '1700',
    date: '2021-11-13'},],
 }

 let testRecord2 = {
    firstName: "Newbie",
    familyName: "x",
    title: "Assistant",
    payPerHour: 10, 
    timeInEvents: [{type: "TimeIn",
    hour: '0900',
    date: '2021-11-12'},],
    timeOutEvents: [{type: "TimeOut",
    hour: '1700',
    date: '2021-11-12'}],
 }
 function testThisThing (){
     console.log(this.firstName); 
 }

 testThisThing.call(testRecord1); 

*/

function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3], 
        timeInEvents: [],
        timeOutEvents: [],
    }
};

function createEmployeeRecords(array){
    return array.map( nestedArray => createEmployeeRecord(nestedArray));
};

//last time this took the employee object as an arg, this time use context 
function createTimeInEvent(dateStamp){
    this.timeInEvents.push({
        hour: parseInt((dateStamp.split(" "))[1]),
        date: (dateStamp.split(" "))[0],
        type: "TimeIn",
    })
    return this; 
};

function createTimeOutEvent(dateStamp){
    this.timeOutEvents.push({
        hour: parseInt((dateStamp.split(" "))[1]),
        date: (dateStamp.split(" "))[0],
        type: "TimeOut",
    })
    return this; 
}

function hoursWorkedOnDate(dateStr){
    let timeInArray = this.timeInEvents.filter(obj => obj.date == dateStr).map(obj => obj.hour);
    let timeOutArray = this.timeOutEvents.filter(obj => obj.date == dateStr).map(obj => obj.hour);
    //I don't know how to use array methods to work with two arrays at once so I'm using a loop 
    let hoursWorkedArray = [];
    for (let i=0; i < timeInArray.length; i++){
        hoursWorkedArray.push((timeOutArray[i] - timeInArray[i])/100);
    }
    let reducer = (x,y) => x + y; 
    return hoursWorkedArray.reduce(reducer); 
}

function wagesEarnedOnDate(dateStr){
    return hoursWorkedOnDate.call(this, dateStr) * this.payPerHour; 
};


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
const allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    //remove duplicate dates
    eligibleDates = [...new Set(eligibleDates)] 

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    let matches = srcArray.filter( obj => obj.firstName == firstName )
    return matches[0];
}

function calculatePayroll(array){
    let allWagesArray = array.map( obj => allWagesFor.call(obj));
    const reducer = (x, y) => x + y; 
    return allWagesArray.reduce(reducer); 
}


// My Tests 
/*
console.log('testing createEmployeeRecord: ');
console.log(createEmployeeRecord(testArray1));
console.log('testing createEmployeeRecords:');
console.log(createEmployeeRecords([testArray1, testArray2]));
console.log('testing createTimeOutEvent: ')
console.log(createTimeOutEvent.call(testRecord1,'2021-11-13 1000'))
console.log('testing hoursWorkedOnDate: ');
console.log(hoursWorkedOnDate.call(testRecord1, '2021-11-13'));
console.log('testing wagesEarnedOnDate: '); 
console.log(wagesEarnedOnDate.call(testRecord1, '2021-11-13'));
console.log('testing allWagesFor: ' )
console.log(allWagesFor.call(testRecord1));
console.log('testing findEmployeeByFirstName: ');
console.log(findEmployeeByFirstName([testRecord1, testRecord2], 'Christy'))
console.log('testing calculatePayRoll (should be 14080'); 
console.log(calculatePayroll([testRecord1, testRecord2]))

*/