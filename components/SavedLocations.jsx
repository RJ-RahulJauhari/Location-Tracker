"use client"

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSavedLocation, setSavedLocations, addSavedLocation } from '@/store/slices/locationSlice';
import { toast } from 'react-toastify';
import { useClerk, useUser } from '@clerk/clerk-react';
import LocationCard from './LocationCard';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SavedLocations = () => {
  const savedLocations = useSelector((state) => state.locations.savedLocations);
  const dispatch = useDispatch();
  let deletedLocation = null;
  
  const { user } = useUser(); // Get the current user from Clerk

  useEffect(() => {
    const fetchLocations = async () => {
      if(user && user.primaryEmailAddress && user.primaryEmailAddress.emailAddress){
        axios.get(`api/locations?email=${user.primaryEmailAddress.emailAddress}`)
        .then((res) =>{
          if(res){
            const data = res.data;
            console.log(data.res);
            dispatch(setSavedLocations(data.res.reverse()))
          }
        }).catch((error) => {
          console.log(error)
          toast.error("Failed to fetch locations")
        });
      }
    };

    fetchLocations();
  }, [dispatch, user,removeSavedLocation]);

  // const handleRemoveLocation = (id) => {
  //   const locationToRemove = savedLocations.find((loc) => loc.id === id);
  //   if (!locationToRemove) return;

  //   deletedLocation = locationToRemove; // Save the deleted location temporarily
  //   dispatch(removeSavedLocation(id));

  //   toast.success(
  //     `Location removed.`,
  //     {
  //       autoClose: false,
  //       onClose: () => {
  //         if (deletedLocation) {
  //           dispatch(addSavedLocation(deletedLocation));
  //           deletedLocation = null; // Clear the temporarily saved location
  //         }
  //       },
  //       closeButton: (
  //         <button
  //           onClick={() => {
  //             if (deletedLocation) {
  //               dispatch(addSavedLocation(deletedLocation));
  //               deletedLocation = null; // Clear the temporarily saved location
  //             }
  //           }}
  //           className="bg-blue-500 text-white px-2 py-1 rounded"
  //         >
  //           Undo
  //         </button>
  //       ),
  //     }
  //   );
  // };

  return (
    <div className="flex flex-col gap-2">
      {savedLocations.length > 0 ? (
        savedLocations.map((location) => (
          <LocationCard
            key={location._id}
            id={location._id}
            name={location.name}
            radius={location.radius}
            status="Active" // or another appropriate status
            coordinates={`${location.coordinates[0]}, ${location.coordinates[1]}`}
            address={"Address here"} // Update if address is available
          />
          
        ))
      ) : (
        <p>No saved locations.</p>
      )}
    </div>
  );
};

export default SavedLocations;
