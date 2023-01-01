import fs from "fs";
import { type } from "os";
import readline from "readline";
import RegisterData from "./rfo1.json" assert { type: "json" };
// console.log(RegisterData)

// import ExamData from './clear.json' assert {type:"json"};
// console.log(ExamData)
// GetData with utiscode which in school
const getutiswithschoolwhichinschool = (school, data) => {
  const UtisData = [];
  for (let i of data) {
    if (i["imtahan kecirilecek mekteb"] === school) {
      UtisData.push(i["utis_code"]);
    }
  }
  return UtisData;
};
// console.log(getutiswithschoolwhichinschool("Gəncə şəhər S.Vəliyev adına 34 saylı tam orta məktəb",RegisterData["Ümumi"]))
// GetData for name of school and exam
const getdatafromresult = (school, data) => {
  const ExamForSchool = [];
  for (let i of data) {
    if (i["imtahan kecirilecek mekteb"] === school) {
      ExamForSchool.push(i);
    }
  }
};
// GetData for name of school and register
const getdatafromregister = (school, data) => {
  const RegisterForSchool = [];
  for (let i of data) {
    if (i["imtahan kecirilecek mekteb"] === school) {
      RegisterForSchool.push(i);
    }
  }
  return RegisterForSchool;
};
// console.log(getdatafromregister("S.Bəhlulzadə adına Xarici dillər təmayüllü gimnaziya",RegisterData["Ümumi"]))
let array = fs.readFileSync("./umumidata.txt").toString().split("\n");
const DetectLineWithProblems = (line) => {
  if (
    line[66] === "K" ||
    line[66] === "Q" ||
    line[66] === "*" ||
    line[66] === "-" ||
    line[66] === " "
  ) {
    return true;
  }
  return false;
};
const FindNumOfWrong = (data) => {
  let num = 0;
  const problems = [];
  for (let i of data) {
    if (DetectLineWithProblems(i) === false) {
      num += 1;
      problems.push(i);
    }
  }
  return problems;
};
// for(let i of FindNumOfWrong(array)){
//   console.log(i)
// }

// console.log(DetectLineWithProblems("FATiMW      sABANOVA      QABiL      134943310A AA102030708162161 QAEABEA ADDEEDDBBCEEBEECEA"))
// Write data to file
const writedatatojsonfile = (file, data) => {
  const jsonString = JSON.stringify(data);
  fs.writeFile(file, jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
};
// WriteData to txt file
const writedatatotxtfile = (file, data) => {
  const jsonString = JSON.stringify(data);
  fs.writeFile(file, jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
};
// seperate one line of txt file:
// let result = text.slice(x, y); x daxildir y daxil deil y-1
const seperate = (line) => {
  const Ad = line.slice(0, 12);
  const Soyad = line.slice(12, 26);
  const Ata = line.slice(26, 37);
  const Utis = line.slice(37, 44);
  const Sinif = line.slice(44, 46);
  const SinifIndex = line[46];
  const TestVariant = line[47];
  const Bölmə = line[48];
  const Fənn = line[49];
  const MəktəbKodu = line.slice(50, 55);
  const Telefon = line.slice(55, 65);
  const Qrup = line[65];
  const Cins = line[66];
  const Cavablar = line.slice(67, 92);

  const TələbəData = {
    Ad: Ad,
    Soyad: Soyad,
    Ata: Ata,
    Utis: Utis,
    Sinif: Sinif,
    SinifIndex: SinifIndex,
    TestVariant: TestVariant,
    Bolme: Bölmə,
    Fenn: Fənn,
    MktbKodu: MəktəbKodu,
    Telefon: Telefon,
    Qrup: Qrup,
    Cins: Cins,
    Cavablar: Cavablar,
  };
  return TələbəData;
};
// console.log(seperate(array[0]))
// GettAllDataFromTxtToArray
const converttoobjandpusharray = (array) => {
  const ArrayWithObj = [];
  for (let i of array) {
    ArrayWithObj.push(seperate(i));
  }
  return ArrayWithObj;
};
// console.log(converttoobjandpusharray(array))

// Change Alphabet
const ChangeText = (val) => {
  if (val === "W") {
    return "Ə";
  } else if (val === "i") {
    return "İ";
  } else if (val === "s") {
    return "Ş";
  } else if (val === "g") {
    return "Ğ";
  } else if (val === "o") {
    return "Ö";
  } else if (val === "c") {
    return "Ç";
  } else if (val === "u") {
    return "Ü";
  } else {
    return val;
  }
};
const RepairString = (text) => {
  const arr = [];
  for (let i of String(text)) {
    arr.push(i);
  }
  const neww = arr.map((val) => ChangeText(val));
  return neww.join("");
};

const RepairData = (data) => {
  const values = Object.values(data);
  const keys = Object.keys(data);

  const neww = values.map((val) => RepairString(val));
  for (let i = 0; i < values.length; i++) {
    data[`${keys[i]}`] = neww[i];
    // console.log(keys[i], neww[i]);
  }
  return data;
};
const RepairAllData = (alldata) => {
  for (let i of alldata) {
    RepairData(i);
  }
  return alldata;
};
// console.log(RepairAllData(data));
const creatclearjson = (file, data) => {
  const jsonString = JSON.stringify(RepairAllData(data));
  fs.writeFile(file, jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
};
// First must be work this function
// writedatatojsonfile('./converted.json',converttoobjandpusharray(array));
// Then open of comment under the code close comment of above this line function
import data from "./converted.json" assert { type: "json" };
// console.log(data)
// for(let i of data){

// }

// Then must be work this function for work open comment
// creatclearjson('./clear.json',data);
// then delete clear.json and converted.json then add new json as rfo1.json then return same process
const findclass = (data) => {
  const empty = 0;
  const utises = [];
  for (let i of data) {
    if (i["Sinif"] === "") {
      utises.push(i["Utis"]);
    }
  }
  return utises;
};
const findsubject = (data) => {
  const empty = 0;
  const utises = [];
  for (let i of data) {
    if (i["Fenn"] === "") {
      utises.push(i["Utis"]);
    }
  }
  return utises;
};
const findvariant = (data) => {
  const empty = 0;
  const utises = [];
  for (let i of data) {
    if (i["Bolme"] === "") {
      utises.push(i["Utis"]);
    }
  }
  return utises;
};
const checkcahrarr = (char, arr) => {
  for (let i of arr) {
    if (i === char) {
      return true;
    }
  }
  return false;
};
// console.log(checkcahrarr("1",["1","4","4","0"]))
// Find Utis
const validateutis = (utis) => {
  const utis_chars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  for (let i of utis) {
    if (utis_chars.includes(i) === false) {
      return false;
    }
  }
  return true;
};
// console.log(validateutis("124494"))
const findutis = (data) => {
  const empty = 0;
  const utises = [];
  for (let i of data) {
    if (i["Utis"].length < 7 || validateutis(i["Utis"]) === false) {
      utises.push(i);
    }
  }
  return utises;
};
// console.log(findutis(data))
// writedatatojsonfile('./ProblemsInKonul.json',findutis(data));
const GetUtisInRegister = (data) => {
  const utises = [];
  for (let i of data) {
    utises.push(i["utis_code"]);
  }
  return utises;
};
// console.log(GetUtisInRegister(RegisterData["Ümumi"]))
const GetUtisİnExams = (data) => {
  const utises = [];
  for (let i of data) {
    utises.push(i.Utis);
  }
  return utises;
};
// console.log(GetUtisİnExams(data))
const CheckUtis = (utis, data) => {
  for (let i of data) {
    if (String(i) === utis) {
      return true;
    }
  }
  return false;
};
const CheckUtisBetweenTwoData = (utis, data1, data2) => {
  if (CheckUtis(utis, data1) && CheckUtis(utis, data2)) {
    return true;
  }
  return false;
};
// console.log(CheckUtisBetweenTwoData(1,[1,2,3],[1,4,1]))
const GetUtisWhichInExamsNotInRegister = (dataregister, dataexams) => {
  const Illegal = [];
  for (let i of dataexams) {
    if (CheckUtis(i, dataregister) === false) {
      Illegal.push(i);
    }
  }
  return Illegal;
};
// console.log(GetUtisWhichInExamsNotInRegister(GetUtisInRegister(RegisterData["Ümumi"]),GetUtisİnExams(data)))
// const problems_utis = GetUtisWhichInExamsNotInRegister(GetUtisInRegister(RegisterData["Ümumi"]),GetUtisİnExams(data))
// writedatatotxtfile('./utiselnmerzays.txt',problems_utis)

// similarity percentage between two utiscode




const ElnMerAysUtisesWithProblems = [
  "2680676",
  "2372213",
  "1829894",
  "2341020",
  "1846006",
  "2097789",
  "1603345",
  "1485369",
  "2167843",
  "1800578",
  "1544102",
  "1549099",
  "1543103",
  "1801845",
  "1801480",
  "1550628",
  "2985789",
  "1575719",
  "1303830",
  "1277060",
  "3471453",
  "1387549",
  "1149981",
  "1151180",
  "0308155",
  "1229593",
  "2324433",
  "2*28692",
  "2276511",
  "2*24812",
  "1511200",
  "2329023",
  "2334408",
  "1202977",
  "2180849",
  "1901014",
  "1990092",
  "2506711",
  "1463360",
  "0466513",
  "1886171",
  "1859033",
  "2144244",
  "1966686",
  "2411435",
  "2805906",
  "1894763",
  "1649251",
  "0411993",
  "0900310",
  "1551041",
  "0466346",
  "1472504",
  "0607600",
  "0631103",
  "0443442",
  "0579430",
  "0910252",
  "2593306",
  "0920100",
  "2143115",
  "2025576",
  "1336052",
  "2484330",
  "2453351",
  "0457234",
  "2088180",
  "1909443",
  "2552618",
  "2333035",
  "1078161",
  "1623294",
  "1367587",
  "1180770",
];
const KonulutisesWithProblems = [
  "1137690",
"2081851",
"2097428",
"1086090",
"1081474",
"2398926",
"1157534",
"1142078",
"2497894",
"1224017",
"2023552",
"1232430",
"1270567",
"2505373",
"0364848",
"0844501",
"2440265",
"2080488",
"2580219",
"2162070",
"2046590",
"2866670",
"2887578",
"1800677",
"2500582",
"1908816",
"2039304",
"1624905",
"1664991",
"2024409",
"2378078",
"1505653",
"1590540",
"0483406",
"2488969",
"2690685",
"0910139",
"1606000",
"2150182",
"1515101",
"1553455",
"1577555",
"1469021",
"2495303",
"1916523",
"2599686",
"2407891",
"1094972",
"2490514",
"2133927",
"2158879",
"2067115",
"1064468",
"3217763",
"2070556",
"1981163",
"1927272",
"2505578",
"1922063",
"0619640",
"1574478",
"2402117",
"1509036",
"2439636",
"1900946",
"2578130",
"1953152",
"1403808",
"1993155",
"1828768",
"1758505",
"2060470",
"1569178",
"2042579",
"2776119",
"1421842",
"0941448",
"1657330",
"1914844",
"0226957",
"0964903",
"0903130",
"1512500",
"0994042",
"2324406",
"2108092",
]
// console.log(KonulutisesWithProblems[4])

const SolvePercentage = (utis1, utis2) => {
  // utis1 persentage of utis2
  let different_character = 0;
  const loop = utis1.length;
  for (let i = 0; i < loop; i++) {
    if (utis1[i] !== utis2[i]) {
      different_character += 1;
    }
  }
  return 100*(7-different_character)/7;
};
const AllUtisCodesInRegister = GetUtisInRegister(RegisterData["Ümumi"]);
// console.log(AllUtisCodesInRegister);
const GetPercentageList = (currentdata,registerdata) => {
  const percentage = [];
  const Illegal = [];
  for(let i=0;i<currentdata.length;i++){
    percentage.push([])
    for(let j of registerdata){
      if(SolvePercentage(currentdata[i],String(j))>85){
        percentage[i].push(currentdata[i],j)
      }
      
    }
  }
  return percentage 
}
// console.log(GetPercentageList(ElnMerAysUtisesWithProblems,AllUtisCodesInRegister))
for(let i of GetPercentageList(ElnMerAysUtisesWithProblems,AllUtisCodesInRegister)){
  console.log(i)
}
// console.log(Get)
// console.log(GetUtisInRegister(RegisterData["Ümumi"]))