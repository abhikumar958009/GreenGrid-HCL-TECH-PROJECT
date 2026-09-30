from django.contrib import admin

from .models import (
    EnergySource,
    EnergyBuilding,
    EnergyReading,
)


@admin.register(EnergySource)
class EnergySourceAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "source_type",
        "output",
        "capacity",
        "efficiency",
        "status",
    )


@admin.register(EnergyBuilding)
class EnergyBuildingAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "consumption",
        "efficiency",
        "status",
    )


@admin.register(EnergyReading)
class EnergyReadingAdmin(admin.ModelAdmin):
    list_display = (
        "day",
        "consumption",
        "period",
        "created_at",
    )