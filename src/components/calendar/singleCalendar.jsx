import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'
import { CalendarIcon } from '../../assets/calendar-icon'

export const SingleCalendar = () => {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }, ])

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
        <div className='single-calendar-input'>
          <input
            type='text'
            className=''
            onClick={() => {
              setOpen(!open)
            }}
            readOnly
            value={`${formatDate.startDate} - ${formatDate.endDate}`}
          />

          <div className='icon'>
            <CalendarIcon />
          </div>

        </div>


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