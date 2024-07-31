"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRadius, setDestination, addSavedLocation } from "@/store/slices/locationSlice";
import { Slider } from "@/components/ui/slider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const LocationBuzzer = () => {
  const radius = useSelector((state) => state.locations.radius);
  const currentLocation = useSelector((state) => state.locations.currentLocation);
  const destination = useSelector((state) => state.locations.destination);
  const savedLocations = useSelector((state) => state.locations.savedLocations);
  const dispatch = useDispatch();
  const [inputRadius, setInputRadius] = useState(radius);
  const [buzzerActive, setBuzzerActive] = useState(false);
  const [inDestination, setInDestination] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    setInputRadius(radius);
  }, [radius]);

  useEffect(() => {
    let intervalId;

    if (buzzerActive) {
      const checkProximity = () => {
        if (currentLocation && destination) {
          const [lat1, lon1] = currentLocation;
          const [lat2, lon2] = destination;

          const distance = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
          const currentlyInDestination = distance <= inputRadius / 1000;

          if (currentlyInDestination && !inDestination) {
            toast.success("You have arrived at your destination!");
            setInDestination(true);
          } else if (!currentlyInDestination && inDestination) {
            toast.error("You have left the destination area.");
            setInDestination(false);
          }
        }
      };

      intervalId = setInterval(checkProximity, 1000); // Check every second
    }

    return () => clearInterval(intervalId);
  }, [buzzerActive, currentLocation, destination, inputRadius, inDestination]);

  const handleRadiusChange = (e) => {
    const newRadius = parseFloat(e.target.value);
    if (isNaN(newRadius) || newRadius < 0) {
      setInputRadius(0);
      dispatch(setRadius(0));
    } else {
      setInputRadius(newRadius);
      dispatch(setRadius(newRadius));
    }
  };

  const handleSliderChange = (value) => {
    const newValue = value[0];
    setInputRadius(newValue);
    dispatch(setRadius(newValue));
  };

  const handleBuzzerToggle = () => {
    setBuzzerActive(!buzzerActive);
    toast.info(buzzerActive ? "Buzzer stopped." : "Buzzer started.");
  };

  const handleSaveLocation = () => {
    if (destination && locationName) {
      dispatch(addSavedLocation({
        name: locationName,
        coordinates: destination,
        radius: inputRadius,
      }));
      setLocationName("");
      setPopoverOpen(false);
      toast.success("Location saved successfully!");
    } else {
      toast.error("Please enter a name for the location.");
    }
  };

  const handleSelectChange = (value) => {
    const selectedLocation = savedLocations.find((loc) => loc.name === value);
    if (selectedLocation) {
      dispatch(setDestination(selectedLocation.coordinates));
      dispatch(setRadius(selectedLocation.radius));
    }
  };

  return (
    <div className="flex flex-col justify-center p-2">
      <div className="flex flex-col gap-2 mb-4">
        <h3>Select from Saved Location:</h3>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {savedLocations.map((location) => (
              <SelectItem key={location.name} value={location.name}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <h3>Radius</h3>
        <Input
          placeholder="Radius in Meters"
          type="number"
          value={inputRadius}
          onChange={handleRadiusChange}
          min="0"
          step="0.1"
        />
        <Slider
          value={[inputRadius]}
          min={0}
          max={10000}
          step={0.1}
          onValueChange={handleSliderChange}
        />
      </div>
      <div className="flex flex-row justify-between">
        <button className="p-2" onClick={handleBuzzerToggle}>
          {buzzerActive ? "Stop Buzzer" : "Start Buzzer"}
        </button>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger>
            <button className="hover:opacity-90 hover:scale-110 ease-in-out transition cursor-pointer">
              <PlusIcon />
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Save Location</h3>
            <Input
              placeholder="Enter location name"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="mb-4"
            />
            <button onClick={handleSaveLocation} className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </PopoverContent>
        </Popover>
      </div>
      <ToastContainer />
    </div>
  );
};

// Function to calculate distance between two points using Haversine formula
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // in km
};

export default LocationBuzzer;
