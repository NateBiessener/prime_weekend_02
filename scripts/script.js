console.log('script sourced');

$(document).ready(function(){
  console.log('jq works');
})

var url = 'http://devjana.net/pi/pi_students.json';

$.ajax({
  url: url,
  dataType: 'JSON',
  success: function(data){
    console.log('in sucess');
    console.log(data);
    for (var i = 0; i < data.students.length; i++) {
      console.log(data.students[i]);
    }
  }

});
