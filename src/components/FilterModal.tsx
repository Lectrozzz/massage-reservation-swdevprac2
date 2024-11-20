import React, { useState } from "react";
import {Button, Checkbox, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material"


type Props = {
    isOpen: boolean;
    text: string;
    onClose: () => void;
    handler: (minuteList: string[]) => void;
}

const FilterModal = ({ isOpen, text, onClose, handler }: Props) => {
  if (!isOpen) return null;
  const minutes = ["Default","60","90","120"]
  const [minuteList, setMinuteList] = useState<string[]>([])
  const handleChange = (event: SelectChangeEvent<typeof minuteList>) => {
    const {
      target: { value },
    } = event;
    // if default is selected, set remove all element from minuteList except default and  if default in minuteList, include value to minutelist except default
    let nextState: string[] = []
    if (typeof value === 'string'){
      nextState = value.split(',')
    }
    else{
      nextState = value
    }

    if (nextState.includes("Default")){
      if (minuteList.includes("Default")){
        setMinuteList(nextState.filter((item) => item !== "Default"))
      }
      else{
        setMinuteList(["Default"])
      }
    }
    else{
      setMinuteList(nextState)
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-120 px-6 py-8">
        <div className="text-black w-full items-center mb-4">
            {text}
            <InputLabel id="demo-multiple-checkbox-label">Service Minute</InputLabel>
        <Select
          className="w-[300px]"
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={minuteList}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {minutes.map((minute) => (
            <MenuItem key={minute} value={minute}>
              <Checkbox checked={minuteList.includes(minute)} />
              <ListItemText primary={minute} />
            </MenuItem>
          ))}
        </Select>
        </div>
        <div className="flex wifull justify-center gap-2">
            <Button className='bg-red-500 hover:bg-red-400 text-white' onClick={onClose}>Close</Button>
            <Button className='bg-green-500 hover:bg-green-400 text-white' onClick={()=>{ handler(minuteList)} }>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;