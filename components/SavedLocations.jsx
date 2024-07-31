import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSavedLocation, setDestination, setRadius } from '@/store/slices/locationSlice';
import { toast } from 'react-toastify';
import LocationCard from './LocationCard';
import 'react-toastify/dist/ReactToastify.css';

const SavedLocations = () => {
  const savedLocations = useSelector((state) => state.locations.savedLocations);
  const dispatch = useDispatch();
  let deletedLocation = null;

  const handleRemoveLocation = (id) => {
    const locationToRemove = savedLocations.find((loc) => loc.id === id);
    if (!locationToRemove) return;

    deletedLocation = locationToRemove; // Save the deleted location temporarily
    dispatch(removeSavedLocation(id));

    toast.success(
      `Location removed.`,
      {
        autoClose: false,
        onClose: () => {
          if (deletedLocation) {
            dispatch(addSavedLocation(deletedLocation));
            deletedLocation = null; // Clear the temporarily saved location
          }
        },
        closeButton: (
          <button
            onClick={() => {
              if (deletedLocation) {
                dispatch(addSavedLocation(deletedLocation));
                deletedLocation = null; // Clear the temporarily saved location
              }
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Undo
          </button>
        ),
      }
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {savedLocations.length > 0 ? (
        savedLocations.map((location) => (
          <LocationCard
            key={location.id}
            id={location.id}
            name={location.name}
            radius={location.radius}
            status="Active" // or another appropriate status
            coordinates={`${location.coordinates[0]}, ${location.coordinates[1]}`}
            address={"Address here"} // Update if address is available
            removeLocation={handleRemoveLocation}
          />
        ))
      ) : (
        <p>No saved locations.</p>
      )}
    </div>
  );
};

export default SavedLocations;
