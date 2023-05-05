import { Calendar } from 'react-date-range'

export const SingleCalendar = () => {
  return (
    <div className='container'>
      <Calendar className='calendarStyle' />

      <div>
        <input type='text' className='single-calendar-input' />
      </div>
    </div>
  )
}
