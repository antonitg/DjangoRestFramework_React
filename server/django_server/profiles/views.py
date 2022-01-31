from rest_framework import status, generics, viewsets
from .seralizers import TransactionsSerializer, ProfileSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Profile, Transactions
from rest_framework.response import Response

# Create your views here.
class TransactionsViewSet(viewsets.GenericViewSet):  # <- Definir els mixins 
    serializer_class = TransactionsSerializer
    permission_classes = [IsAuthenticated,]

    def history(self, request):
        queryset = Transactions.objects.filter(user = request.user.id)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



    def create(self, request):
        serializer_data = {
            'user': request.user.id,
            'amount': request.data.get('amount')
        }
        serializer = self.serializer_class(data=serializer_data)
        serializer.is_valid()
        serializer.create(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
class ProfileViewSet(viewsets.GenericViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_money(self,request):
        queryset = Profile.objects.filter(user = request.user.id).first()
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)
