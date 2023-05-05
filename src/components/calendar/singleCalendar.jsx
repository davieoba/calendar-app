import { useState } from 'react'
import { DateRange } from 'react-date-range'

export const SingleCalendar = () => {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])

  console.log({ state })

  return (
    <div className='container'>
      <div className='element-container'>
        <input
          type='text'
          className='single-calendar-input'
          onClick={() => {
            setOpen(!open)
          }}
        />

        <div className={`dropdown ${open ? 'open' : 'inactive'}`}>
          <DateRange
            className='calendarStyle'
            onChange={(item) => setState([item.selection])}
            ranges={state}
            showSelectionPreview={false}
            editableDateInputs={false}
            showMonthAndYearPickers={false}
            showDateDisplay={false}
            rangeColors={['#4C988E', '#4C988E', '#000000']}
            direction='horizontal'
          />
        </div>
      </div>
    </div>
  )
}
