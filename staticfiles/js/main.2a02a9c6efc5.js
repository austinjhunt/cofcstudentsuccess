var superuser; 
function isMobile(){
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ;
}
$(document).ready(function(){
    // set the body's bottom padding equal to the height of the footer
    $('body').css({'padding-bottom':$('footer').height()*2});
    if (!isMobile()){
        // remove the navbuttontoggle button. remove the class collapse from the navbuttoncontainer
        $("#navtogglebuttoncontainer").remove(); 
        $("#navbuttoncontainer").toggleClass("col-12 collapse col-6 text-center text-right");
    }
    document.getElementById("navbar_title").addEventListener("input", function() {
        if (superuser){
            $.ajax({
                type: 'POST',
                url: '/update_title/',
                data: {
                    'new_title': $("#navbar_title").html()
                },
                success: function(){
                    document.title = $("#navbar_title").html();
                }
            })
        }
        else{
            console.log(superuser);
        }
    }, false);
    
});

