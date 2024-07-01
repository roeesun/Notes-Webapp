import React, { useEffect, useState } from 'react'

const useFilteredNotes = (notes, searchBy, selectedTag, selectedColorButton) => {
    const [filteredNotes , setFilteredNotes] = useState([])

    useEffect(() => {
        const newFilteredNotes = notes.filter((note) => {
            const filterByTag = selectedTag ? note.tag === selectedTag : true;
            const filterByColor = selectedColorButton
              ? note.color === selectedColorButton
              : true;
            const filterBySearch =
              note.title.toLowerCase().includes(searchBy) ||
              note.content.toLowerCase().includes(searchBy) ||
              note.tag.toLowerCase().includes(searchBy);
    
            return filterBySearch && filterByTag && filterByColor;
        })

        setFilteredNotes(newFilteredNotes)
    },[notes, searchBy, selectedTag, selectedColorButton] )

    return filteredNotes
}

export default useFilteredNotes;
