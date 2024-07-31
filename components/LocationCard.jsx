"use client"
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { XIcon } from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import { setDestination, setRadius, setSavedLocations,removeSavedLocation } from "@/store/slices/locationSlice";
import axios from "axios";

const LocationCard = ({ id, name, address,radius, coordinates, status }) => {
  const dispatch = useDispatch();
  const savedLocations = useSelector((state) => state.locations.savedLocations);

  const handleCardClick = () => {
    if (coordinates) {
      const [lat, lng] = coordinates.split(",").map(Number);
      dispatch(setDestination([lat, lng]));
      dispatch(setRadius(radius)); // Set a default radius or fetch it from state if needed
    }
  };

  const handleRemoveLocation = async (id) => {
    try {
      const response = await axios.delete('/api/locations', {
        data: { id: id }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting location:', error);
    }
    dispatch(removeSavedLocation(id));
    setSavedLocations(savedLocations);
  };

  return (
    <div className="border-none hover:opacity-90 hover:border-white hover:border-[1px] transition ease-in-out">
      <Card onClick={handleCardClick} className="cursor-pointer">
        <CardHeader>
          <CardTitle>{name || "Location Name"}</CardTitle>
          <CardDescription>{coordinates || "Coordinates"}</CardDescription>
          <CardDescription>{status || "Status"}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Radius: {(radius/1000).toFixed(3)}km</p>
        </CardContent>
        <CardFooter className="flex flex-row-reverse ">
          <XIcon onClick={(e) => { e.stopPropagation(); handleRemoveLocation(id); }} className="hover:opacity-90 hover:scale-110 ease-in-out transition cursor-pointer" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default LocationCard;
