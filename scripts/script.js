console.log('script sourced');

// var studentData = [];
var url = 'http://devjana.net/pi/pi_students.json';
var counter = 9;

$(document).ready(function(){
  console.log('jq works');
  $.ajax({
    url: url,
    dataType: 'JSON',
    success: function(data){
      // console.log('in success');
      // console.log(data);
      //display first student and add it's position to #outDiv's data attr
      $('#outDiv').html('<p>' + data.students[0].first_name + ' ' + data.students[0].last_name + '</p><p>' + data.students[0].info + '</p><p>' + 1 + '/' + data.students.length + '</p>');
      $('#outDiv').data('position', 0);
      //remove 'next' button to be added back after all other buttons
      $('#nextBtn').remove();
      //add button for each student, and store object data within each button
      for (var i = 0; i < data.students.length; i++) {
        var studentButton = $('<button class="studentBtn" id="' + i + '">' + data.students[i].first_name + '</button>');
        studentButton.data('student', data.students[i]);
        $('#buttons').append(studentButton);
      }
      //add 'next' button back to DOM
      $('#buttons').append('<button id="nextBtn" onclick="nextStudent()">Next</button>');
      //calls nextStudent every 10 seconds, unless a button was clicked - counter gets reset
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
        //variables for readability
        var student = $(this).data('student');
        var id = $(this).attr('id');
        //build new display html
        var newDisp = '<p>' + student.first_name + ' ' + student.last_name + '</p><p>' + student.info + '</p><p>' + (Number(id) + 1) + '/' + $('.studentBtn').length + '</p>';
        //fadeOut #outDiv, change its html and data, then fadeIn
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
  //if at start, use last student
  if (index === 0) {
    var student = $('#' + ($('.studentBtn').length - 1)).data('student');
    var newDisp = '<p>' + student.first_name + ' ' + student.last_name + '</p><p>' + student.info + '</p><p>' + ($('.studentBtn').length) + '/' + $('.studentBtn').length + '</p>';
    //fadeOut, update #outDiv, fadeIn
    $('#outDiv').fadeOut(400, function(){
      $('#outDiv').html(newDisp);
      $('#outDiv').data('position', ($('.studentBtn').length - 1));
      $('#outDiv').fadeIn(400);
    });
  }//end if
  else {
    //use previous student
    var student = $('#' + (index - 1)).data('student');
    var newDisp = '<p>' + student.first_name + ' ' + student.last_name + '</p><p>' + student.info + '</p><p>' + index + '/' + $('.studentBtn').length + '</p>';
    //fadeOut, update #outDiv, fadeIn
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
  //if at end of students, use first student
  if (index === $('.studentBtn').length - 1) {
    var student = $('#' + 0).data('student');
    var newDisp = '<p>' + student.first_name + ' ' + student.last_name + '</p><p>' + student.info + '</p><p>1/' + $('.studentBtn').length + '</p>';
    //fadeOut, update #outDiv, fadeIn
    $('#outDiv').fadeOut(400, function(){
      $('#outDiv').html(newDisp);
      $('#outDiv').data('position', 0);
      $('#outDiv').fadeIn(400);
    });
  }//end if
  else {
    //use next student
    var student = $('#' + (index + 1)).data('student');
    var newDisp = '<p>' + student.first_name + ' ' + student.last_name + '</p><p>' + student.info + '</p><p>' + (index + 2) + '/' + $('.studentBtn').length + '</p>';
    //fadeOut, update #outDiv, fadeIn
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
