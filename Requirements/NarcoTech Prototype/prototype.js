//prototype for appointment scheduler, using a JSON file rather than a database for storing appointment information.
//everything with a * would be done differently in a database

const fs = require('fs');//directory used to write to files in directory.*

//used for writing files in directory*
const finished = (error) => {
    if (error) {
        throw error;
    }
}

let dates = require('./data.json');//uses dates to hold to the data.json

let appointmentArr = dates.appointments;//sets appointMentArr object to the 'appointments' array of objects in dates

//cycles through the stored appointments, and prints the appointment information, the therapist involved and the date.
function checkDates(){
    let savedDate = ""; //date associated with database appointment.
    let savedTherapist = ""; //therapist associated with database appointment.
    for(let i=0;i<appointmentArr.length;i++){//cycles through database appointments
        savedTherapist = appointmentArr[i].doctor;
        savedDate = appointmentArr[i].date;
        console.log("You have an appointment with PhysioTherapist " +savedTherapist+" on the "+savedDate);//prints information about each database appointment
    }
    if (savedDate==""&&savedTherapist==""){
        console.log("You have no appointments.");
    }
}

//cycles through the stored appointments, searching for the inputted date 'x' and the therapist 'y'. Deletes appointments with a match.
function deleteDates(x,y){
    let savedDate = ""; //date associated with database appointment.
    let savedTherapist = ""; //therapist associated with database appointment.
    for(let i=0;i<appointmentArr.length;i++){//cycles through database appointments
        savedTherapist = appointmentArr[i].doctor;
        savedDate = appointmentArr[i].date;
        if (savedDate==x&&savedTherapist==y){//checks for database appointment matching information x and y
            appointmentArr.splice(i,1);//deletes appointment if it matches.
            break;
        }
    }
    let toSave = JSON.stringify(dates);//*converts js object to json format
    
    fs.writeFile('data.json',toSave,finished);//*updates json file
}

//attempts to add appointment with therapist 'userTherapist' on date 'userDate'. If there is already an appointment on date, doesn't add appointment.
function addDates(userDate,userTherapist){
    let foundDate = "";//hold date associated with conflicting appointment
    let foundTherapist = "";//holds therapist associated with conflicting appointment
    let dateTaken = false;//keeps track of if there is a conflict
    let savedDate = "";//date associated with database appointment
    let savedTherapist = "";//therapist associated with database appointment

    for(let i=0;i<appointmentArr.length;i++){//cycles through database appointments
        savedTherapist = appointmentArr[i].doctor;
        savedDate = appointmentArr[i].date;
        if (savedDate==userDate){//checks if database appointment information conflicts with new appointment being added
            dateTaken = true;//records conflict
            foundDate = savedDate;
            foundTherapist = savedTherapist
        }
    }
    if(dateTaken){//checks if a conflict was found, and if there is, doesn't add appointment
        console.log("The date "+foundDate+" is taken. You have an appointment with "+foundTherapist+".");//returns appointment information of conflicting appointment
        return;
    }
    const myApp = {doctor:userTherapist,date:userDate};//creates appointment object with user inputted information
    appointmentArr.push(myApp);//pushes appointment to the appointment array
    let toSave = JSON.stringify(dates);//*converts js object to json format

    fs.writeFile('data.json',toSave,finished);//*updates json file.

}

checkDates();
addDates("2/2/4","Dwayne");
checkDates();
deleteDates("2/2/4","Dwayne");
checkDates();