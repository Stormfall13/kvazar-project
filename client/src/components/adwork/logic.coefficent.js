

var datessheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("contol_dates");
var counter_last = datessheet.getLastRow(); 
for (var cycle = 2; cycle <= counter_last; cycle = cycle + 1){
    var current_date = spreadsheet.getRange(current,1,1,1);
    var check_date = datessheet.getRange(cycle,2,1,1); 
    if ((current_date.getValue() < check_date.getValue())){
    spreadsheet.getRange(current,41,1,1).setValue(datessheet.getRange(cycle,1,1,1).getValue());
    break;
    }
}

// ЛОГИКА ДО ОПТИМИЗАЦИИ НА ПЕРВУЮ ПРОВЕРКУ
// useEffect(() => {

    
    // const noType = 1.5
    // const mediumType = 4
    // const workType = 8
    
    
//     if (typeTest === 'Первая' && typeWork === "Не типовая" && amount === "1-2"){
//         setPoint(16 * noType)
//     } 
//     if (typeTest === 'Первая' && typeWork === "Не типовая" && amount === "3-5"){
//         setPoint(16 * mediumType)
//     } 
//     if (typeTest === 'Первая' && typeWork === "Не типовая" && amount === "6 и более"){
//         setPoint(16 * workType)
//     } 
    
//     if (typeTest === 'Первая' && typeWork === "Средняя" && amount === "1-2"){
//         setPoint(8 * noType)
//     } 
//     if (typeTest === 'Первая' && typeWork === "Средняя" && amount === "3-5"){
//         setPoint(8 * mediumType)
//     } 
//     if (typeTest === 'Первая' && typeWork === "Средняя" && amount === "6 и более"){
//         setPoint(8 * workType)
//     } 
    
//     if (typeTest === 'Первая' && typeWork === "Типовая" && amount === "1-2"){
//         setPoint(4 * noType)
//     } 
//     if (typeTest === 'Первая' && typeWork === "Типовая" && amount === "3-5"){
//         setPoint(4 * mediumType)
//     }
//     if (typeTest === 'Первая' && typeWork === "Типовая" && amount === "6 и более"){
//         setPoint(4 * workType)
//     }
    

// })