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
      $('#buttons').append('<button id="nextBtn" onclick="nextStudent()">Next</button>')
    }//end success callback
  });//end ajax call
})//end doc ready

var displayStudent = function(index){
  var newDisp = '<p>' + studentData[index].first_name + " " + studentData[index].last_name + '</p><p>' + studentData[index].info + '</p><p class="current" id="' + (index) + '">' + (index + 1) + "/" + studentData.length + '</p>'
  $('#outDiv').fadeOut(400,function(){
    $('#outDiv').html(newDisp);
    $('#outDiv').fadeIn(400);
  });
}

var prevStudent = function(){
  var index = Number($('.current').attr('id'));
  if (index === 0) {
    var newDisp = '<p>' + studentData[studentData.length - 1].first_name + " " + studentData[studentData.length - 1].last_name + '</p><p>' + studentData[studentData.length - 1].info + '</p><p class="current" id="' + (studentData.length - 1) + '">' + studentData.length + "/" + studentData.length + '</p>';
    $('#outDiv').fadeOut(400, function(){
      $('#outDiv').html(newDisp);
      $('#outDiv').fadeIn(400);
    });
  }//end if
  else {
    var newDisp = '<p>' + studentData[index - 1].first_name + " " + studentData[index - 1].last_name + '</p><p>' + studentData[index - 1].info + '</p><p class="current" id="' + (index - 1) + '">' + index + "/" + studentData.length + '</p>';
    $('#outDiv').fadeOut(400, function(){
      $('#outDiv').html(newDisp);
      $('#outDiv').fadeIn(400);
    });
  }//end else
};//end lastPerson

var nextStudent = function(){
  var index = Number($('.current').attr('id'));
  if (index === studentData.length - 1) {
    var newDisp = '<p>' + studentData[0].first_name + " " + studentData[0].last_name + '</p><p>' + studentData[0].info + '</p><p class="current" id="' + 0 + '">' + 1 + "/" + studentData.length + '</p>'
    $('#outDiv').fadeOut(400, function(){
      $('#outDiv').html(newDisp);
      $('#outDiv').fadeIn(400);
    });
  }//end if
  else {
    var newDisp = '<p>' + studentData[index + 1].first_name + " " + studentData[index + 1].last_name + '</p><p>' + studentData[index + 1].info + '</p><p class="current" id="' + (index + 1) + '">' + (index + 2) + "/" + studentData.length + '</p>'
    $('#outDiv').fadeOut(400, function(){
      $('#outDiv').html(newDisp);
      $('#outDiv').fadeIn(400);
    });
  }//end else
};//end nextPerson

// first_name:
// info:
// last_name:
