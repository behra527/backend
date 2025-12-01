import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  DownloadOutlined,
  ShoppingCartOutlined,
  PeopleAltOutlined,
  PaymentsOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  Header,
  StatBox,
  LineChart,
  ProgressCircle,
  BarChart,
} from "../../components";
import { tokens } from "../../theme";
import api from "../../api";
import { formatCurrency, formatCurrencyShort } from '../../utils/currency';

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    totalProducts: 0,
    loading: true,
  });
  const [revenueData, setRevenueData] = useState([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true }));
      const [ordersRes, usersRes, productsRes, categoriesRes] = await Promise.all([
        api.get('/orders'),
        api.get('/users'),
        api.get('/products?pageNumber=1&pageSize=1000'), // Get all products
        api.get('/categories'),
      ]);

      const orders = ordersRes.data || [];
      const users = usersRes.data || [];
      const products = productsRes.data?.products || [];
      const categories = categoriesRes.data || [];

      // Calculate total revenue
      const totalRevenue = orders.reduce((sum, order) => {
        return sum + (order.totalPrice || order.totalAmount || 0);
      }, 0);

      // Generate revenue data for last 7 days
      const revenueChartData = generateRevenueData(orders);
      setRevenueData(revenueChartData);

      // Generate sales data by category
      const salesChartData = generateSalesData(orders, categories, products);
      console.log('Sales Chart Data:', salesChartData);
      console.log('Orders:', orders.length, 'Products:', products.length, 'Categories:', categories.length);
      setSalesData(salesChartData);

      setStats({
        totalOrders: orders.length,
        totalUsers: users.length,
        totalRevenue: totalRevenue,
        totalProducts: products.length,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  // Generate revenue data for line chart (last 7 days)
  const generateRevenueData = (orders) => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      last7Days.push({ x: dateStr, y: 0 });
    }

    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const dateStr = orderDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const dayData = last7Days.find(d => d.x === dateStr);
      if (dayData) {
        dayData.y += (order.totalPrice || order.totalAmount || 0);
      }
    });

    return [{
      id: 'Revenue',
      color: 'hsl(142, 70%, 50%)',
      data: last7Days,
    }];
  };

  // Generate sales data by category for bar chart
  const generateSalesData = (orders, categories, products) => {
    const categorySales = {};
    
    // Count sales by category
    orders.forEach(order => {
      // Handle both items and orderItems fields
      const orderItems = order.items || order.orderItems || [];
      
      orderItems.forEach(item => {
        // Get productId from different possible fields
        let productId = null;
        if (item.productId) {
          productId = typeof item.productId === 'object' ? item.productId._id || item.productId : item.productId;
        } else if (item.product) {
          productId = typeof item.product === 'object' ? item.product._id || item.product : item.product;
        }
        
        if (!productId) return;
        
        // Find product
        const product = products.find(p => {
          const pId = p._id?.toString() || p._id;
          const itemId = productId?.toString() || productId;
          return pId === itemId;
        });
        
        if (product && product.categories && product.categories.length > 0) {
          const qty = item.qty || 1;
          
          // Handle categories (can be ObjectId or populated object)
          product.categories.forEach(catRef => {
            let categoryId = null;
            if (typeof catRef === 'object' && catRef._id) {
              categoryId = catRef._id.toString();
            } else if (typeof catRef === 'object' && catRef.id) {
              categoryId = catRef.id.toString();
            } else {
              categoryId = catRef.toString();
            }
            
            const category = categories.find(c => {
              const cId = c._id?.toString() || c._id;
              return cId === categoryId;
            });
            
            if (category && category.name) {
              categorySales[category.name] = (categorySales[category.name] || 0) + qty;
            }
          });
        }
      });
    });

    // Convert to bar chart format - only include categories with sales
    const chartData = Object.entries(categorySales)
      .filter(([_, sales]) => sales > 0)
      .map(([category, sales]) => ({
        category: category.length > 20 ? category.substring(0, 20) + '...' : category,
        sales: sales || 0,
      }))
      .sort((a, b) => b.sales - a.sales); // Sort by sales descending

    // If no sales data, return empty array (will use default mock data)
    return chartData.length > 0 ? chartData : [];
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        {!isXsDevices && (
          <Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: colors.blueAccent[700],
                color: "#fcfcfc",
                fontSize: isMdDevices ? "14px" : "10px",
                fontWeight: "bold",
                p: "10px 20px",
                mt: "18px",
                transition: ".3s ease",
                ":hover": {
                  bgcolor: colors.blueAccent[800],
                },
              }}
              startIcon={<DownloadOutlined />}
              onClick={fetchStats}
            >
              REFRESH DATA
            </Button>
          </Box>
        )}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={
          isXlDevices
            ? "repeat(12, 1fr)"
            : isMdDevices
            ? "repeat(6, 1fr)"
            : "repeat(3, 1fr)"
        }
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Total Orders */}
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.totalOrders.toLocaleString()}
            subtitle="Total Orders"
            progress={stats.loading ? "0" : Math.min(stats.totalOrders / 100, 1).toFixed(2)}
            increase={`${stats.totalOrders > 0 ? '+' : ''}${stats.totalOrders}`}
            icon={
              <ShoppingCartOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Total Users */}
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.totalUsers.toLocaleString()}
            subtitle="Total Users"
            progress={stats.loading ? "0" : Math.min(stats.totalUsers / 50, 1).toFixed(2)}
            increase={`${stats.totalUsers > 0 ? '+' : ''}${stats.totalUsers}`}
            icon={
              <PeopleAltOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Total Revenue */}
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={formatCurrencyShort(stats.totalRevenue)}
            subtitle="Total Revenue"
            progress={stats.loading ? "0" : Math.min(stats.totalRevenue / 10000, 1).toFixed(2)}
            increase={formatCurrencyShort(stats.totalRevenue)}
            icon={
              <PaymentsOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Total Products */}
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.totalProducts.toLocaleString()}
            subtitle="Total Products"
            progress={stats.loading ? "0" : Math.min(stats.totalProducts / 50, 1).toFixed(2)}
            increase={`${stats.totalProducts > 0 ? '+' : ''}${stats.totalProducts}`}
            icon={
              <TrendingUpOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Line Chart */}
        <Box
          gridColumn={
            isXlDevices ? "span 8" : isMdDevices ? "span 6" : "span 3"
          }
          gridRow="span 2"
          bgcolor={colors.primary[400]}
        >
          <Box
            mt="25px"
            px="30px"
            display="flex"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.gray[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {formatCurrencyShort(stats.totalRevenue)}
              </Typography>
            </Box>
            <IconButton>
              <DownloadOutlined
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
          <Box height="250px" mt="-20px">
            <LineChart isDashboard={true} data={revenueData} />
          </Box>
        </Box>

        {/* Recent Orders */}
        <Box
          gridColumn={isXlDevices ? "span 4" : "span 3"}
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          overflow="auto"
        >
          <Box borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
            <Typography color={colors.gray[100]} variant="h5" fontWeight="600">
              Recent Orders
            </Typography>
          </Box>
          {stats.loading ? (
            <Box p="15px" textAlign="center">
              <Typography color={colors.gray[100]}>Loading...</Typography>
            </Box>
          ) : (
            <RecentOrdersList />
          )}
        </Box>

        {/* Campaign Progress */}
        <Box
          gridColumn={isXlDevices ? "span 4" : "span 3"}
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Sales Progress
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle 
              size="125" 
              progress={stats.totalOrders > 0 ? Math.min((stats.totalRevenue / (stats.totalOrders * 200)) || 0.5, 1) : 0}
            />
            <Typography
              textAlign="center"
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {formatCurrencyShort(stats.totalRevenue)} revenue generated
            </Typography>
            <Typography textAlign="center" color={colors.gray[100]}>
              {stats.totalOrders} orders completed
            </Typography>
          </Box>
        </Box>

        {/* Sales Quantity Bar Chart by Category */}
        <Box
          gridColumn={isXlDevices ? "span 8" : "span 3"}
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600" mb="15px" color={colors.gray[100]}>
            Sales Quantity by Category
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="300px"
          >
            {salesData.length > 0 ? (
              <BarChart isDashboard={true} data={salesData} />
            ) : (
              <Typography color={colors.gray[300]}>
                No sales data available. Create orders to see category-wise sales.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// Recent Orders Component
const RecentOrdersList = () => {
  const [orders, setOrders] = useState([]);
  const colors = tokens(useTheme().palette.mode);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders');
        const recentOrders = (data || []).slice(0, 5);
        setOrders(recentOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <Box p="15px" textAlign="center">
        <Typography color={colors.gray[100]}>No orders yet</Typography>
      </Box>
    );
  }

  return (
    <>
      {orders.map((order, index) => (
        <Box
          key={order._id || index}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottom={`4px solid ${colors.primary[500]}`}
          p="15px"
        >
          <Box>
            <Typography
              color={colors.greenAccent[500]}
              variant="h5"
              fontWeight="600"
            >
              {order._id?.slice(-8) || 'N/A'}
            </Typography>
            <Typography color={colors.gray[100]}>
              {order.shippingAddress?.firstName || 'Customer'}
            </Typography>
          </Box>
          <Typography color={colors.gray[100]}>
            {new Date(order.createdAt).toLocaleDateString()}
          </Typography>
          <Box
            bgcolor={colors.greenAccent[500]}
            p="5px 10px"
            borderRadius="4px"
          >
            {formatCurrencyShort(order.totalPrice || order.totalAmount || 0)}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Dashboard;
