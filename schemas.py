from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID


# CustomerDTO
class CustomerDTO(BaseModel):
    """
    The customer data transfer object
    """
    awaitingService: bool = Field(..., description="Whether the customer is awaiting service")
    coordX: float = Field(..., description="The X coordinate of the customer")
    coordY: float = Field(..., description="The Y coordinate of the customer")
    destinationX: float = Field(..., description="The X coordinate of the customer's destination")
    destinationY: float = Field(..., description="The Y coordinate of the customer's destination")
    id: UUID = Field(..., description="The unique ID of the customer")


# ResponseMessage
class ResponseMessage(BaseModel):
    """
    Response message structure
    """
    message: str = Field(..., description="The response message")


# StandardMagentaVehicleDTO
class StandardMagentaVehicleDTO(BaseModel):
    """
    The vehicle data transfer object
    """
    activeTime: int = Field(..., description="The active time of the vehicle")
    coordX: float = Field(..., description="The X coordinate of the vehicle")
    coordY: float = Field(..., description="The Y coordinate of the vehicle")
    customerId: UUID = Field(..., description="The ID of the customer assigned to the vehicle")
    distanceTravelled: float = Field(..., description="The total distance travelled by the vehicle")
    id: UUID = Field(..., description="The unique ID of the vehicle")
    isAvailable: bool = Field(..., description="Whether the vehicle is available")
    numberOfTrips: int = Field(..., description="The number of trips the vehicle has completed")
    remainingTravelTime: int = Field(..., description="The remaining travel time for the vehicle")
    vehicleSpeed: float = Field(..., description="The speed of the vehicle")


# VehicleDataDto
class VehicleDataDto(BaseModel):
    """
    The vehicle data transfer object
    """
    id: UUID = Field(..., description="The unique ID of the vehicle")
    totalTravelTime: int = Field(..., description="The total travel time of the vehicle")
    totalTrips: int = Field(..., description="The total number of trips completed by the vehicle")
    travelTimes: str = Field(..., description="The travel times of the vehicle as a string")


# ScenarioDTO
class ScenarioDTO(BaseModel):
    """
    The scenario data transfer object
    """
    customers: List[CustomerDTO] = Field(..., description="List of customers in the scenario")
    endTime: str = Field(..., description="The end time of the scenario")
    id: UUID = Field(..., description="The unique ID of the scenario")
    startTime: str = Field(..., description="The start time of the scenario")
    status: str = Field(..., description="The status of the scenario")
    vehicles: List[StandardMagentaVehicleDTO] = Field(..., description="List of vehicles in the scenario")


# ScenarioMetadataDTO
class ScenarioMetadataDTO(BaseModel):
    """
    The scenario metadata data transfer object
    """
    endTime: str = Field(..., description="The end time of the scenario")
    id: UUID = Field(..., description="The unique ID of the scenario")
    startTime: str = Field(..., description="The start time of the scenario")
    status: str = Field(..., description="The status of the scenario")
    vehicleData: List[VehicleDataDto] = Field(..., description="Metadata about the vehicles in the scenario")
