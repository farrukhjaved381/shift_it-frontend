import React, { useState } from 'react';
import { Calendar, Download, ChevronDown, RotateCcw, Loader2, Printer, Sheet, FileText } from 'lucide-react';
import { subMonths, format, parse } from 'date-fns';

const schools = [
  { id: 1, name: "University of Medical Sciences" },
  { id: 2, name: "State College of Health Sciences" },
  { id: 3, name: "Metropolitan Institute of Healthcare" },
  { id: 4, name: "Pacific Healthcare Academy" },
  { id: 5, name: "Southern Medical University" },
];

const students = [
  {
    id: 1,
    firstName: "Alex",
    lastName: "Johnson",
    school: "University of Medical Sciences",
    attendanceStatus: "Present",
    hepB1: { status: "Complete", date: "2023-01-15" },
    hepB2: { status: "Complete", date: "2023-02-15" },
    hepB3: { status: "Complete", date: "2023-03-15" },
    ppdQtf: { status: "Complete", date: "2023-04-10", secondDate: "2023-04-13" },
    chestXRay: { status: "Complete", date: "2023-04-20", results: "Normal" },
    mmr1: { status: "Complete", date: "2023-01-05", boosterDate: "2023-01-05" },
    vzv1: { status: "Complete", date: "2023-01-10", boosterDate: "2023-01-10" },
    influenza: {
      status: "Complete",
      date: "2023-09-15",
      season: "2023-2024",
      manufacturer: "Sanofi Pasteur",
      lotNumber: "U3742-1A",
      administeredBy: "Dr. Sarah Chen",
    },
    drugScreen: { status: "Complete", date: "2023-05-20" },
    backgroundCheck: { status: "Complete", date: "2023-05-15" },
    blsCpr: { status: "Complete", expirationDate: "2025-05-15" },
    covid19: { status: "Complete", date: "2023-06-10" },
    covidInfection: {
      status: "Negative",
      infectionDate: null,
      recoveryDate: null,
    },
    covidVaccine: {
      vaccinated: true,
      vaccineType: "Pfizer",
      firstDoseDate: "2023-07-01",
      secondDoseDate: "2023-07-22",
      boosterDate: "2024-01-15",
    },
  },
  {
    id: 2,
    firstName: "Taylor",
    lastName: "Smith",
    school: "State College of Health Sciences",
    attendanceStatus: "Absent",
    hepB1: { status: "Complete", date: "2023-02-10" },
    hepB2: { status: "Complete", date: "2023-03-10" },
    hepB3: { status: "Incomplete", date: null },
    ppdQtf: { status: "Complete", date: "2023-04-05", secondDate: "2023-04-08" },
    chestXRay: { status: "Pending", date: null, results: null },
    mmr1: { status: "Complete", date: "2023-01-15", boosterDate: "2023-01-15" },
    vzv1: { status: "Complete", date: "2023-01-20", boosterDate: "2023-01-20" },
    influenza: {
      status: "Complete",
      date: "2023-10-05",
      season: "2023-2024",
      manufacturer: "GlaxoSmithKline",
      lotNumber: "AFLU2245",
      administeredBy: "Dr. Michael Rodriguez",
    },
    drugScreen: { status: "Complete", date: "2023-05-25" },
    backgroundCheck: { status: "Complete", date: "2023-05-20" },
    blsCpr: { status: "Complete", expirationDate: "2025-06-10" },
    covid19: { status: "Complete", date: "2023-06-15" },
    covidInfection: {
      status: "Positive",
      infectionDate: "2023-11-10",
      recoveryDate: "2023-11-25",
    },
    covidVaccine: {
      vaccinated: true,
      vaccineType: "Moderna",
      firstDoseDate: "2023-08-01",
      secondDoseDate: "2023-08-22",
      boosterDate: null,
    },
  },
  {
    id: 3,
    firstName: "Jamie",
    lastName: "Williams",
    school: "Metropolitan Institute of Healthcare",
    attendanceStatus: "Present",
    hepB1: { status: "Complete", date: "2023-01-20" },
    hepB2: { status: "Complete", date: "2023-02-20" },
    hepB3: { status: "Complete", date: "2023-03-20" },
    ppdQtf: { status: "Incomplete", date: null, secondDate: null },
    chestXRay: { status: "Complete", date: "2023-04-25", results: "Normal" },
    mmr1: { status: "Complete", date: "2023-01-25", boosterDate: "2023-01-25" },
    vzv1: { status: "Complete", date: "2023-01-30", boosterDate: "2023-01-30" },
    influenza: {
      status: "Incomplete",
      date: null,
      season: null,
      manufacturer: null,
      lotNumber: null,
      administeredBy: null,
    },
    drugScreen: { status: "Incomplete", date: null },
    backgroundCheck: { status: "Complete", date: "2023-05-30" },
    blsCpr: { status: "Complete", expirationDate: "2025-07-15" },
    covid19: { status: "Complete", date: "2023-06-20" },
    covidInfection: {
      status: "Negative",
      infectionDate: null,
      recoveryDate: null,
    },
    covidVaccine: {
      vaccinated: false,
      vaccineType: null,
      firstDoseDate: null,
      secondDoseDate: null,
      boosterDate: null,
    },
  },
  {
    id: 4,
    firstName: "Morgan",
    lastName: "Chen",
    school: "Pacific Healthcare Academy",
    attendanceStatus: "Late",
    hepB1: { status: "Complete", date: "2023-02-05" },
    hepB2: { status: "Complete", date: "2023-03-05" },
    hepB3: { status: "Complete", date: "2023-04-05" },
    ppdQtf: { status: "Complete", date: "2023-05-10", secondDate: "2023-05-13" },
    chestXRay: { status: "Complete", date: "2023-05-20", results: "Normal" },
    mmr1: { status: "Incomplete", date: null, boosterDate: null },
    vzv1: { status: "Complete", date: "2023-02-10", boosterDate: "2023-02-10" },
    influenza: {
      status: "Complete",
      date: "2023-09-22",
      season: "2023-2024",
      manufacturer: "Seqirus",
      lotNumber: "FL23-B4421",
      administeredBy: "Dr. Lisa Johnson",
    },
    drugScreen: { status: "Complete", date: "2023-06-05" },
    backgroundCheck: { status: "Incomplete", date: null },
    blsCpr: { status: "Complete", expirationDate: "2025-08-10" },
    covid19: { status: "Complete", date: "2023-06-25" },
    covidInfection: {
      status: "Unknown",
      infectionDate: null,
      recoveryDate: null,
    },
    covidVaccine: {
      vaccinated: true,
      vaccineType: "Johnson & Johnson",
      firstDoseDate: "2023-09-01",
      secondDoseDate: null,
      boosterDate: "2024-03-15",
    },
  },
  {
    id: 5,
    firstName: "Jordan",
    lastName: "Rodriguez",
    school: "Southern Medical University",
    attendanceStatus: "Present",
    hepB1: { status: "Complete", date: "2023-02-15" },
    hepB2: { status: "Complete", date: "2023-03-15" },
    hepB3: { status: "Complete", date: "2023-04-15" },
    ppdQtf: { status: "Complete", date: "2023-05-15", secondDate: "2023-05-18" },
    chestXRay: { status: "Complete", date: "2023-05-25", results: "Normal" },
    mmr1: { status: "Complete", date: "2023-02-20", boosterDate: "2023-02-20" },
    vzv1: { status: "Incomplete", date: null, boosterDate: null },
    influenza: {
      status: "Complete",
      date: "2023-10-15",
      season: "2023-2024",
      manufacturer: "Sanofi Pasteur",
      lotNumber: "U3742-2B",
      administeredBy: "Dr. James Wilson",
    },
    drugScreen: { status: "Complete", date: "2023-06-10" },
    backgroundCheck: { status: "Complete", date: "2023-06-05" },
    blsCpr: { status: "Incomplete", expirationDate: null },
    covid19: { status: "Complete", date: "2023-06-30" },
    covidInfection: {
      status: "Negative",
      infectionDate: null,
      recoveryDate: null,
    },
    covidVaccine: {
      vaccinated: true,
      vaccineType: "Pfizer",
      firstDoseDate: "2023-07-15",
      secondDoseDate: "2023-08-05",
      boosterDate: null,
    },
  },
];

const documentTypes = [
  { id: "all", name: "All Documentation" },
  { id: "hepB", name: "Hepatitis B (All Doses)" },
  { id: "hepB1", name: "Hepatitis B - Dose #1" },
  { id: "hepB2", name: "Hepatitis B - Dose #2" },
  { id: "hepB3", name: "Hepatitis B - Dose #3" },
  { id: "ppdQtf", name: "PPD or QTF" },
  { id: "chestXRay", name: "Chest X-Ray" },
  { id: "mmr1", name: "MMR-1" },
  { id: "vzv1", name: "VZV-1" },
  { id: "influenza", name: "Influenza" },
  { id: "drugScreen", name: "Drug Screen" },
  { id: "backgroundCheck", name: "Background Check" },
  { id: "blsCpr", name: "BLS/CPR" },
  { id: "covid19", name: "COVID-19" },
];

const ReportsComponent = () => {
  const currentDate = new Date(2025, 8, 16);
  const [dateRange, setDateRange] = useState({
    from: subMonths(currentDate, 1),
    to: currentDate,
  });
  const [dateRangeStr, setDateRangeStr] = useState(`${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`);
  const [selectedSchool, setSelectedSchool] = useState('all');
  const [selectedDocType, setSelectedDocType] = useState('all');
  const [activeTab, setActiveTab] = useState('attendance');
  const [attendanceReportData, setAttendanceReportData] = useState(students);
  const [documentationReportData, setDocumentationReportData] = useState(students);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'text-green-600';
      case 'Absent': return 'text-red-600';
      case 'Late': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const filterStudentData = () => {
    const parts = dateRangeStr.split(' - ');
    let fromDate = dateRange.from;
    let toDate = dateRange.to;
    if (parts.length === 2) {
      const parsedFrom = parse(parts[0], 'MMM d, yyyy', new Date());
      const parsedTo = parse(parts[1], 'MMM d, yyyy', new Date());
      if (!isNaN(parsedFrom) && !isNaN(parsedTo)) {
        fromDate = parsedFrom;
        toDate = parsedTo;
      }
    }

    let filteredAttendanceData = [...students];
    let filteredDocumentationData = [...students];

    if (selectedSchool !== 'all') {
      filteredAttendanceData = filteredAttendanceData.filter((student) => student.school === selectedSchool);
      filteredDocumentationData = filteredDocumentationData.filter((student) => student.school === selectedSchool);
    }

    filteredDocumentationData = filteredDocumentationData.filter((student) => {
      const documentDates = [
        student.hepB1.date,
        student.hepB2.date,
        student.hepB3.date,
        student.ppdQtf.date,
        student.chestXRay.date,
        student.mmr1.date,
        student.vzv1.date,
        student.influenza.date,
        student.drugScreen.date,
        student.backgroundCheck.date,
        student.covid19.date,
      ].filter(Boolean);
      return documentDates.some((dateStr) => {
        if (!dateStr) return false;
        const docDate = new Date(dateStr);
        return docDate >= fromDate && docDate <= toDate;
      });
    });

    if (activeTab === 'documentation' && selectedDocType !== 'all') {
      filteredDocumentationData = filteredDocumentationData.filter((student) => {
        switch (selectedDocType) {
          case 'hepB':
            return (
              student.hepB1.status === 'Complete' ||
              student.hepB2.status === 'Complete' ||
              student.hepB3.status === 'Complete'
            );
          case 'hepB1':
            return student.hepB1.status === 'Complete';
          case 'hepB2':
            return student.hepB2.status === 'Complete';
          case 'hepB3':
            return student.hepB3.status === 'Complete';
          case 'ppdQtf':
            return student.ppdQtf.status === 'Complete';
          case 'chestXRay':
            return student.chestXRay.status === 'Complete';
          case 'mmr1':
            return student.mmr1.status === 'Complete';
          case 'vzv1':
            return student.vzv1.status === 'Complete';
          case 'influenza':
            return student.influenza.status === 'Complete';
          case 'drugScreen':
            return student.drugScreen.status === 'Complete';
          case 'backgroundCheck':
            return student.backgroundCheck.status === 'Complete';
          case 'blsCpr':
            return student.blsCpr.status === 'Complete';
          case 'covid19':
            return student.covid19.status === 'Complete';
          default:
            return true;
        }
      });
    }

    setAttendanceReportData(filteredAttendanceData);
    setDocumentationReportData(filteredDocumentationData);
  };

  const handleResetFilters = () => {
    const defaultFrom = subMonths(currentDate, 1);
    const defaultTo = currentDate;
    setDateRange({ from: defaultFrom, to: defaultTo });
    setDateRangeStr(`${format(defaultFrom, 'MMM d, yyyy')} - ${format(defaultTo, 'MMM d, yyyy')}`);
    setSelectedSchool('all');
    setSelectedDocType('all');
    filterStudentData();
  };

  const exportReport = (format, reportType) => {
    const timestamp = format(new Date(), "yyyy-MM-dd_HH-mm");
    const fileName = `${reportType}_${timestamp}.${format === "excel" ? "xlsx" : "pdf"}`;
    console.log(`Exporting ${reportType} as ${format}: ${fileName}`);
    setTimeout(() => {
      alert(
        `${fileName} has been downloaded. In a production environment, this would trigger the actual file download.`
      );
    }, 1000);
  };

  const ExportOptions = ({ reportType }) => {
    const [open, setOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = (format) => {
      setIsExporting(true);
      setTimeout(() => {
        exportReport(format, reportType);
        setIsExporting(false);
        setOpen(false);
      }, 1000);
    };

    return (
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md flex items-center"
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Export
              <ChevronDown className="h-4 w-4 ml-2" />
            </>
          )}
        </button>
        {open && (
          <div className="absolute z-10 bg-white shadow-md rounded-md p-1 min-w-[200px] right-0">
            <div
              onClick={() => handleExport("excel")}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              <Sheet className="h-4 w-4" />
              Export as Excel
            </div>
            <div
              onClick={() => handleExport("pdf")}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Export as PDF
            </div>
            <hr className="my-1 border-gray-200" />
            <div
              onClick={() => { window.print(); setOpen(false); }}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Print Report
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDocumentationReport = () => {
    if (selectedDocType === "all") {
      return renderAllDocumentationReport();
    } else if (selectedDocType === "hepB") {
      return renderHepBReport();
    } else {
      return renderSingleDocumentReport();
    }
  };

  const renderAllDocumentationReport = () => {
    return (
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">First Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Last Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">School</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">HEP B #1</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">HEP B #2</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">HEP B #3</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">PPD/QTF</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Chest X-Ray</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">MMR-1</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">VZV-1</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Influenza</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Drug Screen</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Background Check</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">BLS/CPR</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">COVID-19</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {documentationReportData.map((student) => (
            <tr key={student.id}>
              <td className="px-6 py-4 text-sm text-gray-900">{student.firstName}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.lastName}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.school}</td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {student.hepB1.status}
                {student.hepB1.date && <div className="text-xs text-gray-500">{student.hepB1.date}</div>}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {student.hepB2.status}
                {student.hepB2.date && <div className="text-xs text-gray-500">{student.hepB2.date}</div>}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {student.hepB3.status}
                {student.hepB3.date && <div className="text-xs text-gray-500">{student.hepB3.date}</div>}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {student.ppdQtf.status}
                {student.ppdQtf.date && (
                  <div className="text-xs text-gray-500">
                    {student.ppdQtf.date}
                    {student.ppdQtf.secondDate && ` / ${student.ppdQtf.secondDate}`}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {student.chestXRay.status}
                {student.chestXRay.date && (
                  <div className="text-xs text-gray-500">
                    {student.chestXRay.date}
                    {student.chestXRay.results && ` (${student.chestXRay.results})`}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {student.mmr1.status}
                {student.mmr1.date && (
                  <div className="text-xs text-gray-500">
                    {student.mmr1.date}
                    {student.mmr1.boosterDate && student.mmr1.boosterDate !== student.mmr1.date && (
                      <span> (Booster: {student.mmr1.boosterDate})</span>
                    )}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {student.vzv1.status}
                {student.vzv1.date && (
                  <div className="text-xs text-gray-500">
                    {student.vzv1.date}
                    {student.vzv1.boosterDate && student.vzv1.boosterDate !== student.vzv1.date && (
                      <span> (Booster: {student.vzv1.boosterDate})</span>
                    )}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {student.influenza.status}
                {student.influenza.date && <div className="text-xs text-gray-500">{student.influenza.date}</div>}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {student.drugScreen.status}
                {student.drugScreen.date && <div className="text-xs text-gray-500">{student.drugScreen.date}</div>}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {student.backgroundCheck.status}
                {student.backgroundCheck.date && (
                  <div className="text-xs text-gray-500">{student.backgroundCheck.date}</div>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {student.blsCpr.status}
                {student.blsCpr.expirationDate && (
                  <div className="text-xs text-gray-500">Exp: {student.blsCpr.expirationDate}</div>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {student.covid19.status}
                {student.covid19.date && <div className="text-xs text-gray-500">{student.covid19.date}</div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderHepBReport = () => {
    return (
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">First Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Last Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">School</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">HEP B #1 Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">HEP B #1 Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">HEP B #2 Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">HEP B #2 Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">HEP B #3 Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">HEP B #3 Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Overall Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {documentationReportData.map((student) => {
            const overallStatus =
              student.hepB1.status === "Complete" &&
              student.hepB2.status === "Complete" &&
              student.hepB3.status === "Complete"
                ? "Complete"
                : "Incomplete";
            return (
              <tr key={student.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{student.firstName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.lastName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.school}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.hepB1.status}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.hepB1.date || "N/A"}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.hepB2.status}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.hepB2.date || "N/A"}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.hepB3.status}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.hepB3.date || "N/A"}</td>
                <td className={`px-6 py-4 text-sm font-medium ${overallStatus === "Complete" ? "text-green-600" : "text-red-600"}`}>
                  {overallStatus}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const renderSingleDocumentReport = () => {
    const docTypeName = documentTypes.find((dt) => dt.id === selectedDocType)?.name || "";
    const getDocumentData = (student) => {
      switch (selectedDocType) {
        case "hepB1":
          return {
            status: student.hepB1.status,
            date: student.hepB1.date,
            additionalInfo: null,
          };
        case "hepB2":
          return {
            status: student.hepB2.status,
            date: student.hepB2.date,
            additionalInfo: null,
          };
        case "hepB3":
          return {
            status: student.hepB3.status,
            date: student.hepB3.date,
            additionalInfo: null,
          };
        case "ppdQtf":
          return {
            status: student.ppdQtf.status,
            date: student.ppdQtf.date,
            additionalInfo: student.ppdQtf.secondDate ? `Second Date: ${student.ppdQtf.secondDate}` : null,
          };
        case "chestXRay":
          return {
            status: student.chestXRay.status,
            date: student.chestXRay.date,
            additionalInfo: student.chestXRay.results,
          };
        case "mmr1":
          return {
            status: student.mmr1.status,
            date: student.mmr1.date,
            additionalInfo:
              student.mmr1.boosterDate && student.mmr1.boosterDate !== student.mmr1.date
                ? `Booster: ${student.mmr1.boosterDate}`
                : null,
          };
        case "vzv1":
          return {
            status: student.vzv1.status,
            date: student.vzv1.date,
            additionalInfo:
              student.vzv1.boosterDate && student.vzv1.boosterDate !== student.vzv1.date
                ? `Booster: ${student.vzv1.boosterDate}`
                : null,
          };
        case "influenza":
          return {
            status: student.influenza.status,
            date: student.influenza.date,
            additionalInfo: student.influenza.season ? `Season: ${student.influenza.season}` : null,
          };
        case "drugScreen":
          return {
            status: student.drugScreen.status,
            date: student.drugScreen.date,
            additionalInfo: null,
          };
        case "backgroundCheck":
          return {
            status: student.backgroundCheck.status,
            date: student.backgroundCheck.date,
            additionalInfo: null,
          };
        case "blsCpr":
          return {
            status: student.blsCpr.status,
            date: null,
            additionalInfo: student.blsCpr.expirationDate ? `Expires: ${student.blsCpr.expirationDate}` : null,
          };
        case "covid19":
          return {
            status: student.covid19.status,
            date: student.covid19.date,
            additionalInfo: null,
          };
        default:
          return {
            status: "Unknown",
            date: null,
            additionalInfo: null,
          };
      }
    };
    return (
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">First Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Last Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">School</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">{docTypeName} Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">{docTypeName} Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Additional Information</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {documentationReportData.map((student) => {
            const docData = getDocumentData(student);
            return (
              <tr key={student.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{student.firstName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.lastName}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{student.school}</td>
                <td className={`px-6 py-4 text-sm font-medium ${docData.status === "Complete" ? "text-green-600" : "text-red-600"}`}>
                  {docData.status}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{docData.date || "N/A"}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{docData.additionalInfo || "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const renderCovidSummary = () => (
    <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">COVID-19 Summary Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {documentationReportData.filter((s) => s.covidInfection.status === "Positive").length}
            </div>
            <div className="text-sm text-gray-600">COVID Positive</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {documentationReportData.filter((s) => s.covidVaccine.vaccinated).length}
            </div>
            <div className="text-sm text-gray-600">Vaccinated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {documentationReportData.filter((s) => s.covidVaccine.boosterDate).length}
            </div>
            <div className="text-sm text-gray-600">Boosted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(
                (documentationReportData.filter((s) => s.covidVaccine.vaccinated).length /
                  documentationReportData.length) *
                  100
              )}
              %
            </div>
            <div className="text-sm text-gray-600">Vaccination Rate</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCovidReport = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-900">COVID-19 Health Report</h3>
          <p className="text-sm text-gray-600">Track student COVID infections, vaccinations, and vaccine types</p>
        </div>
        <ExportOptions reportType="COVID19_Health_Report" />
      </div>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">First Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Last Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">School</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">COVID Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Infection Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Recovery Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Vaccinated</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Vaccine Type</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">First Dose</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Second Dose</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Booster</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {documentationReportData.map((student) => (
            <tr key={student.id}>
              <td className="px-6 py-4 text-sm text-gray-900">{student.firstName}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.lastName}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.school}</td>
              <td className={`px-6 py-4 text-sm font-medium ${
                student.covidInfection.status === "Positive"
                  ? "text-red-600"
                  : student.covidInfection.status === "Negative"
                  ? "text-green-600"
                  : "text-gray-600"
              }`}>
                {student.covidInfection.status}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.covidInfection.infectionDate || "N/A"}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.covidInfection.recoveryDate || "N/A"}</td>
              <td className={`px-6 py-4 text-sm font-medium ${
                student.covidVaccine.vaccinated
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
                {student.covidVaccine.vaccinated ? "Yes" : "No"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.covidVaccine.vaccineType || "N/A"}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.covidVaccine.firstDoseDate || "N/A"}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.covidVaccine.secondDoseDate || "N/A"}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.covidVaccine.boosterDate || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFluSummary = () => (
    <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Flu Vaccination Summary Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {documentationReportData.filter((s) => s.influenza.status === "Complete").length}
            </div>
            <div className="text-sm text-gray-600">Vaccinated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {documentationReportData.filter((s) => s.influenza.status !== "Complete").length}
            </div>
            <div className="text-sm text-gray-600">Not Vaccinated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(
                (documentationReportData.filter((s) => s.influenza.status === "Complete").length /
                  documentationReportData.length) *
                  100
              )}
              %
            </div>
            <div className="text-sm text-gray-600">Vaccination Rate</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFluReport = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Flu Vaccination Report</h3>
          <p className="text-sm text-gray-600">Track student flu vaccinations and administration details</p>
        </div>
        <ExportOptions reportType="Flu_Vaccination_Report" />
      </div>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">First Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Last Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">School</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Vaccination Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date Administered</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Season</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Manufacturer</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Lot Number</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Administered By</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {documentationReportData.map((student) => (
            <tr key={student.id}>
              <td className="px-6 py-4 text-sm text-gray-900">{student.firstName}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.lastName}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.school}</td>
              <td className={`px-6 py-4 text-sm font-medium ${
                student.influenza.status === "Complete"
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
                {student.influenza.status}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.influenza.date || "N/A"}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.influenza.season || "N/A"}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.influenza.manufacturer || "N/A"}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.influenza.lotNumber || "N/A"}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{student.influenza.administeredBy || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6 font-sans">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports</h1>
      <p className="text-sm text-gray-600 mb-6">Generate and manage clinical rotation reports</p>

      <nav className="flex space-x-6 border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`pb-2 ${activeTab === 'attendance' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
        >
          Attendance Report
        </button>
        <button
          onClick={() => setActiveTab('documentation')}
          className={`pb-2 ${activeTab === 'documentation' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
        >
          Documentation Report
        </button>
        <button
          onClick={() => setActiveTab('covid')}
          className={`pb-2 ${activeTab === 'covid' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
        >
          COVID-19 Report
        </button>
        <button
          onClick={() => setActiveTab('flu')}
          className={`pb-2 ${activeTab === 'flu' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
        >
          Flu Vaccine Report
        </button>
      </nav>

      <h2 className="text-xl font-bold text-gray-900 mb-2">Filters</h2>
      <p className="text-sm text-gray-600 mb-4">Apply filters to the reports</p>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <div className="relative">
            <input
              type="text"
              value={dateRangeStr}
              onChange={(e) => setDateRangeStr(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
          <div className="relative">
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white appearance-none"
            >
              <option value="all">All Schools</option>
              {schools.map((school) => (
                <option key={school.id} value={school.name}>
                  {school.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {activeTab === 'documentation' && (
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
            <div className="relative">
              <select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white appearance-none"
              >
                {documentTypes.map((docType) => (
                  <option key={docType.id} value={docType.id}>
                    {docType.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={filterStudentData}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center"
        >
          <ChevronDown className="h-5 w-5 mr-2" />
          Apply Filters
        </button>
        <button
          onClick={handleResetFilters}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md flex items-center"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          Reset Filters
        </button>
      </div>

      {activeTab === 'attendance' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Student Attendance Report</h3>
              <p className="text-sm text-gray-600">View student attendance records</p>
            </div>
            <ExportOptions reportType="Attendance_Report" />
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">First Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Last Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">School</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendanceReportData.map((student, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.firstName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.lastName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.school}</td>
                  <td className={`px-6 py-4 text-sm font-medium ${getStatusColor(student.attendanceStatus)}`}>
                    {student.attendanceStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'documentation' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {selectedDocType === "all"
                  ? "Complete Documentation Status Report"
                  : selectedDocType === "hepB"
                  ? "Hepatitis B Series Report"
                  : `${documentTypes.find((dt) => dt.id === selectedDocType)?.name} Report`}
              </h3>
              <p className="text-sm text-gray-600">
                {selectedDocType === "all"
                  ? "View all student documentation completion status"
                  : `View student ${
                      documentTypes.find((dt) => dt.id === selectedDocType)?.name
                    } documentation status`}
              </p>
            </div>
            <ExportOptions
              reportType={
                selectedDocType === "all"
                  ? "Complete_Documentation_Report"
                  : `${documentTypes.find((dt) => dt.id === selectedDocType)?.name}_Report`
              }
            />
          </div>
          {renderDocumentationReport()}
        </div>
      )}

      {activeTab === 'covid' && (
        <>
          {renderCovidSummary()}
          {renderCovidReport()}
        </>
      )}

      {activeTab === 'flu' && (
        <>
          {renderFluSummary()}
          {renderFluReport()}
        </>
      )}
    </div>
  );
};

export default ReportsComponent;