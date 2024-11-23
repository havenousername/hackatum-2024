from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID


# Customer Schema
class Customer(BaseModel):
    """
    Customer schema
    """
    id: UUID = Field(..., description="Customer ID")
    coordX: Optional[float] = Field(0, description="Customer X coordinate")
    coordY: Optional[float] = Field(0, description="Customer Y coordinate")
    destinationX: Optional[float] = Field(0, description="Customer destination X coordinate")
    destinationY: Optional[float] = Field(0, description="Customer destination Y coordinate")
    awaitingService: bool = Field(..., description="Whether the customer is awaiting service")


# Vehicle Schema
class Vehicle(BaseModel):
    """
    Vehicle schema
    """
    id: UUID = Field(..., description="Vehicle ID")
    coordX: float = Field(..., description="X Coordinate of the vehicle")
    coordY: float = Field(..., description="Y Coordinate of the vehicle")
    isAvailable: bool = Field(..., description="Availability of the vehicle")
    vehicleSpeed: Optional[float] = Field(0, description="Speed of the vehicle")
    customerId: Optional[UUID] = Field(None, description="ID of the customer assigned to the vehicle")
    remainingTravelTime: Optional[float] = Field(0, description="Remaining travel time for the vehicle")
    distanceTravelled: Optional[float] = Field(0, description="Total distance the vehicle has travelled")
    activeTime: Optional[float] = Field(0, description="Total active time of the vehicle")
    numberOfTrips: Optional[int] = Field(0, description="Total number of trips made by the vehicle")


# Scenario Schema
class Scenario(BaseModel):
    """
    Scenario schema
    """
    id: UUID = Field(..., description="Scenario ID")
    startTime: str = Field(..., description="Start time of the scenario")
    endTime: Optional[str] = Field(None, description="End time of the scenario")
    status: str = Field(..., description="Status of the scenario")
    vehicles: List[Vehicle] = Field(..., description="List of vehicles in the scenario")
    customers: List[Customer] = Field(..., description="List of customers in the scenario")


# VehicleUpdate Schema
class VehicleUpdate(BaseModel):
    """
    Vehicle update schema
    """
    id: UUID = Field(..., description="Vehicle ID")
    customerId: Optional[UUID] = Field(None, description="Assigned customer ID")


# UpdateScenario Schema
class UpdateScenario(BaseModel):
    """
    Update scenario schema
    """
    vehicles: List[VehicleUpdate] = Field(..., description="List of updated vehicles")
