
<html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <title>GFG User Details</title>
    
      <!-- INCLUDING JQUERY-->
      <script src=
  "https://code.jquery.com/jquery-3.5.1.js">
      </script>
    
      <!-- CSS FOR STYLING THE PAGE -->
      <style>
          table {
              margin: 0 auto;
              font-size: large;
              border: 1px solid black;
          }
    
          h1 {
              text-align: center;
              color: #006600;
              font-size: xx-large;
              font-family: 'Gill Sans', 
                  'Gill Sans MT', ' Calibri', 
                  'Trebuchet MS', 'sans-serif';
          }
    
          td {
              background-color: #E4F5D4;
              border: 1px solid black;
          }
    
          th,
          td {
              font-weight: bold;
              border: 1px solid black;
              padding: 10px;
              text-align: center;
          }
    
          td {
              font-weight: lighter;
          }
      </style>
  </head>
    
  <body>
      <section>
          <h1>Restaurants details</h1>
    
          <!-- TABLE CONSTRUCTION-->
          <table id='table'>
              <!-- HEADING FORMATION -->
              <tr>
                  <th>Resturent Name</th>
                  <th>Reviews</th>
                  <th>Facilities</th>
                
                  
              </tr>
    
              <script>
                  $(document).ready(function () {
    
                      // FETCHING DATA FROM JSON FILE
                      $.getJSON("new.json", 
                              function (data) {
                          var student = '';
    
                          // ITERATING THROUGH OBJECTS
                          $.each(data, function (key, value) {
    
                              //CONSTRUCTION OF ROWS HAVING
                              // DATA FROM JSON OBJECT
                              student += '<tr>';
                              student += '<td>' + 
                                  value.name + '</td>';
    
                              student += '<td>' + 
                                  value.review + '</td>'
    
                              student += '<td>' + 
                                  value.types + '</td>';
                                
                              
                          });
                            
                          //INSERTING ROWS INTO TABLE 
                          $('#table').append(student);
                      });
                  });
              </script>
      </section>
  </body>
    
  </html>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          