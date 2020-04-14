
function change_state(e)
{
    let change_to_val;

    // Clicking on booked will take you to time-slot not available
    //
    if ($(e).hasClass('timeslot_booked'))
    {
        $(e).text("N/A");
        $(e).removeClass('btn-success');
        $(e).removeClass('timeslot_booked');
        $(e).addClass('timeslot_na');
        change_to_val = 0;
    }
        // Clicking on time-slot na will take you to available
    //
    else if ($(e).hasClass('timeslot_na'))
    {
        $(e).text("Available");
        $(e).removeClass('timeslot_na');
        $(e).addClass('timeslot_available');
        $(e).addClass('btn');
        $(e).addClass('btn-info');
        change_to_val = 1;
    }
        // Clicking on available will take you to booked
    //
    else if ($(e).hasClass('timeslot_available'))
    {
        $(e).text("Booked");
        $(e).removeClass('btn-info');
        $(e).removeClass('timeslot_available');
        $(e).addClass('timeslot_booked');
        $(e).addClass('btn');
        $(e).addClass('btn-success');
        change_to_val = 2;
    }

    $.ajax(
        {
            url: '/update_schedule_ajax/',
            type: "POST",
            data:
                {
                    time: $(e).data('time'),
                    date: $(e).data('date'),
                    change_to_val: change_to_val,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
            success: function(data)
            {
            },
        });

}


function submit_appointment_request(e)
{
    var date = "";
    var time = "";

    // This will need to change if we'll allow reserving more than one block
    //
    $('.btn-warning').each(function(i, obj) {
        date = $(obj).data('date');
        time = $(obj).data('time');
    });

    if ($("#appointment_name").val() != "" && $("#appointment_email").val() != "")
    {
        // Do the ajax here
        //
        $.ajax(
            {
                url: '/submit_appointment_request_ajax/',
                type: "POST",
                data:
                    {
                        name: $("#appointment_name").val(),
                        email: $("#appointment_email").val(),
                        date: date,
                        time: time,
                        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                    },
                success: function(data)
                {
                    console.log("Success!");
                },
            });

        $("#modal_generic").modal("show");
    }
}


function accept_request(request_id)
{
    $.ajax(
        {
            url: '/accept_request_ajax/',
            type: "POST",
            data:
                {
                    request_id:request_id,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
            success: function(data)
            {
                location.reload();
            },
        });
}


function schedule_block(e)
{
    // If another 30-minute slot was reserved, we unreserve it and make it
    // available
    //
    $('.btn-warning').each(function(i, obj) {
        $(obj).removeClass('btn-warning');
        $(obj).text('Available');
    });

    $(e).addClass('btn-warning');
    $(e).text("Requested");

    $("html, body").animate({ scrollTop: $(document).height() }, "slow", function () {
        $("#appointment_name").focus();
    });

    $("#appointment_block").fadeIn('slow');
    $("#appointment_title").text("You are requesting to schedule an appointment on " + $(e).data('day') + ", at " + $(e).data('time'))

}
