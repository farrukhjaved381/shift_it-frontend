"use client"

import { useState } from "react"

export default function ScheduleModule({
  clinicalRotations = [],
  viewMode = "sessions",
  onViewModeChange,
  className,
}) {
  const mockUserProfile = { firstName: 'Ahmed' }; // Placeholder user profile

  const [currentDate, setCurrentDate] = useState(new Date())

  // Generate calendar data for the current month
  const generateCalendarData = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dateString = date.toISOString().split("T")[0]

      let rotationsForDay = []

      if (viewMode === "sessions") {
        // Find individual sessions for this date
        clinicalRotations.forEach((rotation) => {
          const sessionsForDay = rotation.sessions?.filter((session) => session.date === dateString) || []
          if (sessionsForDay.length > 0) {
            rotationsForDay.push({
              ...rotation,
              hasSession: true,
              isSession: true,
            })
          }
        })
      } else {
        // Find rotation blocks that span this date
        rotationsForDay = clinicalRotations
          .filter((rotation) => {
            const rotationStart = new Date(rotation.blockStartDate)
            const rotationEnd = new Date(rotation.blockEndDate)
            return date >= rotationStart && date <= rotationEnd
          })
          .map((rotation) => ({
            ...rotation,
            isSession: false,
          }))
      }

      days.push({
        day,
        date: dateString,
        isToday: dateString === new Date().toISOString().split("T")[0],
        rotations: rotationsForDay,
      })
    }

    return days
  }

  // Get current week's schedule
  const getCurrentWeekSchedule = () => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())

    const weekSchedule = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      const dateString = date.toISOString().split("T")[0]

      let rotationsForDay = []

      if (viewMode === "sessions") {
        // Find individual sessions for this date
        clinicalRotations.forEach((rotation) => {
          const sessionsForDay = rotation.sessions?.filter((session) => session.date === dateString) || []
          sessionsForDay.forEach((session) => {
            rotationsForDay.push({
              ...rotation,
              sessionTime: `${session.startTime}-${session.endTime}`,
              isSession: true,
            })
          })
        })
      } else {
        // Find rotation blocks that span this date
        rotationsForDay = clinicalRotations
          .filter((rotation) => {
            const rotationStart = new Date(rotation.blockStartDate)
            const rotationEnd = new Date(rotation.blockEndDate)
            return date >= rotationStart && date <= rotationEnd
          })
          .map((rotation) => ({
            ...rotation,
            isSession: false,
          }))
      }

      weekSchedule.push({
        date,
        dateString,
        rotations: rotationsForDay,
      })
    }

    return weekSchedule
  }

  const weekSchedule = getCurrentWeekSchedule()

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(currentDate.getMonth() - 1)
    } else {
      newDate.setMonth(currentDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const calendarDays = generateCalendarData()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className={`flex flex-col gap-4 md:gap-5 p-2 md:p-4 ${className || ''}`}>
        {/* Top Header */}
        <header className="px-4 md:px-6 py-4 md:py-6 border-b border-gray-200 bg-white">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Schedule</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            View your clinical rotation schedule and calendar
          </p>
        </header>

      {/* This Week's Schedule */}
      <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
        <div className="p-3 md:p-5 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            📅 This Week's Schedule
          </h2>
          <p className="text-xs md:text-sm text-gray-500">Your clinical rotations for the current week</p>
        </div>
        <div className="p-3 md:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-7 gap-2 md:gap-4">
            {weekSchedule.map((day, index) => (
              <div key={index} className="flex flex-col gap-1 md:gap-2 rounded-md bg-slate-100 p-1 md:p-2">
                <div className="text-center">
                  <p className="text-xs md:text-sm font-medium text-gray-500">
                    {day.date.toLocaleDateString("en-US", { weekday: "short" })}
                  </p>
                  <p className={`text-base md:text-lg font-semibold ${day.date.toDateString() === new Date().toDateString() ? 'text-blue-600' : 'text-gray-900'}`}>
                    {day.date.getDate()}
                  </p>
                </div>

                <div className="flex flex-col gap-1 md:gap-2 min-h-[60px] md:min-h-[120px]">
                  {day.rotations.map((rotation, rotIndex) => (
                    <div
                      key={`${rotation.id}-${rotation.isSession ? rotation.sessionTime : "block"}-${rotIndex}`}
                      className="p-1 md:p-2 rounded-md bg-blue-500 text-white text-xs"
                    >
                      <p className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">{rotation.name}</p>
                      <p className="opacity-90 whitespace-nowrap overflow-hidden text-ellipsis">{rotation.hospital}</p>
                      <div className="flex items-center gap-1 mt-1 opacity-90">
                        ⏰ <span>{rotation.isSession ? rotation.sessionTime : "Block"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Calendar */}
      <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
        <div className="p-3 md:p-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            📅 {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-1 md:p-2 border border-gray-300 rounded-md bg-white cursor-pointer text-sm md:text-base"
            >
              ←
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="p-1 md:p-2 border border-gray-300 rounded-md bg-white cursor-pointer text-sm md:text-base"
            >
              →
            </button>
          </div>
        </div>
        <div className="p-3 md:p-5">
          <div className="grid grid-cols-7 gap-1 mb-2 md:mb-4">
            {dayNames.map((day) => (
              <div key={day} className="p-1 md:p-2 text-center text-xs md:text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`min-h-[60px] md:min-h-[100px] p-1 border border-gray-200 rounded-md ${day?.isToday ? 'bg-blue-50' : 'bg-white'}`}
              >
                {day && (
                  <>
                    <div className={`text-xs md:text-sm font-medium mb-1 ${day.isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                      {day.day}
                    </div>
                    <div className="flex flex-col gap-1">
                      {day.rotations.map((rotation, rotIndex) => (
                        <div
                          key={`${rotation.id}-${rotIndex}`}
                          className="text-xs p-1 rounded bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-sm"
                          title={`${rotation.name} at ${rotation.hospital}`}
                        >
                          <div className="whitespace-nowrap overflow-hidden text-ellipsis font-medium leading-none">{rotation.name}</div>
                          <div className="whitespace-nowrap overflow-hidden text-ellipsis opacity-90 leading-none">{rotation.hospital}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}