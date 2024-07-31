"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDestination } from '@/store/slices/locationSlice';
import { Input } from './ui/input';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchQuery.trim()) {
                setLoading(true);
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&addressdetails=1`);
                    const data = await response.json();
                    setSuggestions(data || []);
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setSuggestions([]);
            }
        };

        const debounceFetch = setTimeout(() => {
            fetchSuggestions();
        }, 300); // Debounce for 300ms

        return () => clearTimeout(debounceFetch);
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSuggestionClick = (lat, lon) => {
        dispatch(setDestination([lat, lon]));
        setSearchQuery('');
        setSuggestions([]);
    };

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <Input
                type="text"
                placeholder="Search for a Location"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: '100%' }}
            />
            {suggestions.length > 0 && (
                <ul style={suggestionsListStyle}>
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(parseFloat(suggestion.lat), parseFloat(suggestion.lon))}
                            style={suggestionItemStyle}
                        >
                            {suggestion.display_name}
                        </li>
                    ))}
                </ul>
            )}
            {loading && <p>Loading...</p>}
        </div>
    );
};

// CSS-in-JS for the floating suggestions list
const suggestionsListStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: 'black',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000, // Ensures the list is above other content
    maxHeight: '200px', // Limit height to fit within view
    overflowY: 'auto' // Enable scrolling if needed
};

const suggestionItemStyle = {
    padding: '8px',
    cursor: 'pointer',
};

export default SearchBar;
