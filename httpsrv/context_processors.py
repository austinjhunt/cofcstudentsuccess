from .models import *
def custom_context(request):
    #Meta.objects.all().delete()
    #Meta(site_title="Mize Music",navbar_title="Mize Music",footer_left="Jerry W. Mize is here to bring a little jazz into your life",
    #    column_left_color="bg-yankeesblue",column_mid_color="bg-upmaroon",column_right_color="bg-brownorange").save()
    site_title = Meta.objects.get(attribute_name="site_title")


    return {
        'authenticated': request.user.is_authenticated,
        'site_title': site_title,
        'superuser': request.user.is_superuser,
        'slider_items': SliderItem.objects.all()
    }