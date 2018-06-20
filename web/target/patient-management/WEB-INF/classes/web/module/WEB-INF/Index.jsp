<!DOCTYPE html>
<html>

   <head>
      <title>Patient Records Application</title>
      <meta name = "viewport" content = "width = device-width, initial-scale = 1.0">
        <link href = "resources/bootstrap/css/bootstrap.min.css" rel = "stylesheet">
      <script type='text/javascript' src = "resources/js/jquery/jquery.js"></script>
      <script type='text/javascript' src = "resources/bootstrap/js/bootstrap.min.js"></script>
      <script type='text/javascript' src = "resources/js/custom.js"></script>
   </head>
   <body>
   <div class="container">
   <ul id = "homeTab" class = "nav nav-tabs">
      <li class = "active">
         <a href = "#patient" data-toggle = "tab">Patient</a>
      </li>
      <li>
         <a href = "#county" data-toggle = "tab">County</a>
      </li>
      <li>
         <a href = "#subcounty" data-toggle = "tab">Sub County</a>
      </li>
      <li>
         <a href = "#ward" data-toggle = "tab">ward</a>
      </li>
      <li>
         <a href = "#village" data-toggle = "tab">Village</a>
      </li>
      <li>
         <a href = "#relationship" data-toggle = "tab">Relationship Types</a>
      </li>

   </ul>
   <div id = "myTabContent" class = "tab-content">
       <div class = "tab-pane fade in active" id = "patient">
         <h2>Patient Registration Page</h2>
       <form class="form-inline" >
        <div class="form-group">
          <label for="search">Search Patient</label>
          <input type="search" class="form-control" id="search" placeholder="Type patient name or identifier">
        </div>
        <button type="submit" class="btn btn-default">Search</button>
      </form>
       <form>
        <div class="form-group">
          <label for="fname">First Name:</label>
          <input type="fname" class="form-control" id="fname">
        </div>
        <div class="form-group">
           <label for="lname">Last Name:</label>
           <input type="lname" class="form-control" id="lname">
           </div>
        <div class="form-group">
          <label for="gender">Gender:</label>
          <input type="gender" class="form-control" id="gender">
        </div>
        <h2>Location</h2>
        <div class="form-group">
         <label for="person_county">County:</label>
          <input type="text" class="form-control" id="person_county" name="person_county">
        </div>
        <div class="form-group">
         <label for="person_subcounty">Sub-County:</label>
          <input type="text" class="form-control" id="person_subcounty" name="person_subcounty">
        </div>
        <div class="form-group">
         <label for="person_ward">Ward:</label>
          <input type="text" class="form-control" id="person_ward" name="person_ward">
        </div>
        <div class="form-group">
         <label for="person_village">Village:</label>
          <input type="text" class="form-control" id="person_village" name="person_village">
        </div>
        <h2>Contact</h2>
        <div class="form-group">
         <label for="cellphone">Cell Phone:</label>
          <input type="text" class="form-control" id="cellphone" name="cellphone">
        </div>
        <div class="form-group">
         <label for="email">Email:</label>
          <input type="text" class="form-control" id="email" name="email">
        </div>
        <div class="form-group">
         <label for="other_number">Alternative Cell Phone:</label>
          <input type="text" class="form-control" id="other_number" name="other_number">
        </div>
        <h2>Relationship</h2>
        <div class="form-group">
         <label for="location">Person:</label>
          <input type="text" class="form-control" id="person" name="person">
        </div>
        <div class="form-group">
         <label for="relationship_type">Location:</label>
          <input type="text" class="form-control" id="relationship_type" name="relationship_type">
        </div>
        <h2>Enrollment</h2>
        <div class="form-group">
         <label for="enrollment_date">Enrollment Date:</label>
          <input type="text" class="form-control" id="enrollment_date" name="enrollment_date">
        </div>
        <div class="form-group">
         <label for="enrollment_number">Enrollment Number:</label>
          <input type="text" class="form-control" id="enrollment_number" name="enrollment_number">
        </div>
       <button type="submit" class="btn btn-default">Save</button>
      </form>
      </div>

   <div class = "tab-pane fade" id = "county">
   <h2>County Details</h2>
    <form id="countyFrm" name="countyFrm">
     <div class="form-group">
       <label for="county">County:</label>
       <input type="text" class="form-control" id="county" name="county">
     </div>
       <button type="submit" class="btn btn-default" id="countyBtn">Save</button>
   </form>
   </div>

   <div class = "tab-pane fade" id = "subcounty">
   <h2>Sub County Details</h2>
    <form id="subCountyFrm" name="subCountyFrm">
     <div class="form-group">
       <label for="subcounty">Sub County:</label>
       <input type="text" class="form-control" id="subcounty" name="subcounty">
     </div>
       <button type="submit" class="btn btn-default" id="subCountyBtn">Save</button>
   </form>
   </div>

   <div class = "tab-pane fade" id = "relationship">
   <h2>Relationship Types</h2>
       <form id="relationshipFrm" name="relationshipFrm">
     <div class="form-group">
       <label for="a_to_b">Relationship A:</label>
       <input type="text" class="form-control" id="a_to_b" name="a_to_b">
     </div>
     <div class="form-group">
       <label for="b_to_a">Relationship B:</label>
       <input type="text" class="form-control" id="b_to_a" name="b_to_a">
     </div>
     <button type="submit" class="btn btn-default" id="relationshipType">Save</button>
    </form>
   </div>

   <div class = "tab-pane fade" id = "ward">
   <h2>Ward Details</h2>
   <form id="wardFrm" name="wardFrm">
    <div class="form-group">
      <label for="ward">Ward:</label>
      <input type="text" class="form-control" id="ward" name="ward">
    </div>
      <button type="submit" class="btn btn-default" id="wardBtn">Save</button>
  </form>
   </div>


   <div class = "tab-pane fade" id = "village">
   <h2>Village Details</h2>
   <form id="villageFrm" name="villageFrm">
    <div class="form-group">
      <label for="village">Village:</label>
      <input type="text" class="form-control" id="village" name="village">
    </div>
      <button type="submit" class="btn btn-default" id="villageBtn">Save</button>
  </form>
   </div>

      </div>
      </div>
   </body>
</html>
