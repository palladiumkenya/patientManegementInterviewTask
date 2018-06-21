
$(document).ready(function(){
$( "#countyFrm" ).submit(function( event ) {
  event.preventDefault();
  var form = $(this).serializeArray();
 console.log("county form data +++++++++++++"+JSON.stringify(form));
 $.ajax({
            type: "POST",
            url: "saveCounty.form",
            data:{form:JSON.stringify(form)},
            success: function (result) {
              console.log("response from saveCounty "+result);
            }
        })
});

$( "#subCountyFrm" ).submit(function( event ) {
  event.preventDefault();
  var form = $(this).serializeArray();
 console.log("sub county form data +++++++++++++"+JSON.stringify(form));
 $.ajax({
            type: "POST",
            url: "saveSubCounty.form",
            data:{form:JSON.stringify(form)},
            success: function (result) {
              console.log("response from save subcounty "+result);
            }
        })
});


$( "#wardFrm" ).submit(function( event ) {
  event.preventDefault();
  var form = $(this).serializeArray();
 console.log("ward form data +++++++++++++"+JSON.stringify(form));
 $.ajax({
            type: "POST",
            url: "saveWard.form",
            data:{form:JSON.stringify(form)},
            success: function (result) {
              console.log("response from save ward "+result);
            }
        })
});

$( "#villageFrm" ).submit(function( event ) {
  event.preventDefault();
  var form = $(this).serializeArray();
 console.log("village form data +++++++++++++"+JSON.stringify(form));
 $.ajax({
            type: "POST",
            url: "saveVillage.form",
            data:{form:JSON.stringify(form)},
            success: function (result) {
              console.log("response from save village "+result);
            }
        })
});

$( "#relationshipFrm" ).submit(function( event ) {
  event.preventDefault();
  var form = $(this).serializeArray();
 console.log("relationship type form data +++++++++++++"+JSON.stringify(form));
 $.ajax({
            type: "POST",
            url: "saveRelationshipType.form",
            data:{form:JSON.stringify(form)},
            success: function (result) {
              console.log("response from save relationship type "+result);
            }
        })
});

$( "#patientFrm" ).submit(function( event ) {
  event.preventDefault();
  var form = $(this).serializeArray();
 console.log("patient form data +++++++++++++"+JSON.stringify(form));
 $.ajax({
            type: "POST",
            url: "savePatient.form",
            data:{form:JSON.stringify(form)},
            success: function (result) {
              console.log("response from save patient"+result);
            }
        })
});

function getAllCounties(){
  $.ajax({
             type: "GET",
             url: "getAllCounties.form",
             success: function (result) {
               var result=JSON.parse(result);
               var counties=result.counties;
               console.log("response from get all counties "+JSON.stringify(counties));
               var i;
               for(i=0; i<counties.length; i++){
                 var newOption = $('<option value="'+counties[i].name+'">'+counties[i].name+'</option>');
                 $('#person_county').append(newOption);
               }
             }
         })
}

function getAllSubCounties(){
  $.ajax({
             type: "GET",
             url: "getAllSubCounties.form",
             success: function (result) {
               var result=JSON.parse(result);
               var subcounties=result.subcounties;
               console.log("response from get all subcounties "+JSON.stringify(subcounties));
               var i;
               for(i=0; i<subcounties.length; i++){
                 var newOption = $('<option value="'+subcounties[i].name+'">'+subcounties[i].name+'</option>');
                 $('#person_subcounty').append(newOption);
               }
             }
         })
}
function getAllWards(){
  $.ajax({
             type: "GET",
             url: "getAllWards.form",
             success: function (result) {
               var result=JSON.parse(result);
               var wards=result.wards;
               console.log("response from get all wards "+JSON.stringify(wards));
               var i;
               for(i=0; i<wards.length; i++){
                 var newOption = $('<option value="'+wards[i].name+'">'+wards[i].name+'</option>');
                 $('#person_ward').append(newOption);
               }
             }
         })
}
function getAllVillages(){
  $.ajax({
             type: "GET",
             url: "getAllVillages.form",
             success: function (result) {
               var result=JSON.parse(result);
               var villages=result.villages;
               console.log("response from get all villages "+JSON.stringify(villages));
               var i;
               for(i=0; i<villages.length; i++){
                 var newOption = $('<option value="'+villages[i].name+'">'+villages[i].name+'</option>');
                 $('#person_village').append(newOption);
               }
             }
         })
}
getAllCounties();
getAllSubCounties();
getAllWards();
getAllVillages();
});
