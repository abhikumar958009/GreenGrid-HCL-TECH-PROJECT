from rest_framework import viewsets

from .models import EnergySource, EnergyBuilding, EnergyReading
from .serializers import (
    EnergySourceSerializer,
    EnergyBuildingSerializer,
    EnergyReadingSerializer,
)


# =========================
# RENEWABLE ENERGY
# =========================

class EnergySourceViewSet(viewsets.ModelViewSet):
    queryset = EnergySource.objects.all().order_by("id")
    serializer_class = EnergySourceSerializer


# =========================
# ENERGY MONITORING
# =========================

class EnergyBuildingViewSet(viewsets.ModelViewSet):
    queryset = EnergyBuilding.objects.all().order_by("id")
    serializer_class = EnergyBuildingSerializer


class EnergyReadingViewSet(viewsets.ModelViewSet):
    serializer_class = EnergyReadingSerializer

    def get_queryset(self):
        queryset = EnergyReading.objects.all().order_by("id")

        period = self.request.query_params.get("period")

        if period in ["week", "month", "year"]:
            queryset = queryset.filter(period=period)

        return queryset