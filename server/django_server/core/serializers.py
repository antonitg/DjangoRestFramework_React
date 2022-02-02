from rest_framework import serializers

class DynamicFieldsModelSerializer(serializers.ModelSerializer):

    def __init__(self, *args, **kwargs):

        fields = kwargs.pop('fields', None) # Prevent the serializer get the "fields" property

        # Instantiate the superclass normally <- Esto es una pirula que he trobat per ahi
        super().__init__(*args, **kwargs) 
        if fields is not None:
            allowed = set(fields) # Get the fields passed to the serializer
            existing = set(self.fields) # Get all the fields allowed by the Serializer
            errors = {'validatingErrors':[]} # Initialize errors empty object
            for validating in allowed:
                if kwargs.get('data').get(validating) == None: # Check if the data contains the fields allowed and are not empty.
                    errors["validatingErrors"].append({validating+"_error": validating+" is required."}) # Append the error
            if len(errors["validatingErrors"]) > 0: # Check if there are errors
                raise serializers.ValidationError(errors) # Throw errors
            for field_name in existing - allowed:
                self.fields.pop(field_name) # MODIFY THE FIELDS WITH THE ALLOWED ONES
            