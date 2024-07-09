import { useState } from 'react'
import './App.css'



function menu() {
  const [count, setCount] = useState(0)
  const [location, setLoc] = useState("")
  const [destination, setDest] = useState("")

  return (
    <>
      <div>
        <span display="inline-block" width="100px" height="100px" padding="5px">
            <label for="CLoc">Starting:</label>
            <input name="CLoc" defaultValue="Current Location" onChange={e => setLoc(e.target.value)} />
        </span>
        <span display="inline-block" width="100px" height="100px" padding="5px">
            <label for="DLoc">Destination:</label>
            <input name="DLoc" defaultValue="Ending Location" onChange={e => setDest(e.target.value)}/>
        </span>
        <span display="inline-block" width="100px" height="100px" padding="5px">
            <button onClick={() => toGoogle()}>
                GO
            </button>
        </span>
        <span display="inline-block" width="100px" height="100px" padding="5px">
            Time of Day:
            <span display="block">
                <label><input type="radio" name="myRadio0" value="6:00am-8:59am" /> 6:00am-8:59am</label>
                <label><input type="radio" name="myRadio1" value="9:00am-4:59pm" /> 9:00am-4:59pm</label>
                <label><input type="radio" name="myRadio2" value="5:00pm-8:59pm" /> 5:00pm-8:59pm</label>
                <label><input type="radio" name="myRadio3" value="9:00pm-5:49am" /> 9:00pm-5:49am</label>
            </span>
        </span>
        <span display="inline-block" width="100px" height="100px" padding="5px">
            Type of Transportation:
            <span display="block">
                <label><input type="radio" name="myRadio4" value="1" /> Walk</label>
                <label><input type="radio" name="myRadio5" value="2" /> Bus</label>
                <label><input type="radio" name="myRadio6" value="3" /> Bike</label>
                <label><input type="radio" name="myRadio7" value="4" /> Car</label>
            </span>
        </span>
      </div>
    </>
  )
}

function toGoogle() {
    //Send values "location" & "destination" to google api
}

export default menu
