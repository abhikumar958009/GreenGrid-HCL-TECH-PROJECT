from django.db import models


# ==========================================
# RENEWABLE ENERGY
# ==========================================

class EnergySource(models.Model):

    SOURCE_TYPES = [
        ("solar", "Solar"),
        ("wind", "Wind"),
        ("battery", "Battery"),
        ("substation", "Substation"),
    ]

    name = models.CharField(max_length=100)

    source_type = models.CharField(
        max_length=20,
        choices=SOURCE_TYPES
    )

    output = models.CharField(
        max_length=50,
        blank=True
    )

    capacity = models.CharField(
        max_length=50,
        blank=True
    )

    efficiency = models.CharField(
        max_length=20,
        blank=True
    )

    status = models.CharField(
        max_length=30,
        default="Active"
    )

    description = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.name


# ==========================================
# ENERGY MONITORING - BUILDINGS
# ==========================================

class EnergyBuilding(models.Model):

    STATUS_CHOICES = [
        ("Normal", "Normal"),
        ("High", "High"),
        ("Low", "Low"),
    ]

    name = models.CharField(
        max_length=100
    )

    consumption = models.FloatField(
        default=0
    )

    # Period-wise consumption
    week_consumption = models.FloatField(
        default=0
    )

    month_consumption = models.FloatField(
        default=0
    )

    year_consumption = models.FloatField(
        default=0
    )

    efficiency = models.FloatField(
        default=0
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Normal"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.name


# ==========================================
# ENERGY MONITORING - READINGS
# ==========================================

class EnergyReading(models.Model):

    PERIOD_CHOICES = [
        ("week", "This Week"),
        ("month", "This Month"),
        ("year", "This Year"),
    ]

    day = models.CharField(
        max_length=20
    )

    consumption = models.FloatField(
        default=0
    )

    period = models.CharField(
        max_length=20,
        choices=PERIOD_CHOICES,
        default="week"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.day} - {self.consumption} kWh"