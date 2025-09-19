import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Save, Info, Trash2, Plus, AlertTriangle } from "lucide-react";

export default function ShiftSetup({ onNavigateBack }) {
  // State variables
  const [shiftPattern, setShiftPattern] = useState("3x8");
  const [shiftBlocks, setShiftBlocks] = useState([
    {
      id: "shift-1",
      name: "Morning Shift",
      startTime: "06:00",
      category: "morning",
      color: "bg-amber-500",
    },
    {
      id: "shift-2",
      name: "Afternoon Shift",
      startTime: "14:00",
      category: "afternoon",
      color: "bg-blue-500",
    },
    {
      id: "shift-3",
      name: "Night Shift",
      startTime: "22:00",
      category: "night",
      color: "bg-indigo-700",
    },
  ]);
  const [customShiftCount, setCustomShiftCount] = useState(3);
  const [isFormModified, setIsFormModified] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [configName, setConfigName] = useState("");
  const [savedConfigs, setSavedConfigs] = useState([
    {
      id: "1",
      name: "Standard 3x8 Pattern",
      shiftPattern: "3x8",
      shiftBlocks: [
        {
          id: "shift-1",
          name: "Morning Shift",
          startTime: "06:00",
          category: "morning",
          color: "bg-amber-500",
        },
        {
          id: "shift-2",
          name: "Afternoon Shift",
          startTime: "14:00",
          category: "afternoon",
          color: "bg-blue-500",
        },
        {
          id: "shift-3",
          name: "Night Shift",
          startTime: "22:00",
          category: "night",
          color: "bg-indigo-700",
        },
      ],
      createdAt: new Date(2023, 5, 15),
    },
    {
      id: "2",
      name: "Hospital 2x12 Pattern",
      shiftPattern: "2x12",
      shiftBlocks: [
        {
          id: "shift-1",
          name: "Day Shift",
          startTime: "07:00",
          category: "morning",
          color: "bg-amber-500",
        },
        {
          id: "shift-2",
          name: "Night Shift",
          startTime: "19:00",
          category: "night",
          color: "bg-indigo-700",
        },
      ],
      createdAt: new Date(2023, 6, 20),
    },
  ]);

  // Update shift blocks when shift pattern changes
  useEffect(() => {
    if (shiftPattern === "3x8") {
      setShiftBlocks([
        {
          id: "shift-1",
          name: "Morning Shift",
          startTime: "06:00",
          category: "morning",
          color: "bg-amber-500",
        },
        {
          id: "shift-2",
          name: "Afternoon Shift",
          startTime: "14:00",
          category: "afternoon",
          color: "bg-blue-500",
        },
        {
          id: "shift-3",
          name: "Night Shift",
          startTime: "22:00",
          category: "night",
          color: "bg-indigo-700",
        },
      ]);
    } else if (shiftPattern === "2x12") {
      setShiftBlocks([
        {
          id: "shift-1",
          name: "Day Shift",
          startTime: "07:00",
          category: "morning",
          color: "bg-amber-500",
        },
        {
          id: "shift-2",
          name: "Night Shift",
          startTime: "19:00",
          category: "night",
          color: "bg-indigo-700",
        },
      ]);
    } else if (shiftPattern === "custom" && shiftBlocks.length === 0) {
      // Initialize with one shift for custom pattern if none exist
      setShiftBlocks([
        {
          id: "shift-1",
          name: "Custom Shift",
          startTime: "09:00",
          category: "morning",
          color: "bg-green-500",
          durationHours: 8,
        },
      ]);
    }
  }, [shiftPattern]);

  // Set form as modified when any input changes
  useEffect(() => {
    setIsFormModified(true);
  }, [shiftPattern, shiftBlocks]);

  // Function to handle back navigation
  const handleBackNavigation = () => {
    if (isFormModified) {
      setShowConfirmDialog(true);
    } else {
      onNavigateBack();
    }
  };

  // Function to update a shift block
  const updateShiftBlock = (id, updates) => {
    setShiftBlocks(shiftBlocks.map((block) => (block.id === id ? { ...block, ...updates } : block)));
    setIsFormModified(true);
  };

  // Function to add a new shift block (for custom pattern)
  const addShiftBlock = () => {
    const newId = `shift-${shiftBlocks.length + 1}`;
    const newBlock = {
      id: newId,
      name: `Shift ${shiftBlocks.length + 1}`,
      startTime: "09:00",
      category: "morning",
      color: getRandomColor(),
      durationHours: 8,
    };
    setShiftBlocks([...shiftBlocks, newBlock]);
    setCustomShiftCount(shiftBlocks.length + 1);
    setIsFormModified(true);
  };

  // Function to remove a shift block (for custom pattern)
  const removeShiftBlock = (id) => {
    if (shiftBlocks.length > 1) {
      setShiftBlocks(shiftBlocks.filter((block) => block.id !== id));
      setCustomShiftCount(shiftBlocks.length - 1);
      setIsFormModified(true);
    }
  };

  // Function to get a random color for new shifts
  const getRandomColor = () => {
    const colors = [
      "bg-amber-500",
      "bg-blue-500",
      "bg-indigo-700",
      "bg-green-500",
      "bg-rose-500",
      "bg-teal-500",
      "bg-purple-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Function to calculate end time for a shift
  const calculateShiftEndTime = (startTime, hours) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const endHour = (startHour + hours) % 24;
    return `${String(endHour).padStart(2, "0")}:${String(startMinute).padStart(2, "0")}`;
  };

  // Function to save current configuration
  const saveConfiguration = () => {
    const newConfig = {
      id: Date.now().toString(),
      name: configName || `${shiftPattern === "custom" ? "Custom" : shiftPattern} Pattern`,
      shiftPattern,
      shiftBlocks: shiftBlocks.map((block) => ({
        ...block,
        durationHours: shiftPattern === "custom" ? block.durationHours : shiftPattern === "3x8" ? 8 : 12,
      })),
      createdAt: new Date(),
    };

    setSavedConfigs([...savedConfigs, newConfig]);

    // Reset form modified state
    setIsFormModified(false);

    // Reset form
    setConfigName("");

    // Show a temporary success message
    const successMessage = document.createElement("div");
    successMessage.className =
      "fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-50";
    successMessage.innerHTML =
      '<div class="flex items-center"><svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>Shift pattern saved successfully</div>';
    document.body.appendChild(successMessage);
    setTimeout(() => {
      document.body.removeChild(successMessage);
    }, 3000);
  };

  // Function to delete a configuration
  const deleteConfiguration = (id) => {
    setSavedConfigs(savedConfigs.filter((config) => config.id !== id));
  };

  // Update the saveAndNavigateBack function to call saveConfiguration
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

  // Helper function to generate time options
  const generateHourOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      const formattedHour = String(hour).padStart(2, "0");
      options.push(`${formattedHour}:00`);
    }
    return options;
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center">
          <button
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            onClick={handleBackNavigation}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-indigo-900 dark:text-white">Shifts Setup</h1>
            <p className="text-sm text-gray-600">Configure shift patterns and coverage</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="bg-gradient-to-r from-indigo-900 to-indigo-600 text-white p-6 rounded-t-lg">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <h2 className="text-lg font-semibold">Shift Patterns</h2>
            </div>
            <p className="text-white/80">Configure 24-hour coverage patterns</p>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Select Pattern</h3>
                <div className="grid grid-cols-3 gap-4">
                  <label className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-white p-4 hover:bg-gray-50 hover:border-indigo-500 cursor-pointer">
                    <input
                      type="radio"
                      value="3x8"
                      checked={shiftPattern === "3x8"}
                      onChange={(e) => setShiftPattern(e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-xl font-bold">3 × 8</span>
                    <span className="text-sm text-gray-600">Three 8-hour shifts</span>
                  </label>

                  <label className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-white p-4 hover:bg-gray-50 hover:border-indigo-500 cursor-pointer">
                    <input
                      type="radio"
                      value="2x12"
                      checked={shiftPattern === "2x12"}
                      onChange={(e) => setShiftPattern(e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-xl font-bold">2 × 12</span>
                    <span className="text-sm text-gray-600">Two 12-hour shifts</span>
                  </label>

                  <label className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 bg-white p-4 hover:bg-gray-50 hover:border-indigo-500 cursor-pointer">
                    <input
                      type="radio"
                      value="custom"
                      checked={shiftPattern === "custom"}
                      onChange={(e) => setShiftPattern(e.target.value)}
                      className="sr-only"
                    />
                    <span className="text-xl font-bold">Custom</span>
                    <span className="text-sm text-gray-600">Define your own</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="config-name" className="block text-sm font-medium text-gray-700">
                  Configuration Name
                </label>
                <input
                  id="config-name"
                  type="text"
                  placeholder="e.g., Standard Pattern, Night Shift Pattern, etc."
                  value={configName}
                  onChange={(e) => setConfigName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Shift Configuration</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {/* Custom pattern controls - only show when custom pattern is selected */}
                  {shiftPattern === "custom" && (
                    <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-indigo-900">Custom Shift Pattern</h4>
                        <button
                          onClick={addShiftBlock}
                          className="px-3 py-1 border border-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-50 text-sm"
                        >
                          <Plus className="h-4 w-4 mr-1 inline" /> Add Shift
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Create your own shift pattern with custom shifts like "Spring Shift" or "Overlap Shift".
                      </p>
                    </div>
                  )}

                  <div className="relative h-12 bg-white rounded-md border border-gray-200 mb-8">
                    {/* Hour markers */}
                    <div className="absolute inset-0 flex">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div
                          key={`hour-${i}`}
                          className="flex-1 border-r last:border-r-0 border-gray-200"
                        >
                          <div
                            className="absolute -bottom-6 text-xs transform -translate-x-1/2"
                            style={{ left: "50%" }}
                          >
                            {String(i).padStart(2, "0")}:00
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shift blocks */}
                    {shiftBlocks.map((block, index) => {
                      const hours = shiftPattern === "3x8" ? 8 : shiftPattern === "2x12" ? 12 : block.durationHours || 8;
                      const totalBlocks = shiftPattern === "3x8" ? 3 : shiftPattern === "2x12" ? 2 : shiftBlocks.length;

                      // For standard patterns, use even distribution
                      let blockWidth = 100 / totalBlocks;
                      let blockLeft = index * blockWidth;

                      // For custom patterns, calculate based on startTime and duration
                      if (shiftPattern === "custom") {
                        // Calculate percentage position based on 24 hour day
                        const [startHour, startMinute] = block.startTime.split(":").map(Number);
                        const startPercentage = ((startHour * 60 + startMinute) / (24 * 60)) * 100;
                        blockLeft = startPercentage;
                        blockWidth = (hours / 24) * 100;
                      }

                      return (
                        <div
                          key={block.id}
                          className={`absolute top-0 h-full ${block.color} text-white text-xs font-medium flex items-center justify-center`}
                          style={{
                            left: `${blockLeft}%`,
                            width: `${blockWidth}%`,
                          }}
                        >
                          {block.name}
                          <div className="text-[10px] opacity-80 mt-1">
                            {block.startTime} - {calculateShiftEndTime(block.startTime, hours)}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-4 mt-8">
                    {shiftBlocks.map((block) => {
                      const hours = shiftPattern === "3x8" ? 8 : shiftPattern === "2x12" ? 12 : block.durationHours || 8;
                      return (
                        <div
                          key={block.id}
                          className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 border rounded-lg bg-white"
                        >
                          <div>
                            <label htmlFor={`shift-name-${block.id}`} className="block text-xs font-medium text-gray-700">
                              Shift Name
                            </label>
                            <input
                              id={`shift-name-${block.id}`}
                              type="text"
                              value={block.name}
                              onChange={(e) => updateShiftBlock(block.id, { name: e.target.value })}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label htmlFor={`shift-start-${block.id}`} className="block text-xs font-medium text-gray-700">
                              Start Time
                            </label>
                            <select
                              id={`shift-start-${block.id}`}
                              value={block.startTime}
                              onChange={(e) => updateShiftBlock(block.id, { startTime: e.target.value })}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              {generateHourOptions().map((time) => (
                                <option key={`${block.id}-${time}`} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </div>
                          {shiftPattern === "custom" && (
                            <div>
                              <label htmlFor={`shift-duration-${block.id}`} className="block text-xs font-medium text-gray-700">
                                Duration (hours)
                              </label>
                              <select
                                id={`shift-duration-${block.id}`}
                                value={String(block.durationHours || 8)}
                                onChange={(e) =>
                                  updateShiftBlock(block.id, { durationHours: Number.parseInt(e.target.value) })
                                }
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              >
                                {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((hours) => (
                                  <option key={`duration-${hours}`} value={hours.toString()}>
                                    {hours} hours
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                          <div className="flex items-end justify-between">
                            <div>
                              <label className="block text-xs font-medium text-gray-700">End Time</label>
                              <div className="h-10 mt-1 px-3 py-2 rounded-md border border-gray-300 bg-gray-50 text-sm">
                                {calculateShiftEndTime(block.startTime, hours)}
                              </div>
                            </div>

                            {/* Only show remove button for custom patterns with more than one shift */}
                            {shiftPattern === "custom" && shiftBlocks.length > 1 && (
                              <button
                                className="h-10 w-10 text-red-500 hover:bg-red-50 hover:text-red-700 p-2 rounded-md"
                                onClick={() => removeShiftBlock(block.id)}
                                aria-label="Remove shift"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    onClick={saveConfiguration}
                  >
                    <Save className="inline h-4 w-4 mr-2" />
                    Save Shift Pattern
                  </button>
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-md border border-amber-200">
                  <div className="flex">
                    <Info className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-amber-800">Shift Pattern Summary</h4>
                      <p className="text-sm text-amber-700 mt-1">
                        {shiftPattern === "custom"
                          ? `This custom pattern includes ${shiftBlocks.length} shift(s):`
                          : `This ${shiftPattern === "3x8" ? "3×8" : "2×12"} hour pattern provides:`}
                      </p>
                      <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-amber-700">
                        {shiftBlocks.map((block) => {
                          const hours =
                            shiftPattern === "3x8" ? 8 : shiftPattern === "2x12" ? 12 : block.durationHours || 8;
                          return (
                            <li key={block.id}>
                              {block.name}: {block.startTime} to {calculateShiftEndTime(block.startTime, hours)}
                              {shiftPattern === "custom" && ` (${hours} hours)`}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm mt-6">
          <div className="bg-gradient-to-r from-teal-500 to-indigo-600 text-white p-6 rounded-t-lg">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <h2 className="text-lg font-semibold">Saved Configurations</h2>
            </div>
            <p className="text-white/80">Your shift pattern templates</p>
          </div>
          <div className="p-0">
            <div className="h-[300px] overflow-y-auto">
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
                          {config.shiftPattern === "3x8" ? "3×8h pattern" : "2×12h pattern"}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded-md text-xs">
                          {config.shiftBlocks.length} shifts
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-600">
                          Created: {config.createdAt.toLocaleDateString()}
                        </p>
                        <div className="mt-2 text-xs">
                          {config.shiftBlocks.map((block) => (
                            <div key={block.id} className="flex items-center mt-1">
                              <div className={`w-3 h-3 rounded-full ${block.color} mr-2`}></div>
                              <span>
                                {block.name}: {block.startTime} -{" "}
                                {calculateShiftEndTime(block.startTime, config.shiftPattern === "3x8" ? 8 : 12)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-600">No configurations saved yet</div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-semibold">Additional Shift Settings</h2>
            <p className="text-gray-600">Configure advanced shift options</p>
          </div>
          <div className="p-6">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <Info className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800">Shift Configuration</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Configure additional shift settings here. You can set up shift rotations, assign teams to shifts, and
                    more.
                  </p>
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