from rest_framework import serializers

from .models import (
    EnergySource,
    EnergyBuilding,
    EnergyReading,
)


# ==========================================
# RENEWABLE ENERGY SERIALIZER
# ==========================================

class EnergySourceSerializer(serializers.ModelSerializer):

    class Meta:
        model = EnergySource
        fields = "__all__"


# ==========================================
# ENERGY BUILDING SERIALIZER
# ==========================================

class EnergyBuildingSerializer(serializers.ModelSerializer):

    class Meta:
        model = EnergyBuilding
        fields = "__all__"


# ==========================================
# ENERGY READING SERIALIZER
# ==========================================

class EnergyReadingSerializer(serializers.ModelSerializer):

    class Meta:
        model = EnergyReading
        fields = "__all__"