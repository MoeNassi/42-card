from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
import requests, json

# Create your views here.
def	FetchData(request):
	if request.method == 'GET':
		url = 'https://api.intra.42.fr/oauth/token'
		body = {
			"grant_type" : "authorization_code",
			"client_id" : "u-s4t2ud-70a340a6617a9722976d0ee642b6b45a291170f0f81c7ab5e27b97fc15040263",
			"client_secret" : "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",
			"redirect_uri" : "http://localhost:8000/get/",
			"code" : request.GET.get('code')
		}
		resp = requests.post(url, data=body)
		if (resp.status_code != 200):
			return redirect('http://localhost:5173/?status=access_denied', status_code=403)
		authz = resp.json()['access_token']
		return redirect(f'http://localhost:5173/?access={authz}')
	else:
		return redirect('http://localhost:5173/?status=method_not_allowed', status_code=405)

def GetSession(request):
	try:
		access = request.GET.get('access')
		if not access:
			return JsonResponse({'status': 'Unauthorized'}, status=401)
		Headers = {'Authorization': f'Bearer {access}'}
		resp2 = requests.get('https://api.intra.42.fr/v2/me/', headers=Headers)
		if resp2.status_code != 200:
			return JsonResponse({'status': 'Unauthorized'}, status=401)
		data = resp2.json()
		return JsonResponse(data)
	except requests.exceptions.JSONDecodeError as e:
		error_message = {
			"error": "Failed to decode JSON response",
			"message": str(e),
			"response_text": resp2.text
		}
		return JsonResponse(error_message, status=500)