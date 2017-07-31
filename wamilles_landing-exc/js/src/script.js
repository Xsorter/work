$(function(){
	
	var note = $('#note'),
		ts = new Date(2017, 8, 1),
		newYear = false;
	
	if((new Date()) > ts){
		// The new year is here! Count towards something else.
		// Notice the *1000 at the end - time must be in milliseconds
		ts = (new Date()).getTime() + 0*0*0*00*1000;
		newYear = false;
	}
		
	$('#countdown').countdown({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){
			
			var message = "";
			
			message += days + " дней" + ( days==1 ? '':'' ) + ", ";
			message += hours + " часов" + ( hours==1 ? '':'' ) + ", ";
			message += minutes + " минут" + ( minutes==1 ? '':'' ) + " и ";
			message += seconds + " секунд" + ( seconds==1 ? '':'' ) + " <br />";
			
			if(newYear){
				message += "left until the new year!";
			}
			else {
				message += "";
			}
			
			note.html(message);
		}
	});

	$('#countdown2').countdown({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){
			
			var message = "";
			
			message += days + " дней" + ( days==1 ? '':'' ) + ", ";
			message += hours + " часов" + ( hours==1 ? '':'' ) + ", ";
			message += minutes + " минут" + ( minutes==1 ? '':'' ) + " и ";
			message += seconds + " секунд" + ( seconds==1 ? '':'' ) + " <br />";
			
			if(newYear){
				message += "left until the new year!";
			}
			else {
				message += "";
			}
			
			note.html(message);
		}
	});



	
});
