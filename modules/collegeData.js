const fs = require('fs');
const path = require('path');

// Define the Data class
class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

// Declare the dataCollection variable
let dataCollection = null;

// Function to read JSON file and parse it
function readJSONFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(`unable to read ${filePath}`);
                return;
            }
            try {
                resolve(JSON.parse(data));
            } catch (e) {
                reject(`unable to parse ${filePath}`);
            }
        });
    });
}

// initialize function
function initialize() {
    return new Promise((resolve, reject) => {
        readJSONFile(path.join(__dirname, '../data/students.json'))
            .then(studentData => {
                return readJSONFile(path.join(__dirname, '../data/courses.json'))
                    .then(courseData => {
                        dataCollection = new Data(studentData, courseData);
                        resolve();
                    });
            })
            .catch(err => {
                reject(err);
            });
    });
}

// getAllStudents function
function getAllStudents() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.students.length > 0) {
            resolve(dataCollection.students);
        } else {
            reject("no results returned");
        }
    });
}

// getTAs function
function getTAs() {
    return new Promise((resolve, reject) => {
        const TAs = dataCollection ? dataCollection.students.filter(student => student.TA) : [];
        if (TAs.length > 0) {
            resolve(TAs);
        } else {
            reject("no results returned");
        }
    });
}

// getCourses function
function getCourses() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.courses.length > 0) {
            resolve(dataCollection.courses);
        } else {
            reject("no results returned");
        }
    });
}

// Export the functions
module.exports = {
    initialize,
    getAllStudents,
    getTAs,
    getCourses
};