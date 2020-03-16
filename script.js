$(document).ready(function(){

    // Identify the current hour
    var currentDatetime=Date();
    // format to display on the screen
    var currentDay=moment(currentDatetime).format('MMM DD, YYYY');
    // get the current hour
    var currentHour=moment(currentDatetime).format('HH');
    //const glformattedDate=moment(currentDay).format('DDMMYYYY');
    
    var storedData='';
    var glinputArray=[];  // This contains the data for the current day's diary

    const starthr=9;    // Start time for the diary
    const endhr=17;     // End time for the diary
    
    var thishour= parseInt(currentHour);  //changes this hour to an integer to allow easier comparisons




    // Setup the diary array to have the correct number of elements (1 for each hour)
    function setupInputArray(starthr,endhr){
        for (var i=starthr; i <= endhr; i++){
            glinputArray.push('');
        }
        return true;
    };


    // Update to the screen
    function updateCurrentDate(currentDay){
        $('#currentDay').text('Today is ' + currentDay);
    }

    // Get any diary information from Local Storage.  Returns the diary object if found.
    function getValuesFromLocalStorage(lsname="myDiaryEntries"){
        var localStorageValue=localStorage.getItem(lsname);
        if(localStorageValue!=undefined){
            var dataObj=JSON.parse(localStorageValue);
            //console.log(dataObj);
            return dataObj;
        };
    };
    
        
    function saveValuesToLocalStorage(whichDay=currentDay,lsName,data){
        console.log("Values to save:")
        console.log(whichDay);
        console.log(lsName);
        console.log(data);
        
        var diaryEntry={date:'', start_time: '', diary:['']};
        var dataObj= [diaryEntry];
        
        //get all values stored
        dataObj=getValuesFromLocalStorage(lsName);
        
        //filter to the current date
        diaryEntry=getDiaryData(dataObj); 
        
        //Replace current date's data with new data
        if (diaryEntry!= undefined){
            var whichelement = getElementNumber(dataObj,diaryEntry);
            console.log('found it in element ' + whichelement);

            dataObj[whichelement]={date:moment(whichDay).format('DDMMYYYY'),
                                    start_time: starthr,
                                    diary: data}  //Replace data with new information
        } else {
            dataObj=[{date:moment(whichDay).format('DDMMYYYY'),
                        start_time: starthr,
                        diary: data}]  //Add 1 element to new array
        };
        
        localStorage.setItem(lsName,JSON.stringify(dataObj));
        return true;

    };

    // Determine the position in the array corresponding to the current date and return the index. 
    // Returns -1 if not found.
    function getElementNumber(diaryObjArray,diaryEntryObj){
        
        var whichelement = diaryObjArray.findIndex(function(element,n,diaryEntryObj){
            return (element.date!=diaryEntryObj.date);
        });

        return whichelement;
    }

    // Extract the data for the current date if it exists
    function getDiaryData(dataObj){
        if(dataObj===null || dataObj=== undefined || dataObj.length==0){
            //Do nothing
            console.log("No data in local storage");
        } else {
            var diaryObj=jQuery.grep(dataObj,function(n,i,formattedDate){
                return (dataObj[i].date === formattedDate)
            },true);
            //console.log(diaryObj[0].diary);
            return diaryObj[0].diary;
        };
    };

    // Generate the html elements for the diary
    function createDiary(whichHour,dataobj){
        var pastpresentfuture='future';
        var lsobj=getDiaryData(dataobj);
        //console.log(lsobj);
        if (lsobj!= undefined) {
            glinputArray=lsobj  //Write the diary data from Local Storage to the diary variable
            //console.log(glinputArray);
         };

        for (var index = starthr; index <= endhr; index++) {
            var strIndex=index.toString().padStart(2,0);  // make the hour into a two digit string
            
            //Set up conditions based on current hour
            if(index<whichHour){
                pastpresentfuture='past'
            } else if (index===whichHour) {
                pastpresentfuture = 'present'
            } else {
               pastpresentfuture='future' 
            };

            var newDiarySlot=$('<div>');
            // Change the colors for the hours depending on whether is the current, pre or future by assigning different
            // classes to the rows
            switch (pastpresentfuture){
                case 'past':
                    newDiarySlot.attr('class','row past');
                    break;
                case 'present':
                    newDiarySlot.attr('class','row present');
                    break;
                case 'future':
                    newDiarySlot.attr('class','row future');
                    break;
                default:
                    newDiarySlot.attr('class','row');
                    break;
            }; 
            // Create a slot for each required diary entry
            newDiarySlot.attr('id',strIndex + 'AMrow');
            $('#plannerblock').append(newDiarySlot);

            // Setup up divs that will allow easier css formatting 
            // First the hour label   
            var newlabel = $('<div>');
            newlabel.attr('class','col col-md-2 hour')
                    .attr('id',strIndex + 'timenumb');
            var timeformat = moment(strIndex,'H').format('LT');
            newlabel.text(timeformat);
            $('#'+ strIndex + 'AMrow').append(newlabel);

            // Next setup the area where diary information will be entered.
            var newentry = $('<textarea>');
            // Change classes for the text area depending on the current time
            switch (pastpresentfuture){
                case 'past':
                    newentry.attr('class','col col-md-9 timeslot past');
                    break;
                case 'present':
                    newentry.attr('class','col col-md-9 timeslot present');
                    break;
                case 'future':
                    newentry.attr('class','col col-md-9 timeslot future');
                    break;
                default:
                    newentry.attr('class','col col-md-9 timeslot');
                    break;
            }; 
            console.log(index + ' : ' + glinputArray[index-starthr]);
            var thedata= glinputArray[index-starthr];
            
            newentry.attr('class','col col-md-9 timeslot')
                    .attr('id',strIndex + 'timeslot')
                    .attr('type','string');
            newentry.text(thedata);
            
           
            $('#'+ strIndex + 'AMrow').append(newentry);
            //console.log($('#'+ strIndex + 'AMrow').val());


            //Add the box that will contain the button 
            //A box was created to ensure the text couldn't write over/under the button
            var newbtnbox = $('<div>');
            newbtnbox.attr('class','col col-md-1 btnbox')
                    .attr('id',strIndex + 'btnbox');
            $('#'+ strIndex + 'AMrow').append(newbtnbox);

            //Add the Save button
            var newbtn = $('<button>');
            newbtn.attr('class','btn saveBtn')
                  .attr('id',strIndex + 'btn')
                  .prop('innerHTML','<i class="fas fa-save"></i>');  //save icon instead of text
            $('#'+ strIndex + 'btnbox').append(newbtn);
        }
    }

    //Function Calls start here

    setupInputArray(starthr,endhr);
    updateCurrentDate(currentDay);
    storedData=getValuesFromLocalStorage('myDiaryEntries');
    createDiary(thishour,storedData);


    //On-click events start here


    // On-click event for the set of savebuttons
    $('.saveBtn').on('click',function(){
        var whichbtn = event.target.id;
        var whichelement=whichbtn.substr(0,2) - starthr;

        // Replace the diary global variable with the new data
        glinputArray[whichelement]=$('#'+ whichbtn.substr(0,2) + 'timeslot').val();
        console.log(glinputArray);
        
        // Save the updated array to local storage
        saveValuesToLocalStorage(currentDatetime,"myDiaryEntries",glinputArray);
    });

    // This resizes each textarea based on the amount of text it contains
    $('textarea').each(function () {
        this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
      }).on('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
      });
});