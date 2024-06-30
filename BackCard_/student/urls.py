from django.urls import path
from . import views

urlpatterns = [
	path('get/', views.FetchData),
	path('sessionData/', views.GetSession)
]