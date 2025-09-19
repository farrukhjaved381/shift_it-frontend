import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Clock, Coffee, Plus, Save, Trash2, AlertTriangle, Info, Utensils } from "lucide-react";

export default function SchedulingPreferences({ onNavigateBack }) {
  // Form state
  const [configName, setConfigName] = useState("");
  const [shiftDuration, setShiftDuration] = useState("8");
  const [lunchDuration, setLunchDuration] = useState("30");
  const [breakDuration, setBreakDuration] = useState("10");
  const [enableAutomaticScheduling, setEnableAutomaticScheduling] = useState(true);
  const [startTime, setStartTime] = useState("09:00");

  // Break counts based on shift duration
  const [breakCount, setBreakCount] = useState(2);
  const [mealCount, setMealCount] = useState(1);

  // Break times on the timeline
  const [breakTimes, setBreakTimes] = useState([
    { id: "meal-1", type: "meal", startPercent: 50, durationMinutes: 30 },
    { id: "rest-1", type: "rest", startPercent: 25, durationMinutes: 10 },
    { id: "rest-2", type: "rest", startPercent: 75, durationMinutes: 10 },
  ]);

  // Track if form has been modified
  const [isFormModified, setIsFormModified] = useState(false);

  // Confirmation dialog state
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Dragging state
  const [draggedBreak, setDraggedBreak] = useState(null);
  const timelineRef = useRef(null);

  // Saved configurations
  const [savedConfigs, setSavedConfigs] = useState([
    {
      id: "1",
      name: "Standard Shift",
      shiftDuration: "8",
      lunchDuration: "30",
      breakDuration: "10",
      breakCount: 2,
      mealCount: 1,
      startTime: "09:00",
      breakTimes: [
        { id: "meal-1", type: "meal", startPercent: 50, durationMinutes: 30 },
        { id: "rest-1", type: "rest", startPercent: 25, durationMinutes: 10 },
        { id: "rest-2", type: "rest", startPercent: 75, durationMinutes: 10 },
      ],
      createdAt: new Date(2023, 5, 15),
    },
    {
      id: "2",
      name: "Half Day",
      shiftDuration: "4",
      lunchDuration: "0",
      breakDuration: "10",
      breakCount: 1,
      mealCount: 0,
      startTime: "08:00",
      breakTimes: [{ id: "rest-1", type: "rest", startPercent: 50, durationMinutes: 10 }],
      createdAt: new Date(2023, 6, 20),
    },
    {
      id: "3",
      name: "Long Shift",
      shiftDuration: "12",
      lunchDuration: "30",
      breakDuration: "10",
      breakCount: 3,
      mealCount: 2,
      startTime: "07:00",
      breakTimes: [
        { id: "meal-1", type: "meal", startPercent: 33, durationMinutes: 30 },
        { id: "meal-2", type: "meal", startPercent: 75, durationMinutes: 30 },
        { id: "rest-1", type: "rest", startPercent: 20, durationMinutes: 10 },
        { id: "rest-2", type: "rest", startPercent: 50, durationMinutes: 10 }, // fixed type
        { id: "rest-3", type: "rest", startPercent: 85, durationMinutes: 10 },
      ],
      createdAt: new Date(2023, 7, 5),
    },
  ]);

  // Update break counts when shift duration changes
  useEffect(() => {
    const duration = Number.parseInt(shiftDuration);

    // Meal break rules:
    // - If they work more than 5 hours, they must receive a 30-minute meal break
    // - A second meal break is required for shifts longer than 10 hours
    let meals = 0;
    if (duration > 5) meals = 1;
    if (duration > 10) meals = 2;
    setMealCount(meals);

    // If meal breaks are required, ensure lunch duration is at least 30 minutes
    if (meals > 0 && lunchDuration === "0") {
      setLunchDuration("30");
    }

    // Rest break rules:
    // - Employees are entitled to a 10-minute rest break for every 4 hours worked
    const breaks = Math.ceil(duration / 4);
    setBreakCount(breaks);

    // If rest breaks are required, ensure break duration is at least 10 minutes
    if (breaks > 0 && breakDuration === "0") {
      setBreakDuration("10");
    }

    // Update break times based on new requirements
    updateBreakTimes(duration, meals, breaks);
  }, [shiftDuration]);

  // Fix: updateBreakTimes should use latest lunch/break duration from state, not from arguments
  const updateBreakTimes = (duration, meals, breaks) => {
    const newBreakTimes = [];

    // Add meal breaks
    for (let i = 0; i < meals; i++) {
      // Position meal breaks evenly
      const position = meals === 1 ? 50 : i === 0 ? 33 : 75;
      newBreakTimes.push({
        id: `meal-${i + 1}`,
        type: "meal",
        startPercent: position,
        durationMinutes: Number.parseInt(lunchDuration), // use state
      });
    }

    // Add rest breaks
    for (let i = 0; i < breaks; i++) {
      let position;
      if (breaks === 1) {
        position = 50;
      } else if (breaks === 2) {
        position = i === 0 ? 25 : 75;
      } else if (breaks === 3) {
        position = i === 0 ? 20 : i === 1 ? 50 : 85;
      } else {
        position = ((i + 1) * 100) / (breaks + 1);
      }

      newBreakTimes.push({
        id: `rest-${i + 1}`,
        type: "rest",
        startPercent: position,
        durationMinutes: Number.parseInt(breakDuration), // use state
      });
    }

    setBreakTimes(newBreakTimes);
  };

  // Fix: update breakTimes when lunch/break duration changes
  useEffect(() => {
    const duration = Number.parseInt(shiftDuration);
    updateBreakTimes(duration, mealCount, breakCount);
  }, [lunchDuration, breakDuration, mealCount, breakCount, shiftDuration]);

  // Set form as modified when any input changes
  useEffect(() => {
    setIsFormModified(true);
  }, [configName, shiftDuration, lunchDuration, breakDuration, startTime, breakTimes]);

  // Function to handle back navigation
  const handleBackNavigation = () => {
    if (isFormModified) {
      setShowConfirmDialog(true);
    } else {
      onNavigateBack();
    }
  };

  // Function to save current configuration
  const saveConfiguration = () => {
    const newConfig = {
      id: Date.now().toString(),
      name: configName.trim() || `${shiftDuration} Hour Shift`,
      shiftDuration,
      lunchDuration,
      breakDuration,
      breakCount,
      mealCount,
      startTime,
      breakTimes: [...breakTimes],
      createdAt: new Date(),
      shiftPattern: null,
      shiftBlocks: [],
    };

    setSavedConfigs([...savedConfigs, newConfig]);
    setIsFormModified(false);
    setConfigName(""); // clear after save
  };

  // Function to save and navigate back
  const saveAndNavigateBack = () => {
    saveConfiguration();
    setShowConfirmDialog(false);
    onNavigateBack();
  };

  // Function to discard changes and navigate back
  const discardAndNavigateBack = () => {
    setShowConfirmDialog(false);
    onNavigateBack();
  };

  // Function to delete a configuration
  const deleteConfiguration = (id) => {
    setSavedConfigs(savedConfigs.filter((config) => config.id !== id));
  };

  // Function to format lunch duration for display
  const formatLunchDuration = (duration, count) => {
    if (duration === "0" || count === 0) return "No lunch";
    const durationText = duration === "60" ? "1 hour" : `${duration} min`;
    return count > 1 ? `${count}x ${durationText} lunch` : `${durationText} lunch`;
  };

  // Function to format break duration for display
  const formatBreakDuration = (duration, count) => {
    if (duration === "0" || count === 0) return "No breaks";
    return `${count}x ${duration} min breaks`;
  };

  // Function to handle break position change
  const handleBreakPositionChange = (id, newPosition) => {
    setBreakTimes((prevBreaks) =>
      prevBreaks.map((breakItem) =>
        breakItem.id === id ? { ...breakItem, startPercent: Math.min(Math.max(newPosition, 5), 95) } : breakItem,
      ),
    );
  };

  // Function to calculate actual time from percentage
  const calculateTimeFromPercent = (percent) => {
    const duration = Number.parseInt(shiftDuration);
    const totalMinutes = duration * 60;
    const minutesFromStart = (totalMinutes * percent) / 100;

    // Parse start time
    const [startHour, startMinute] = startTime.split(":").map(Number);

    // Calculate new time
    let newMinutes = startMinute + minutesFromStart;
    const newHours = startHour + Math.floor(newMinutes / 60);
    newMinutes = newMinutes % 60;

    // Format time
    return `${String(Math.floor(newHours) % 24).padStart(2, "0")}:${String(Math.floor(newMinutes)).padStart(2, "0")}`;
  };

  // Function to calculate end time
  const calculateEndTime = () => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const duration = Number.parseInt(shiftDuration);

    const endHour = startHour + duration;
    const endMinute = startMinute;

    return `${String(endHour % 24).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;
  };

  // Generate time markers for the timeline
  const generateTimeMarkers = () => {
    const duration = Number.parseInt(shiftDuration);
    const markers = [];
    const [startHour, startMinute] = startTime.split(":").map(Number);

    // Add start marker
    markers.push(
      <div key="start" className="absolute left-0 -bottom-6 text-xs">
        {startTime}
      </div>,
    );

    // Add end marker
    markers.push(
      <div key="end" className="absolute right-0 -bottom-6 text-xs">
        {calculateEndTime()}
      </div>,
    );

    // Add intermediate markers
    for (let i = 1; i < duration; i++) {
      const percent = (i / duration) * 100;
      markers.push(
        <div
          key={`marker-${i}`}
          className="absolute -bottom-6 text-xs transform -translate-x-1/2"
          style={{ left: `${percent}%` }}
        >
          {calculateTimeFromPercent(percent)}
        </div>,
      );
    }

    return markers;
  };

  // Generate available start times for select dropdown
  const generateStartTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = String(hour).padStart(2, "0");
        const formattedMinute = String(minute).padStart(2, "0");
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  };

  return (
    <>
      <div className="space-y-4 py-4 sm:space-y-6"> 
        <div className="flex items-center">
          <button
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            onClick={handleBackNavigation}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-indigo-900 ml-4 py-4">
              Scheduling Preferences
            </h1>
            <p className="text-sm text-gray-600">Configure and save shift settings and break times</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <Info className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800">Break Requirements</h4>
              <p className="text-sm text-blue-700 mt-1">
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>
                    Meal break: If employees work more than 5 hours, they must receive a 30-minute meal break. A second meal
                    break is required for shifts longer than 10 hours.
                  </li>
                  <li>Rest break: Employees are entitled to a 10-minute rest break for every 4 hours worked.</li>
                </ul>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="bg-gradient-to-r from-indigo-900 to-indigo-600 text-white p-6 rounded-t-lg">
                <div className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  <h2 className="text-lg font-semibold">Create New Shift Configuration</h2>
                </div>
                <p className="text-white/80">Define a new shift template</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label htmlFor="config-name" className="block text-sm font-medium text-gray-700">
                    Configuration Name
                  </label>
                  <input
                    id="config-name"
                    type="text"
                    placeholder="e.g., Standard Shift, Night Shift, etc."
                    value={configName}
                    onChange={(e) => setConfigName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Shift Duration</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-white p-4 hover:bg-gray-50 hover:border-indigo-500 cursor-pointer">
                        <input
                          type="radio"
                          value="4"
                          checked={shiftDuration === "4"}
                          onChange={(e) => setShiftDuration(e.target.value)}
                          className="sr-only"
                        />
                        <span className="text-xl font-bold">4</span>
                        <span className="text-sm text-gray-600">Hours</span>
                      </label>

                      <label className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-white p-4 hover:bg-gray-50 hover:border-indigo-500 cursor-pointer">
                        <input
                          type="radio"
                          value="6"
                          checked={shiftDuration === "6"}
                          onChange={(e) => setShiftDuration(e.target.value)}
                          className="sr-only"
                        />
                        <span className="text-xl font-bold">6</span>
                        <span className="text-sm text-gray-600">Hours</span>
                      </label>

                      <label className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-white p-4 hover:bg-gray-50 hover:border-indigo-500 cursor-pointer">
                        <input
                          type="radio"
                          value="8"
                          checked={shiftDuration === "8"}
                          onChange={(e) => setShiftDuration(e.target.value)}
                          className="sr-only"
                        />
                        <span className="text-xl font-bold">8</span>
                        <span className="text-sm text-gray-600">Hours</span>
                      </label>

                      <label className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-white p-4 hover:bg-gray-50 hover:border-indigo-500 cursor-pointer">
                        <input
                          type="radio"
                          value="12"
                          checked={shiftDuration === "12"}
                          onChange={(e) => setShiftDuration(e.target.value)}
                          className="sr-only"
                        />
                        <span className="text-xl font-bold">12</span>
                        <span className="text-sm text-gray-600">Hours</span>
                      </label>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="shift-start" className="block text-sm font-medium text-gray-700 mb-2">
                        Shift Start Time
                      </label>
                      <select
                        id="shift-start"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        {generateStartTimeOptions().map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <div className="mt-2 text-xs text-gray-600 flex items-center">
                        <Info className="h-3 w-3 mr-1" />
                        Shift ends at {calculateEndTime()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center mb-3">
                        <h3 className="text-sm font-medium">Meal Break Duration</h3>
                        <button
                          className="h-6 w-6 ml-1 p-1 rounded-md hover:bg-gray-100"
                          title="Required: 1 meal break(s) for 8-hour shift"
                        >
                          <Info className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-white p-4 hover:bg-gray-50 hover:border-teal-500 cursor-pointer">
                          <input
                            type="radio"
                            value="0"
                            checked={lunchDuration === "0"}
                            onChange={(e) => setLunchDuration(e.target.value)}
                            className="sr-only"
                            disabled={mealCount > 0}
                          />
                          <span className="text-lg font-bold">None</span>
                          <span className="text-xs text-gray-600">No lunch</span>
                        </label>

                        <label className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-white p-4 hover:bg-gray-50 hover:border-teal-500 cursor-pointer">
                          <input
                            type="radio"
                            value="30"
                            checked={lunchDuration === "30"}
                            onChange={(e) => setLunchDuration(e.target.value)}
                            className="sr-only"
                          />
                          <span className="text-lg font-bold">30</span>
                          <span className="text-xs text-gray-600">Minutes</span>
                          {mealCount > 0 && (
                            <span className="mt-1 px-2 py-1 bg-green-100 text-green-800 border border-green-200 rounded-md text-xs">
                              Required
                            </span>
                          )}
                        </label>

                        <label className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-white p-4 hover:bg-gray-50 hover:border-teal-500 cursor-pointer">
                          <input
                            type="radio"
                            value="60"
                            checked={lunchDuration === "60"}
                            onChange={(e) => setLunchDuration(e.target.value)}
                            className="sr-only"
                          />
                          <span className="text-lg font-bold">1</span>
                          <span className="text-xs text-gray-600">Hour</span>
                        </label>
                      </div>
                      {mealCount > 0 && (
                        <div className="mt-2 text-xs text-blue-600 flex items-center">
                          <Info className="h-3 w-3 mr-1" />
                          {mealCount === 1 ? "One 30-minute meal break required" : `Two 30-minute meal breaks required`}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center mb-3">
                        <h3 className="text-sm font-medium">Rest Break Duration</h3>
                        <button
                          className="h-6 w-6 ml-1 p-1 rounded-md hover:bg-gray-100"
                          title="Required: 2 rest break(s) for 8-hour shift"
                        >
                          <Info className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-white p-4 hover:bg-gray-50 hover:border-teal-500 cursor-pointer">
                          <input
                            type="radio"
                            value="0"
                            checked={breakDuration === "0"}
                            onChange={(e) => setBreakDuration(e.target.value)}
                            className="sr-only"
                            disabled={breakCount > 0}
                          />
                          <span className="text-lg font-bold">None</span>
                          <span className="text-xs text-gray-600">No breaks</span>
                        </label>

                        <label className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-white p-4 hover:bg-gray-50 hover:border-teal-500 cursor-pointer">
                          <input
                            type="radio"
                            value="10"
                            checked={breakDuration === "10"}
                            onChange={(e) => setBreakDuration(e.target.value)}
                            className="sr-only"
                          />
                          <span className="text-lg font-bold">10</span>
                          <span className="text-xs text-gray-600">Minutes</span>
                          {breakCount > 0 && (
                            <span className="mt-1 px-2 py-1 bg-green-100 text-green-800 border border-green-200 rounded-md text-xs">
                              Required
                            </span>
                          )}
                        </label>

                        <label className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-white p-4 hover:bg-gray-50 hover:border-teal-500 cursor-pointer">
                          <input
                            type="radio"
                            value="15"
                            checked={breakDuration === "15"}
                            onChange={(e) => setBreakDuration(e.target.value)}
                            className="sr-only"
                          />
                          <span className="text-lg font-bold">15</span>
                          <span className="text-xs text-gray-600">Minutes</span>
                        </label>
                      </div>
                      {breakCount > 0 && (
                        <div className="mt-2 text-xs text-blue-600 flex items-center">
                          <Info className="h-3 w-3 mr-1" />
                          {breakCount === 1
                            ? "One 10-minute rest break required"
                            : `${breakCount} 10-minute rest breaks required`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Break Time Schedule</h3>
                    <button
                      className="h-6 w-6 p-1 rounded-md hover:bg-gray-100"
                      title="Drag the break markers to set exact times for breaks and lunch"
                    >
                      <Info className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-2 flex justify-between text-sm">
                      <div>
                        Shift start: <span className="font-medium">{startTime}</span>
                      </div>
                      <div>
                        Shift end: <span className="font-medium">{calculateEndTime()}</span>
                      </div>
                    </div>

                    <div
                      ref={timelineRef}
                      className="relative h-16 bg-white rounded-md border border-gray-200 mb-8"
                    >
                      {/* Hour markers */}
                      <div className="absolute inset-0 flex">
                        {Array.from({ length: Number.parseInt(shiftDuration) }).map((_, i) => (
                          <div
                            key={`hour-${i}`}
                            className="flex-1 border-r last:border-r-0 border-gray-200"
                          />
                        ))}
                      </div>

                      {/* Break markers */}
                      {breakTimes.map((breakItem) => {
                        const width = (breakItem.durationMinutes / (Number.parseInt(shiftDuration) * 60)) * 100;
                        return (
                          <div
                            key={breakItem.id}
                            className={`absolute top-0 h-full rounded-md cursor-move flex items-center justify-center ${
                              breakItem.type === "meal"
                                ? "bg-blue-200 border border-blue-400"
                                : "bg-teal-200 border border-teal-400"
                            }`}
                            style={{
                              left: `${breakItem.startPercent}%`,
                              width: `${width}%`,
                              transform: "translateX(-50%)",
                            }}
                            draggable
                            onDragStart={() => setDraggedBreak(breakItem.id)}
                          >
                            {breakItem.type === "meal" ? (
                              <Utensils className="h-4 w-4 text-blue-600" />
                            ) : (
                              <Coffee className="h-4 w-4 text-teal-600" />
                            )}
                          </div>
                        );
                      })}

                      {/* Time markers */}
                      {generateTimeMarkers()}
                    </div>

                    <div className="space-y-2">
                      {breakTimes.map((breakItem) => (
                        <div key={breakItem.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            {breakItem.type === "meal" ? (
                              <>
                                <Utensils className="h-4 w-4 text-blue-600 mr-2" />
                                <span className="text-sm">Meal Break {breakItem.id.split("-")[1]}</span>
                              </>
                            ) : (
                              <>
                                <Coffee className="h-4 w-4 text-teal-600 mr-2" />
                                <span className="text-sm">Rest Break {breakItem.id.split("-")[1]}</span>
                              </>
                            )}
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-sm">
                              <span className="font-medium">{calculateTimeFromPercent(breakItem.startPercent)}</span>
                              <span className="mx-1">-</span>
                              <span className="font-medium">
                                {calculateTimeFromPercent(
                                  breakItem.startPercent +
                                    (breakItem.durationMinutes / (Number.parseInt(shiftDuration) * 60)) * 100,
                                )}
                              </span>
                            </div>
                            <input
                              type="range"
                              min="5"
                              max="95"
                              step="1"
                              value={breakItem.startPercent}
                              onChange={(e) => handleBreakPositionChange(breakItem.id, Number(e.target.value))}
                              className="w-32"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-md border border-amber-200">
                  <div className="flex">
                    <Info className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-amber-800">Break Summary</h4>
                      <p className="text-sm text-amber-700 mt-1">
                        This {shiftDuration}-hour shift requires:
                      </p>
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-amber-700">
                        <li>
                          {mealCount > 0
                            ? `${mealCount}x ${lunchDuration === "60" ? "1-hour" : "30-minute"} meal breaks`
                            : "No meal breaks required"}
                        </li>
                        <li>
                          {breakCount > 0
                            ? `${breakCount}x ${breakDuration}-minute rest breaks`
                            : "No rest breaks required"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 flex justify-end">
                <button
                  className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  onClick={saveConfiguration}
                >
                  <Save className="inline h-4 w-4 mr-2" />
                  Save Configuration
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-semibold">Additional Settings</h2>
                <p className="text-gray-600">Configure advanced scheduling options</p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label htmlFor="automatic-scheduling" className="block text-sm font-medium text-gray-700">
                      Automatic Scheduling
                    </label>
                    <p className="text-sm text-gray-600">
                      Allow the system to automatically assign shifts based on preferences
                    </p>
                  </div>
                  <input
                    id="automatic-scheduling"
                    type="checkbox"
                    checked={enableAutomaticScheduling}
                    onChange={(e) => setEnableAutomaticScheduling(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm h-full">
              <div className="bg-gradient-to-r from-teal-500 to-indigo-600 text-white p-6 rounded-t-lg">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <h2 className="text-lg font-semibold">Saved Configurations</h2>
                </div>
                <p className="text-white/80">Your shift templates</p>
              </div>
              <div className="p-0">
                <div className="h-[500px] overflow-y-auto">
                  {savedConfigs.length > 0 ? (
                    <div className="divide-y">
                      {savedConfigs.map((config) => (
                        <div key={config.id} className="p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{config.name}</h3>
                            <button
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100 p-1 rounded-md"
                              onClick={() => deleteConfiguration(config.id)}
                              aria-label="Delete configuration"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="px-2 py-1 bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-md text-xs">
                              {config.shiftDuration} hours
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded-md text-xs">
                              {formatLunchDuration(config.lunchDuration, config.mealCount)}
                            </span>
                            <span className="px-2 py-1 bg-teal-100 text-teal-800 border border-teal-200 rounded-md text-xs">
                              {formatBreakDuration(config.breakDuration, config.breakCount)}
                            </span>
                            {config.shiftPattern && (
                              <span className="px-2 py-1 bg-purple-100 text-purple-800 border border-purple-200 rounded-md text-xs">
                                {config.shiftPattern === "3x8" ? "3×8h pattern" : "2×12h pattern"}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">
                            Created: {config.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-600">No configurations saved yet</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowConfirmDialog(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              Unsaved Changes
            </h2>
            <p className="mb-4">You have unsaved changes. What would you like to do?</p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setShowConfirmDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
                onClick={discardAndNavigateBack}
              >
                Discard Changes
              </button>
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                onClick={saveAndNavigateBack}
              >
                Save & Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}