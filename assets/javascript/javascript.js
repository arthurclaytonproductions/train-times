$(document).ready(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDjClUgQ1NswrIbIcfMe-CaWJ4b7p69U78",
        authDomain: "train-times-5cc21.firebaseapp.com",
        databaseURL: "https://train-times-5cc21.firebaseio.com",
        projectId: "train-times-5cc21",
        storageBucket: "",
        messagingSenderId: "1062874276712"
      };
      
      firebase.initializeApp(config);
    
      var database = firebase.database();

//Global Var
var trainName = '';
var destination = '';
var firstTrainTime = ''; 
var frequency = '';

//Conversion
var firstTimeSetConv = '';
var timeRemanding;
var timeTillTrain;
var nextTrain; 

//Data
var trainNameData = '';
var destinationData = '';
var arrivalTimeData = '';
var frequencyData = '';
var minsAwayData = ''; 

$(document).bind('keypress', function(e) {
    if(e.keyCode==13){
         $('#submit').trigger('click');
     }
});

//Capture Submit Click
$("#submit").on("click",function(){
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();
//Clear
    $('#trainName').val('');
	$('#destination').val('');
	$('#firstTrainTime').val('');
	$('#frequency').val('');


//First Converted Time
firstTimeSetConv = moment(firstTrainTime, "hh:mm").subtract(1, "years");

//Current Time
var differentTime = moment().diff(moment(firstTimeSetConv), "minutes"); 
//Remainding Time
timeRemanding = differentTime % frequency;
// Mins for train Train
timeTillTrain = frequency - timeRemanding;
// Next Train
nextTrain = moment().add(timeTillTrain, "minutes");
var nextTrainFormat = moment(nextTrain).format('hh:mm');

database.ref('schedule').push({
    trainName: trainName,
    destination: destination,
    arrival: nextTrainFormat,
    frequency: frequency, 
    minsAway: timeTillTrain,

    });
});
 
database.ref('schedule').on('child_added',function(snapshot){
    trainNameData = snapshot.val().trainName;
    destinationData = snapshot.val().destination;
    arrivalTimeData = snapshot.val().arrival;
    frequencyData = snapshot.val().frequency;
    minsAwayData = snapshot.val().minsAway;

    //Data array
    var dataArray = [trainNameData, destinationData, frequencyData, arrivalTimeData, minsAwayData];
    var newTable = $('<tr>');
    for(var i = 0; i< dataArray.length; i++){
        var newTableData = $('<td>');
        newTableData.text(dataArray[i]);
        newTableData.appendTo(newTable);
    }	
    $('.table').append(newTable);
});

});
    


