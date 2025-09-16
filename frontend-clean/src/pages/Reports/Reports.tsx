import './Reports.css';

const Reports = () => {
  // Sample reports data
  const reports = [
    {
      id: 'REP-001',
      title: 'Monthly Inventory Summary',
      description: 'Summary of inventory levels, additions, and depletions for the past month',
      date: '2023-10-15',
      type: 'Inventory'
    },
    {
      id: 'REP-002',
      title: 'Supplier Performance',
      description: 'Analysis of supplier delivery times, quality ratings, and fulfillment rates',
      date: '2023-10-10',
      type: 'Supplier'
    },
    {
      id: 'REP-003',
      title: 'Track Fitting Consumption',
      description: 'Consumption patterns of track fittings across different regions and time periods',
      date: '2023-10-05',
      type: 'Consumption'
    },
    {
      id: 'REP-004',
      title: 'Quality Inspection Results',
      description: 'Summary of quality inspections and test results for received materials',
      date: '2023-09-28',
      type: 'Quality'
    },
    {
      id: 'REP-005',
      title: 'Maintenance Schedule',
      description: 'Upcoming maintenance activities and resource requirements',
      date: '2023-09-25',
      type: 'Maintenance'
    },
    {
      id: 'REP-006',
      title: 'Budget Utilization',
      description: 'Analysis of budget allocation and utilization across departments',
      date: '2023-09-20',
      type: 'Finance'
    }
  ];

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h2>Reports</h2>
      </div>

      <div className="report-filters">
        <select className="filter-select">
          <option value="">All Report Types</option>
          <option value="Inventory">Inventory</option>
          <option value="Supplier">Supplier</option>
          <option value="Consumption">Consumption</option>
          <option value="Quality">Quality</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Finance">Finance</option>
        </select>

        <select className="filter-select">
          <option value="">All Time Periods</option>
          <option value="Last Week">Last Week</option>
          <option value="Last Month">Last Month</option>
          <option value="Last Quarter">Last Quarter</option>
          <option value="Last Year">Last Year</option>
        </select>
      </div>

      <div className="reports-grid">
        {reports.map((report) => (
          <div key={report.id} className="report-card">
            <h3>{report.title}</h3>
            <p>{report.description}</p>
            <div className="report-actions">
              <span className="report-date">Generated: {report.date}</span>
              <button className="btn-secondary">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;