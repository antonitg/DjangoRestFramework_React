from rest_framework import permissions

class IsWorker(permissions.BasePermission):  
    message = 'You are not a worker'
    def has_permission(self, request, view):
        try: 
            # print(request.user.profiles == 1)
            # print(request.user.profile.isWorker == 0)
            # print(request.user.profile.isWorker.values())

            return request.user.profile.isWorker == 1
        except:
            return False