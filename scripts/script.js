console.log('script sourced');

var studentData = [];
var url = 'http://devjana.net/pi/pi_students.json';

$(document).ready(function(){
  console.log('jq works');
  //pulls students JSON file and puts into studentData, puts first student on DOM
  $.ajax({
    url: url,
    dataType: 'JSON',
    success: function(data){
      console.log('in sucess');
      // console.log(data);
      studentData = data.students;
      console.log(studentData);
      $('#outDiv').html('<p>' + studentData[0].first_name + " " + studentData[0].last_name + '</p><p>' + studentData[0].info + '</p><p class="current" id="' + 0 + '">' + 1 + "/" + studentData.length + '</p>');
      $('#nextBtn').remove();
      for (var i = 0; i < studentData.length; i++) {
        var studentButton = '<button onclick="displayStudent(' + i + ')">' + studentData[i].first_name + '</button>'
        $('#buttons').append(studentButton);
      }
      $('#buttons').append('<button id="nextBtn" onclick="nextPerson()">Next</button>')
    }//end success callback
  });//end ajax call
})//end doc ready

var lastPerson = function(){
  var index = Number($('.current').attr('id'));
  if (index === 0) {
    $('#outDiv').html('<p>' + studentData[studentData.length - 1].first_name + " " + studentData[studentData.length - 1].last_name + '</p><p>' + studentData[studentData.length - 1].info + '</p><p class="current" id="' + (studentData.length - 1) + '">' + studentData.length + "/" + studentData.length + '</p>');
  }//end if
  else {
    $('#outDiv').html('<p>' + studentData[index - 1].first_name + " " + studentData[index - 1].last_name + '</p><p>' + studentData[index - 1].info + '</p><p class="current" id="' + (index - 1) + '">' + index + "/" + studentData.length + '</p>');
  }//end else
};//end lastPerson

var nextPerson = function(){
  var index = Number($('.current').attr('id'));
  if (index === studentData.length - 1) {
    $('#outDiv').html('<p>' + studentData[0].first_name + " " + studentData[0].last_name + '</p><p>' + studentData[0].info + '</p><p class="current" id="' + 0 + '">' + 1 + "/" + studentData.length + '</p>');
  }//end if
  else {
    $('#outDiv').html('<p>' + studentData[index + 1].first_name + " " + studentData[index + 1].last_name + '</p><p>' + studentData[index + 1].info + '</p><p class="current" id="' + (index + 1) + '">' + (index + 2) + "/" + studentData.length + '</p>');
  }//end else
};//end nextPerson

var displayStudent = function(index){
  $('#outDiv').html('<p>' + studentData[index].first_name + " " + studentData[index].last_name + '</p><p>' + studentData[index].info + '</p><p class="current" id="' + (index) + '">' + (index + 1) + "/" + studentData.length + '</p>');
}
// first_name:"Will"
// info:"aka Mr. 5/4"
// last_name:"Cruzen"
