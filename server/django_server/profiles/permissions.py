from rest_framework import permissions

class IsWorker(permissions.BasePermission):  

    def has_object_permission(self, request, view, obj=None):
        # return True
        try: 
            # print(request.user.profiles == 1)
            # print(request.user.profile.isWorker == 0)
            # print(request.user.profile.isWorker.values())

            return request.user.profile.isWorker == 1
        except:
            return False