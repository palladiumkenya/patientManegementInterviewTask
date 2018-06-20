
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
function getAllRelationshipTypes(){

}
function getAllLocations(){

}
});
