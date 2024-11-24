from pydantic import BaseModel, Field
from typing import List, Optional

# CustomerDTO
class CustomerDTO(BaseModel):
    """
    The customer data transfer object
    """
    awaitingService: Optional[bool] = Field(None, description="Whether the customer is awaiting service")
    coordX: Optional[float] = Field(None, description="The X coordinate of the customer")
    coordY: Optional[float] = Field(None, description="The Y coordinate of the customer")
    destinationX: Optional[float] = Field(None, description="The X coordinate of the customer's destination")
    destinationY: Optional[float] = Field(None, description="The Y coordinate of the customer's destination")
    id: Optional[str] = Field(None, description="The unique ID of the customer")


# ResponseMessage
class ResponseMessage(BaseModel):
    """
    Response message structure
    """
    message: Optional[str] = Field(None, description="The response message")


# StandardMagentaVehicleDTO
class StandardMagentaVehicleDTO(BaseModel):
    """
    The vehicle data transfer object
    """
    activeTime: Optional[int] = Field(None, description="The active time of the vehicle")
    coordX: Optional[float] = Field(None, description="The X coordinate of the vehicle")
    coordY: Optional[float] = Field(None, description="The Y coordinate of the vehicle")
    customerId: Optional[str] = Field(None, description="The ID of the customer assigned to the vehicle")
    distanceTravelled: Optional[float] = Field(None, description="The total distance travelled by the vehicle")
    id: Optional[str] = Field(None, description="The unique ID of the vehicle")
    isAvailable: Optional[bool] = Field(None, description="Whether the vehicle is available")
    numberOfTrips: Optional[int] = Field(None, description="The number of trips the vehicle has completed")
    remainingTravelTime: Optional[int] = Field(None, description="The remaining travel time for the vehicle")
    vehicleSpeed: Optional[float] = Field(None, description="The speed of the vehicle")


# VehicleDataDto
class VehicleDataDto(BaseModel):
    """
    The vehicle data transfer object
    """
    id: Optional[str] = Field(None, description="The unique ID of the vehicle")
    totalTravelTime: Optional[int] = Field(None, description="The total travel time of the vehicle")
    totalTrips: Optional[int] = Field(None, description="The total number of trips completed by the vehicle")
    travelTimes: Optional[str] = Field(None, description="The travel times of the vehicle as a string")


# ScenarioDTO
class ScenarioDTO(BaseModel):
    """
    The scenario data transfer object
    """
    customers: Optional[List[CustomerDTO]] = Field(None, description="List of customers in the scenario")
    endTime: Optional[str] = Field(None, description="The end time of the scenario")
    id: Optional[str] = Field(None, description="The unique ID of the scenario")
    startTime: Optional[str] = Field(None, description="The start time of the scenario")
    status: Optional[str] = Field(None, description="The status of the scenario")
    vehicles: Optional[List[StandardMagentaVehicleDTO]] = Field(None, description="List of vehicles in the scenario")


# ScenarioMetadataDTO
class ScenarioMetadataDTO(BaseModel):
    """
    The scenario metadata data transfer object
    """
    endTime: Optional[str] = Field(None, description="The end time of the scenario")
    id: Optional[str] = Field(None, description="The unique ID of the scenario")
    startTime: Optional[str] = Field(None, description="The start time of the scenario")
    status: Optional[str] = Field(None, description="The status of the scenario")
    vehicleData: Optional[List[VehicleDataDto]] = Field(None, description="Metadata about the vehicles in the scenario")


# Customer Schema
class Customer(BaseModel):
    """
    Customer schema
    """
    id: Optional[str] = Field(None, description="Customer ID")
    coordX: Optional[float] = Field(None, description="Customer X coordinate")
    coordY: Optional[float] = Field(None, description="Customer Y coordinate")
    destinationX: Optional[float] = Field(None, description="Customer destination X coordinate")
    destinationY: Optional[float] = Field(None, description="Customer destination Y coordinate")
    awaitingService: Optional[bool] = Field(None, description="Whether the customer is awaiting service")


# Vehicle Schema
class Vehicle(BaseModel):
    """
    Vehicle schema
    """
    id: Optional[str] = Field(None, description="Vehicle ID")
    coordX: Optional[float] = Field(None, description="X Coordinate of the vehicle")
    coordY: Optional[float] = Field(None, description="Y Coordinate of the vehicle")
    isAvailable: Optional[bool] = Field(None, description="Availability of the vehicle")
    vehicleSpeed: Optional[float] = Field(None, description="Speed of the vehicle")
    customerId: Optional[str] = Field(None, description="ID of the customer assigned to the vehicle")
    remainingTravelTime: Optional[float] = Field(None, description="Remaining travel time for the vehicle")
    distanceTravelled: Optional[float] = Field(None, description="Total distance the vehicle has travelled")
    activeTime: Optional[float] = Field(None, description="Total active time of the vehicle")
    numberOfTrips: Optional[int] = Field(None, description="Total number of trips made by the vehicle")


# Scenario Schema
class Scenario(BaseModel):
    """
    Scenario schema
    """
    id: Optional[str] = Field(None, description="Scenario ID")
    startTime: Optional[str] = Field(None, description="Start time of the scenario")
    endTime: Optional[str] = Field(None, description="End time of the scenario")
    status: Optional[str] = Field(None, description="Status of the scenario")
    vehicles: Optional[List[Vehicle]] = Field(None, description="List of vehicles in the scenario")
    customers: Optional[List[Customer]] = Field(None, description="List of customers in the scenario")


# VehicleUpdate Schema
class VehicleUpdate(BaseModel):
    """
    Vehicle update schema
    """
    id: Optional[str] = Field(None, description="Vehicle ID")
    customerId: Optional[str] = Field(None, description="Assigned customer ID")


# UpdateScenario Schema
class UpdateScenario(BaseModel):
    """
    Update scenario schema
    """
    vehicles: Optional[List[VehicleUpdate]] = Field(None, description="List of updated vehicles")
