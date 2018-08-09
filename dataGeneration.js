let fs = require('fs');

let generateBookedDate = (firstIdNumber) => {
  const yearOptions = ['2016', '2017', '2018'];
  const monthOptions = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const monthOptions2018 = monthOptions.slice(0, 7);
  const days31Options = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25','26', '27', '28', '29', '30', '31'];
  const days30Options = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25','26', '27', '28', '29', '30'];
  const days28Options = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25','26', '27', '28'];
  const days29Options = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25','26', '27', '28', '29'];
  let randomVal = Math.floor(Math.random()* 4 + 1);
  let apptsPerDay = [];
    for (var i = 0; i < randomVal; i++) { // generates each individual
      let randomYear = Math.floor(Math.random() *  yearOptions.length);
      let randomMonth = Math.floor(Math.random() * monthOptions.length);
      let yearChoice = yearOptions[randomYear];
      let monthChoice = monthOptions[randomMonth];
      let randomStay = Math.floor(Math.random() * 14 + 2);
      let dayChoice, checkOut, checkIn; 
      //Check which month were in to determine number of days as an option
      if (yearChoice === '2016' && monthChoice === '02') { //Leap Year
        let randomDay = Math.floor(Math.random() *  days29Options.length);
        dayChoice = days29Options[randomDay];
        checkIn = `${yearChoice}-${monthChoice}-${dayChoice}`;
        if (Number(dayChoice) + randomStay > 29) { //Goes into next Month
          monthChoice = '03';
          daysLeft = Number(dayChoice) + randomStay - 29;
          dayChoice = `${daysLeft}`;
          if (daysLeft < 10) {
            dayChoice = `0${daysLeft}`;
          }
          checkOut = `${yearChoice}-${monthChoice}-${dayChoice}`;
        } 
        else { // doesn't go into next month
          daysLeft = Number(dayChoice) + randomStay;
          dayChoice = `${daysLeft}`
          if (daysLeft < 10) {
            dayChoice = `0${daysLeft}`;
          }
          checkOut = `${yearChoice}-${monthChoice}-${dayChoice}`;
        } 
      } else if (monthChoice === '01' || monthChoice === '03' || monthChoice === '05' || monthChoice === '07' || monthChoice === '08' || monthChoice === '10') { //months that have 31 days
        let randomDay = Math.floor(Math.random() *  days31Options.length);
        dayChoice = days31Options[randomDay];
        checkIn = `${yearChoice}-${monthChoice}-${dayChoice}`;
        if (Number(dayChoice) + randomStay > 31) {
          newMonth = Number(monthChoice) + 1;
          monthChoice = `${newMonth}`;
          if (newMonth < 10) {
            monthChoice = `0${newMonth}`;
          }
          if (Number(dayChoice) + randomStay - 31 < 10) {
            daysLeft = Number(dayChoice) + randomStay - 31;
            dayChoice = `${daysLeft}`;
            if (daysLeft < 10) {
              dayChoice = `0${daysLeft}`;
            }

          } else {
            daysLeft = Number(dayChoice) + randomStay - 31;
            dayChoice = `${daysLeft}`;
            if (daysLeft < 10) {
              dayChoice = `0${daysLeft}`;
            }
          }
          checkOut = `${yearChoice}-${monthChoice}-${dayChoice}`;
        } else {
          daysLeft = Number(dayChoice) + randomStay;
          dayChoice = `${daysLeft}`
          if (daysLeft < 10) {
            dayChoice = `0${daysLeft}`;
          }
          checkOut = `${yearChoice}-${monthChoice}-${dayChoice}`;
        }
      } else if (monthChoice ===  '02') {
        let randomDay = Math.floor(Math.random() *  days28Options.length);
        dayChoice = days28Options[randomDay];
        checkIn = `${yearChoice}-${monthChoice}-${dayChoice}`;
        if (Number(dayChoice) + randomStay > 28) { //Goes into next Month
          monthChoice = '03';
          daysLeft = Number(dayChoice) + randomStay - 28;
          dayChoice = `${daysLeft}`;
          if (daysLeft < 10) {
            dayChoice = `0${daysLeft}`;
          }
          checkOut = `${yearChoice}-${monthChoice}-${dayChoice}`;
        } 
        else { // doesn't go into next month
          daysLeft = Number(dayChoice) + randomStay;
          dayChoice = `${daysLeft}`
          if (daysLeft < 10) {
            dayChoice = `0${daysLeft}`;
          }
          checkOut = `${yearChoice}-${monthChoice}-${dayChoice}`;
        } 
      } else if (monthChoice === '04'|| monthChoice === '06'|| monthChoice === '09'|| monthChoice === '11') {
        let randomDay = Math.floor(Math.random() *  days30Options.length);
        dayChoice = days30Options[randomDay];
        checkIn = `${yearChoice}-${monthChoice}-${dayChoice}`;
        if (Number(dayChoice) + randomStay > 30) {
          newMonth = Number(monthChoice) + 1;
          monthChoice = `${newMonth}`;
          if (newMonth < 10) {
            monthChoice = `0${newMonth}`;
          }
          if (Number(dayChoice) + randomStay - 30 < 10) {
            daysLeft = Number(dayChoice) + randomStay - 30;
            dayChoice = `${daysLeft}`;
            if (daysLeft < 10) {
              dayChoice = `0${daysLeft}`;
            }
          } else {
            daysLeft = Number(dayChoice) + randomStay - 30;
            dayChoice = `${daysLeft}`;
            if (daysLeft < 10) {
              dayChoice = `0${daysLeft}`;
            }
          }
          checkOut = `${yearChoice}-${monthChoice}-${dayChoice}`;
        }
        else {
          daysLeft = Number(dayChoice) + randomStay;
          dayChoice = `${daysLeft}`
          if (daysLeft < 10) {
            dayChoice = `0${daysLeft}`;
          }
          checkOut = `${yearChoice}-${monthChoice}-${dayChoice}`;
        }
      } else if (monthChoice === '12') {
        let randomDay = Math.floor(Math.random() *  days31Options.length);
        dayChoice = days31Options[randomDay];
        checkIn = `${yearChoice}-${monthChoice}-${dayChoice}`;
        if (Number(dayChoice) + randomStay > 31) { //Goes into next Month
          monthChoice = '01';
          daysLeft = Number(dayChoice) + randomStay - 31;
          newYear = Number(yearChoice) + 1;
          dayChoice = `${daysLeft}`;
          yearChoice = `${newYear}`;
          if (daysLeft < 10) {
            dayChoice = `0${daysLeft}`;
          }
          checkOut = `${yearChoice}-${monthChoice}-${dayChoice}`;
        } 
        else { // doesn't go into next month
          daysLeft = Number(dayChoice) + randomStay;
          dayChoice = `${daysLeft}`
          if (daysLeft < 10) {
            dayChoice = `0${daysLeft}`;
          }
          checkOut = `${yearChoice}-${monthChoice}-${dayChoice}`;
        } 
      }
      //  //TO SEND AS OBJECT
      let id = Number(`${firstIdNumber}${i}`);
      let appt = {
        'stayLength': randomStay,
        'checkIn': checkIn,
        'checkOut': checkOut,
        'id': id
      }
      // ---------------------------
      // // TO SEND AS ARRAY
      // let appt = [checkIn, checkOut];
      //  --------------------------
      apptsPerDay.push(appt);
    }
  return apptsPerDay;
}

let generateBookedDates = (set) => { //set = 1, 2, 3, or 4
  let results = [];
  for (let i = 1 + (1000000 * (set-1)); i <= (1000000 * set); i+=1) {
    let obj = {};
    let temp = generateBookedDate(i);
    obj['listingId'] = i;
    obj['appts'] = temp;
    // console.log(temp, 'temp');
    // console.log(obj.appts[0].stayLength);
    results.push(obj);
  }
  return results;
}

let generateNames = () => {
  let guyNames = [ "Santo", "Kip", "Benton", "Randolph", "Kory", " Dirk", "Bernard", "Buddy", "Odis", "Doug", "Roland", "Levi", "Omar", "Jerrell", "Elmer", "Eddie", "Alton", "Pierre", "Marcus", "Lloyd", "Drew", "Darrell", "Dalton", "Denny", "Willie", "Malcom", "Jeffry", "Eduardo", "Numbers", "Humberto", "Jorge", "Chet", "Elvis", "Dale", "Hilton", "Milford", "Eldon", "Trent", "Matthew", "Jackson", "Denis", "Jeffrey", "Shane", "John", "Bradley", "Nathaniel", "Nick", "Connor", "Larry", "Alejandro"];
  let girlNames = ["Michelina", "Junie", "Claris", "Shavon", "Lakenya", "Arline", "Farrah", "Love", "Sabrina", "Nikia", "Jessia", "Maya", "Theodora", "Lavinia", "Maritza", "Vella", "Karolyn", "Willa", "Concetta", "Terese", "Verena", "Fannie", "Tamala", "Ariane", "Yasuko", "Carolin", "Mildred", "Tien", "Heide", "Shanae", "Leora", "Sabra", "Yoko", "Sofia", "Cyndy", "Jani", "Lacey", "Misha", "Zenia", "Caryn", "Stephaine", "Shauna", "Angelena", "Katheryn", "Candyce", "Risa", "Lesha", "Jacquline", "Hellen", "Zina"];
  let firstNames = guyNames.concat(girlNames);
  let lastNames = ["Mcclain", "Nixon", "Robertson", "Cabrer", "Fox", "Baldwin", "Farmer", "Pierce", "Barron", "Gonzales", "Browning", "Rhodes", "Luna", "Bradford", "Choi", "Ballard", "Terrell Peters", "Aguirre", "Davis", "Strickland", "Herrera", "Pollard", "Rosario", "Dixon", "Hood", "Tyler", "Lindsey", "Campbell", "Tapia", "Fletcher", "Golden", "Wade", "Kaiser", "Joyce", "Ryan", "Sullivan", "Faulkner", "Montgomery", "Escobar", "Yoder", "Frye", "Henderson", "Winters", "Allen", "Velez", "Moyer", "Cochran", "Frederick", "Copeland", "Hebert", "Reese", "Williams", "Hartman", "Nunez", "Nolan", "Yang", "White", "Snow", "Hodges", "Doyle", "Thomas", "Duffy", "Shepherd", "Hammond", "Kelley", "Byrd", "Davila", "Rice", "Huber", "McCullough", "Bright", "Owen", "Day", "Greene", "Gutierrez", "Farley", "Washington", "Rodriguez", "Green", "Lambert", "Murphy", "Lynch", "Mcneil", "Waller", "Brady", "Warren", "Flowers", "Walsh", "Skinner", "Mccann", "Conner", "Parrish", "Norton", "Pearson", "Adams", "Middleton", "Sloan", "Yu", "Obrien", "pereira"];
  let generatePeople = function(arr1, arr2) {
    let results = [];
    for (let i = 0; i < arr1.length; i++) {
      for (let j =0; j < arr2.length; j++) {
        let fullName = `${arr1[i]} ${arr2[j]}`;
        results.push(fullName);
      }
    }
    return results;
  }
  generatePeople(firstnames, lastNames);
}
let getNumbers = () => {
  let options = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let results = [];
  let recurse = (combination = [])=> {
    if (combination.length === 3) {
      results.push(combination);
      return;
    } else {
      for (var i = 0; i < options.length; i++) {
        numberSelected = options[i];
        recurse(combination.concat(numberSelected));
      }
    }
  }
  recurse();
  return results;
}
let generateUsers = () => { //gets 1024000 users (id 1 --> 1024000)
  let results = [];
  let adjectives = ["new", "good", "high", "old", "great", "big", "American", "small", "large", "national", "young", "different", "black", "long", "little", "important", "political", "bad", "white", "real", "best", "right", "social", "only", "public", "sure", "low", "early", "able", "human", "local", "late", "hard", "major", "better", "economic", "strong", "possible", "whole", "free", "military", "true", "federal", "international", "full", "special", "easy", "clear", "recent", "certain", "personal", "open", "red", "difficult", "available", "likely", "short", "single", "medical", "current", "wrong", "private", "past", "foreign", "fine", "common", "poor", "natural", "significant", "similar", "hot", "dead", "central", "happy", "serious", "ready", "simple", "left", "physical", "general", "environmental", "financial", "blue", "democratic", "dark", "various", "entire", "close", "legal", "religious", "cold", "final", "main", "green", "nice", "huge", "popular", "traditional", "cultural", "frugal"];
  let numbers = getNumbers();
  let nouns = ["dog", "cat", "fish", "axolotal", "dwaf puffer", "degu", "rat", "hedgehog", "ferit", "chinchiller", "mouse", "crab", "rabbit", "hamster", "geko", "spider", "larva”, “dragon", "tortoise", "turtal", "snake", "hawk", "squied", "gerbil", "oto", "slug", "snaile", "worm", "ant", "horse", "squirle", "centopide", "grub", "crocodile", "alagator", "stag", "cuttle fish", "shark", "pigione", "quaile", "whale", "duck", "gose", "sea goal", "tuna", "lion", "tiger", "bear", "zebra", "gazell0 toad", "newt", "deer", "panda", "leprd", "bass", "panth", "gorrila", "chimp", "sloth", "elephant", "camal", "hourse", "lama", "emu", "ostrage", "wolf", "girrafe", "rino", "finch", "camen", "pytone", "wood pecker", "eagle", "bosk momoture", "owl", "dionasours", "savage", "snake", "dapinyer", "lema", "ota", "chickin", "pig", "cow", "goat", "scorpione", "bats", "moles", "shrew", "racoon", "possome", "butter fly", "raptor", "camelione", "cockroatches", "salamander", "boar", "cat", "wasp", "bee", "trout"];
  let id = 1;
  for (var i = 0; i < /*adjectives.length*/32; i++) {
    for (var j = 0; j < /*nouns.length*/32; j++) {
      for (var k =0; k < numbers.length; k++) {
        let user = {};
        let username = [adjectives[i], nouns[j], numbers[k].join('')].join('');
        user = {
          id: id,
          username: username
        }
        id++;
        results.push(user);
      }
    }
  }
  return results;
}

let generateIds = () => {
  var results = [];
  for (var i =0; i < 10000000; i++) {
    results.push(i);
  }
  return results
}

let generateReservation = (bookedDates) => {
  console.log(' | bookedDates', bookedDates);
  let reservations = [];
  let count = 1;
  for (let i = 0; i < bookedDates.length; i++) {
    for (var j = 0; j < bookedDates[i].appts.length; j++) {
      count++;
      let booked_date_id = bookedDates[i].appts[j].id;
      let user_id = Math.floor(1 + Math.random() * 1024000);
      let adults = Math.floor(Math.random() * 5 + 1);
      let puppies = Math.floor(Math.random() * 5 + 1);
      let charge = (bookedDates[i].appts[j].stayLength * 100) -1;
      let createdAt = bookedDates[i].appts[j].checkIn;
      let slice = createdAt.slice(4);
      createdAt = `${-1 + Number(createdAt.slice(0, 4))}`;
      createdAt = createdAt + slice;
      let reservation = {
        user_id: user_id,
        adults: adults,
        puppies: puppies,
        charge: charge,
        createdAt: createdAt,
        booked_date_id: booked_date_id
      };
      console.log(reservation);
      reservations.push(reservation);
    }
  }
  return reservations;
}






// let ids = generateIds();
// console.log(ids);
// let users = generateUsers();
// console.log(users.length, 'users');
// let people = generatePeople();
let bookedDates = generateBookedDates(1);
console.log(bookedDates)
// let bookedDates2 = generateBookedDates(2);
// console.log(bookedDates);
// console.log(bookedDates2);
   // let reservations = generateReservation(bookedDates);
// let numbers = getNumbers();
// console.log(numbers)

// console.log('done');

