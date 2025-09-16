import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import './Analytics.css';

const Analytics = () => {
  // Sample metrics data
  const metrics = [
    { 
      label: 'Inventory Turnover',
      value: '3.7',
      trend: 'up',
      percentage: '12%'
    },
    { 
      label: 'Avg. Supplier Lead Time',
      value: '18.5',
      trend: 'down',
      percentage: '8%'
    },
    { 
      label: 'Defect Rate',
      value: '2.1%',
      trend: 'down',
      percentage: '15%'
    },
    { 
      label: 'Stock Accuracy',
      value: '97.8%',
      trend: 'up',
      percentage: '3%'
    }
  ];

  // Sample table data for top consumed items
  const topItems = [
    { name: 'Rail Clips', consumed: 8750, reorderPoint: 1500, currentStock: 2370 },
    { name: 'Fish Plates', consumed: 6420, reorderPoint: 1000, currentStock: 1850 },
    { name: 'Track Bolts', consumed: 5900, reorderPoint: 800, currentStock: 1200 },
    { name: 'Rail Pads', consumed: 4850, reorderPoint: 700, currentStock: 950 },
    { name: 'Sleeper Screws', consumed: 3600, reorderPoint: 500, currentStock: 620 }
  ];

  // Data for Monthly Inventory Movement Chart
  const inventoryMovementData = [
    { month: 'Jan', incoming: 1200, outgoing: 1000, level: 4200 },
    { month: 'Feb', incoming: 1500, outgoing: 1300, level: 4400 },
    { month: 'Mar', incoming: 1300, outgoing: 1500, level: 4200 },
    { month: 'Apr', incoming: 1800, outgoing: 1400, level: 4600 },
    { month: 'May', incoming: 1400, outgoing: 1600, level: 4400 },
    { month: 'Jun', incoming: 2000, outgoing: 1700, level: 4700 },
    { month: 'Jul', incoming: 1700, outgoing: 1900, level: 4500 },
    { month: 'Aug', incoming: 1500, outgoing: 1400, level: 4600 },
    { month: 'Sep', incoming: 1800, outgoing: 1700, level: 4700 },
    { month: 'Oct', incoming: 1900, outgoing: 1600, level: 5000 },
    { month: 'Nov', incoming: 1700, outgoing: 1800, level: 4900 },
    { month: 'Dec', incoming: 1600, outgoing: 1700, level: 4800 }
  ];

  // Data for Supplier Performance Chart
  const supplierPerformanceData = [
    { name: 'Tata Steel', onTime: 92, quality: 98, costEff: 85 },
    { name: 'Jindal Steel', onTime: 87, quality: 95, costEff: 90 },
    { name: 'SAIL', onTime: 89, quality: 92, costEff: 88 },
    { name: 'Metro Distributors', onTime: 78, quality: 85, costEff: 92 },
    { name: 'Global Rail', onTime: 82, quality: 90, costEff: 79 }
  ];

  // Data for Quality Metrics Chart
  const qualityMetricsData = [
    { month: 'Jan', defectRate: 2.4, inspectionCoverage: 78 },
    { month: 'Feb', defectRate: 2.7, inspectionCoverage: 80 },
    { month: 'Mar', defectRate: 2.5, inspectionCoverage: 82 },
    { month: 'Apr', defectRate: 2.2, inspectionCoverage: 85 },
    { month: 'May', defectRate: 2.0, inspectionCoverage: 86 },
    { month: 'Jun', defectRate: 1.9, inspectionCoverage: 87 },
    { month: 'Jul', defectRate: 1.8, inspectionCoverage: 89 },
    { month: 'Aug', defectRate: 1.9, inspectionCoverage: 90 },
    { month: 'Sep', defectRate: 2.1, inspectionCoverage: 90 },
    { month: 'Oct', defectRate: 2.0, inspectionCoverage: 91 },
    { month: 'Nov', defectRate: 1.8, inspectionCoverage: 92 },
    { month: 'Dec', defectRate: 1.7, inspectionCoverage: 94 }
  ];

  // Data for Consumption by Category Chart
  const consumptionCategoryData = [
    { name: 'Fastening Systems', value: 45 },
    { name: 'Track Infrastructure', value: 30 },
    { name: 'Signaling Equipment', value: 15 },
    { name: 'Maintenance Tools', value: 10 }
  ];

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2>Analytics Dashboard</h2>
        <div className="chart-filters">
          <select className="filter-select">
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="180">Last 6 Months</option>
            <option value="365">Last Year</option>
          </select>
        </div>
      </div>

      <div className="metrics-row">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-trend ${metric.trend === 'up' ? 'trend-up' : 'trend-down'}`}>
              {metric.trend === 'up' ? '↑' : '↓'} {metric.percentage}
            </div>
          </div>
        ))}
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h3>Monthly Inventory Movement</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={inventoryMovementData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="incoming"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  name="Incoming"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="outgoing"
                  stroke="#82ca9d"
                  name="Outgoing"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="level"
                  stroke="#ff7300"
                  name="Inventory Level"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-card">
          <h3>Supplier Performance</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={supplierPerformanceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="onTime" name="On-Time Delivery %" fill="#8884d8" />
                <Bar dataKey="quality" name="Quality Score %" fill="#82ca9d" />
                <Bar dataKey="costEff" name="Cost Efficiency %" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-card">
          <h3>Quality Metrics</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart
                data={qualityMetricsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" domain={[0, 5]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="defectRate"
                  stroke="#ff7300"
                  name="Defect Rate (%)"
                />
                <Bar
                  yAxisId="right"
                  dataKey="inspectionCoverage"
                  fill="#413ea0"
                  name="Inspection Coverage (%)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-card">
          <h3>Consumption by Category</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={310}>
              <PieChart>
                <Pie
                  data={consumptionCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label
                >
                  {consumptionCategoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <h3>Top Consumed Items</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Consumed (Units)</th>
            <th>Reorder Point</th>
            <th>Current Stock</th>
          </tr>
        </thead>
        <tbody>
          {topItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.consumed.toLocaleString()}</td>
              <td>{item.reorderPoint.toLocaleString()}</td>
              <td>{item.currentStock.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analytics;