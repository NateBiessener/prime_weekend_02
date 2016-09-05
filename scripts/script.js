console.log('script sourced');

var studentData = [];
var url = 'http://devjana.net/pi/pi_students.json';
var counter = 9;

$(document).ready(function(){
  console.log('jq works');
  //pulls students JSON file and puts into studentData, puts first student on DOM
  $.ajax({
    url: url,
    dataType: 'JSON',
    success: function(data){
      // console.log('in success');
      // console.log(data);
      studentData = data.students;
      // console.log(studentData);
      $('#outDiv').html('<p>' + studentData[0].first_name + ' ' + studentData[0].last_name + '</p><p>' + studentData[0].info + '</p><p>' + 1 + '/' + studentData.length + '</p>');
      $('#outDiv').data('position', 0);
      $('#nextBtn').remove();
      for (var i = 0; i < studentData.length; i++) {
        var studentButton = $('<button class="studentBtn" id="' + i + '">' + studentData[i].first_name + '</button>');
        studentButton.data('student', studentData[i]);
        $('#buttons').append(studentButton);
      }
      $('#buttons').append('<button id="nextBtn" onclick="nextStudent()">Next</button>');
      setInterval(function(){
        if (counter == 0) {
          // console.log(counter);
          nextStudent();
        }
        else {
          // console.log(counter);
          counter--;
        }
      },1000)//end interval
      //start onclick for individual buttons
      $( 'body' ).on( 'click', '.studentBtn', function(){
        counter = 9;
        var student = $(this).data('student');
        var id = $(this).attr('id');
        var newDisp = '<p>' + student.first_name + ' ' + student.last_name + '</p><p>' + student.info + '</p><p>' + (Number(id) + 1) + '/' + studentData.length + '</p>';
        $('#outDiv').fadeOut(400, function(){
          $('#outDiv').html(newDisp);
          $('#outDiv').data('position', id);
          $('#outDiv').fadeIn();
        })//end fadeOut
      });//end onclick
    }//end success callback
  });//end ajax call
})//end doc ready




var prevStudent = function(){
  counter = 9;
  var index = Number($('#outDiv').data('position'));
  if (index === 0) {
    var student = $('#' + (studentData.length - 1)).data('student');
    var newDisp = '<p>' + student.first_name + ' ' + student.last_name + '</p><p>' + student.info + '</p><p>' + (studentData.length) + '/' + studentData.length + '</p>';
    $('#outDiv').fadeOut(400, function(){
      $('#outDiv').html(newDisp);
      $('#outDiv').data('position', (studentData.length - 1));
      $('#outDiv').fadeIn(400);
    });
  }//end if
  else {
    var student = $('#' + (index - 1)).data('student');
    var newDisp = '<p>' + student.first_name + ' ' + student.last_name + '</p><p>' + student.info + '</p><p>' + index + '/' + studentData.length + '</p>';
    $('#outDiv').fadeOut(400, function(){
      $('#outDiv').html(newDisp);
      $('#outDiv').data('position', (index - 1));
      $('#outDiv').fadeIn(400);
    });
  }//end else
};//end lastPerson

var nextStudent = function(){
  counter = 9;
  var index = Number($('#outDiv').data('position'));
  if (index === studentData.length - 1) {
    var student = $('#' + 0).data('student');
    var newDisp = '<p>' + student.first_name + ' ' + student.last_name + '</p><p>' + student.info + '</p><p>1/' + studentData.length + '</p>';
    $('#outDiv').fadeOut(400, function(){
      $('#outDiv').html(newDisp);
      $('#outDiv').data('position', 0);
      $('#outDiv').fadeIn(400);
    });
  }//end if
  else {
    var student = $('#' + (index + 1)).data('student');
    var newDisp = '<p>' + student.first_name + ' ' + student.last_name + '</p><p>' + student.info + '</p><p>' + (index + 2) + '/' + studentData.length + '</p>';
    $('#outDiv').fadeOut(400, function(){
      $('#outDiv').html(newDisp);
      $('#outDiv').data('position', index + 1);
      $('#outDiv').fadeIn(400);
    });
  }//end else
};//end nextPerson

// first_name:
// info:
// last_name:
