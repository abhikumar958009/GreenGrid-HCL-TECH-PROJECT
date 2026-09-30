from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    EnergySourceViewSet,
    EnergyBuildingViewSet,
    EnergyReadingViewSet,
)


router = DefaultRouter()

router.register(
    r"energy-sources",
    EnergySourceViewSet,
    basename="energy-source",
)

router.register(
    r"buildings",
    EnergyBuildingViewSet,
    basename="energy-building",
)

router.register(
    r"readings",
    EnergyReadingViewSet,
    basename="energy-reading",
)


urlpatterns = [
    path("", include(router.urls)),
]