// useState is actually used in the Dashboard component
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  FiPackage, FiUsers, FiAlertCircle, FiClipboard, 
  FiTrendingUp, FiTrendingDown, FiAlertTriangle 
} from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data for charts
  const inventoryTrend = [
    { name: 'Jan', value: 2800 },
    { name: 'Feb', value: 3200 },
    { name: 'Mar', value: 3500 },
    { name: 'Apr', value: 3100 },
    { name: 'May', value: 3400 },
    { name: 'Jun', value: 3800 },
    { name: 'Jul', value: 3542 },
  ];
  
  const consumptionData = [
    { name: 'Rail Clips', value: 35 },
    { name: 'Fish Plates', value: 25 },
    { name: 'Bolts', value: 15 },
    { name: 'Sleepers', value: 10 },
    { name: 'Others', value: 15 },
  ];
  
  const supplierPerformance = [
    { name: 'Jindal Steel', performance: 92 },
    { name: 'Tata Steel', performance: 88 },
    { name: 'SAIL', performance: 76 },
    { name: 'Metro Distributors', performance: 65 },
    { name: 'Global Rail', performance: 45 },
  ];
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  // Sample activities for demo
  const recentActivities = [
    { 
      id: 1, 
      action: 'ERC-1234 added to inventory', 
      user: 'John Doe', 
      time: '10 minutes ago',
      type: 'inventory'
    },
    { 
      id: 2, 
      action: 'Inspection completed for Lot #4567', 
      user: 'Jane Smith', 
      time: '2 hours ago',
      type: 'inspection'
    },
    { 
      id: 3, 
      action: 'New shipment received from Supplier XYZ', 
      user: 'Mike Johnson', 
      time: '5 hours ago',
      type: 'supplier'
    },
    { 
      id: 4, 
      action: 'Monthly report generated', 
      user: 'Sarah Williams', 
      time: 'Yesterday',
      type: 'report'
    },
    { 
      id: 5, 
      action: 'Low stock alert for Track Bolts', 
      user: 'System', 
      time: 'Yesterday',
      type: 'alert'
    },
  ];
  
  // Function to get icon for activity type
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'inventory':
        return <FiPackage className="activity-icon inventory" />;
      case 'inspection':
        return <FiClipboard className="activity-icon inspection" />;
      case 'supplier':
        return <FiUsers className="activity-icon supplier" />;
      case 'report':
        return <FiTrendingUp className="activity-icon report" />;
      case 'alert':
        return <FiAlertTriangle className="activity-icon alert" />;
      default:
        return <FiPackage className="activity-icon" />;
    }
  };
  
  // Helper function to format large numbers
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-IN');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="dashboard-date">
          {new Date().toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
      
      <div className="dashboard-welcome">
        <h3>Welcome to RailTrack Insights</h3>
        <p>A comprehensive Track Fitting Management System for Indian Railways</p>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FiPackage />
          </div>
          <div className="stat-content">
            <h3>Total Inventory</h3>
            <p className="stat-value">{formatNumber(3542)}</p>
            <div className="stat-change positive">
              <FiTrendingUp /> <span>+8.2% from last month</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FiUsers />
          </div>
          <div className="stat-content">
            <h3>Suppliers</h3>
            <p className="stat-value">{formatNumber(27)}</p>
            <div className="stat-change positive">
              <FiTrendingUp /> <span>+2 new this month</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon alert">
            <FiAlertCircle />
          </div>
          <div className="stat-content">
            <h3>Low Stock Items</h3>
            <p className="stat-value">{formatNumber(12)}</p>
            <div className="stat-change negative">
              <FiTrendingUp /> <span>+4 since last week</span>
            </div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon warning">
            <FiClipboard />
          </div>
          <div className="stat-content">
            <h3>Pending Inspections</h3>
            <p className="stat-value">{formatNumber(8)}</p>
            <div className="stat-change negative">
              <FiTrendingDown /> <span>-3 from yesterday</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-charts">
        <div className="chart-container">
          <div className="chart-header">
            <h3>Inventory Trend</h3>
            <select className="chart-filter">
              <option value="6months">Last 6 Months</option>
              <option value="year">Last Year</option>
              <option value="quarter">Last Quarter</option>
            </select>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={inventoryTrend}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0066cc"
                  activeDot={{ r: 8 }}
                  name="Items"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="charts-row">
          <div className="chart-container half">
            <div className="chart-header">
              <h3>Consumption by Type</h3>
            </div>
            <div className="chart-body">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={consumptionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {consumptionData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="chart-container half">
            <div className="chart-header">
              <h3>Supplier Performance</h3>
            </div>
            <div className="chart-body">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={supplierPerformance}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="performance" fill="#0066cc" name="Performance Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <div className="activity-list">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="activity-item">
              {getActivityIcon(activity.type)}
              <div className="activity-content">
                <div className="activity-text">{activity.action}</div>
                <div className="activity-meta">
                  <span className="activity-user">{activity.user}</span>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;