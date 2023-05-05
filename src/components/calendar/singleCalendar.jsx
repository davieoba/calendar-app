import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
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

  // handle date formatting
  const [formatDate, setFormatDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })

  useEffect(() => {
    setFormatDate((prev) => {
      return {
        ...prev,
        startDate: format(state[0].startDate, 'dd/MM/yyyy'),
        endDate: format(state[0].endDate, 'dd/MM/yyyy'),
      }
    })
  }, [state])

  // handle click outside
  const calendarRef = useRef()
  useEffect(() => {
    const handler = (e) => {
      if (!calendarRef?.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  return (
    <div className='container'>
      <div className='element-container' ref={calendarRef}>
        <input
          type='text'
          className='single-calendar-input'
          onClick={() => {
            setOpen(!open)
          }}
          readOnly
          value={`${formatDate.startDate} - ${formatDate.endDate}`}
        />

        <div className={`dropdown ${open ? 'active' : 'inactive'}`}>
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
